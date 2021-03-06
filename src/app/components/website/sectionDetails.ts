import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Section } from '../../models/website';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-section-details',
  templateUrl: '../../pages/website/sectionDetails.html',
  providers: [GenericService]

})
// tslint:disable-next-line:component-class-suffix
export class SectionDetails implements OnInit, OnDestroy {

    section: Section = new Section();
    messages: Message[] = [];
    @ViewChild('picture', {static: false}) picture: ElementRef;
    formData = new FormData();
    pictureUrl: any = '';
    showInMenu = false;

    @Output() sectionSaveEvent = new EventEmitter<Section>();

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService
    ) {
      this.section = new Section();
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.section = null;
  }

  getSection(sectionId: number) {

    this.messages = [];
    this.genericService.getOne(sectionId, 'com.wack.model.website.Section')
        .subscribe(result => {
      if (result.id > 0) {
        this.section = result;
        this.showInMenu = this.section.showInMenu === 1;
      } else {
        this.translate.get(['COMMON.READ', 'MESSAGE.READ_FAILED']).subscribe(res => {
          this.messages.push({severity:
            Constants.ERROR, summary:
            res['COMMON.READ'], detail:
            res['MESSAGE.READ_FAILED']});
        });
      }
    });
  }
  // tslint:disable-next-line:no-trailing-whitespace
  
  clear() {
    this.section = new Section();
  }


  save() {
    this.messages = [];
    this.formData = new FormData();

    const pictureEl = this.picture.nativeElement;
    if (pictureEl && pictureEl.files && (pictureEl.files.length > 0)) {
      const files: FileList = pictureEl.files;
      for (let i = 0; i < files.length; i++) {
          this.formData.append('file[]', files[i], 'picture.jpg');
      }
    } else {
       //this.formData.append('file', null, null);
    }

    try {
      this.section.showInMenu = this.showInMenu ? 1 : 0;
      if (pictureEl && pictureEl.files && pictureEl.files.length > 0) {
        this.section.picture = '';
        this.genericService.saveWithFile(this.section, 'com.wack.model.website.Section', this.formData, 'saveWithFile')
          .subscribe(result => {
            if (result.id > 0) {
              this.section = result;
              this.messages.push({severity: Constants.SUCCESS, summary: Constants.SAVE_LABEL, detail: Constants.SAVE_SUCCESSFUL});
              this.pictureUrl = '';
              this.sectionSaveEvent.emit(this.section);
            } else {
              this.messages.push({severity: Constants.ERROR, summary: Constants.SAVE_LABEL, detail: Constants.SAVE_UNSUCCESSFUL});
            }
          });
      } else {
        this.genericService.save(this.section, 'com.wack.model.website.Section')
          .subscribe(result => {
            if (result.id > 0) {
              this.section = result;
              this.messages.push({severity: Constants.SUCCESS, summary: Constants.SAVE_LABEL, detail: Constants.SAVE_SUCCESSFUL});
              this.sectionSaveEvent.emit(this.section);
            } else {
              this.messages.push({severity: Constants.ERROR, summary: Constants.SAVE_LABEL, detail: Constants.SAVE_UNSUCCESSFUL});
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  }


  delete() {

  }

  readUrl(event: any, targetName: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: ProgressEvent) => {
        this.pictureUrl = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearPictureFile() {
    this.pictureUrl = '';
    this.picture.nativeElement.value = '';
  }
 }
