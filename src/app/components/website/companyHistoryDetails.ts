import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Section, CompanyHistory } from '../../models/website';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Employee } from 'src/app/models';

@Component({
  selector: 'app-companyhistory-details',
  templateUrl: '../../pages/website/companyHistoryDetails.html',
  providers: []

})
// tslint:disable-next-line:component-class-suffix
export class CompanyHistoryDetails implements OnInit, OnDestroy {

    companyHistory: CompanyHistory = new CompanyHistory();
    messages: Message[] = [];
    @ViewChild('picture', {static: false}) picture: ElementRef;
    formData = new FormData();
    pictureUrl: any = '';
    showInMenu = false;
    @Output() companyHistorySaveEvent = new EventEmitter<CompanyHistory>();

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService
    ) {
      this.companyHistory = new CompanyHistory();
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.companyHistory = null;
  }

  getCompanyHistory(companyHistoryId: number) {

    this.messages = [];
    this.genericService.getOne(companyHistoryId, 'com.wack.model.website.CompanyHistory')
        .subscribe(result => {
      if (result.id > 0) {
        this.companyHistory = result;
      } else {
        this.translate.get(['COMMON.READ', 'MESSAGE.READ_FAILED']).subscribe(res => {
          this.messages.push({severity: Constants.ERROR,
            summary: res['COMMON.READ'],
            detail: res['MESSAGE.READ_FAILED']});
        });
      }
    });
  }
  // tslint:disable-next-line:no-trailing-whitespace
  
  clear() {
    this.companyHistory = new CompanyHistory();
  }


  save() {
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
      if (pictureEl && pictureEl.files && pictureEl.files.length > 0) {
        this.companyHistory.picture = '';
        alert(this.companyHistory.status);
        this.genericService.saveWithFile(this.companyHistory, 'com.wack.model.website.CompanyHistory', this.formData, 'saveWithFile')
          .subscribe(result => {
            if (result.id > 0) {
              this.companyHistory = result;
              this.companyHistorySaveEvent.emit(this.companyHistory);
              this.messages.push({severity: Constants.SUCCESS, summary: Constants.SAVE_LABEL, detail: Constants.SAVE_SUCCESSFUL});
              this.pictureUrl = '';
            } else {
              this.messages.push({severity: Constants.ERROR, summary: Constants.SAVE_LABEL, detail: Constants.SAVE_UNSUCCESSFUL});
            }
          });
      } else {
        this.genericService.save(this.companyHistory, 'com.wack.model.website.CompanyHistory')
          .subscribe(result => {
            if (result.id > 0) {
              this.companyHistory = result;
              this.companyHistorySaveEvent.emit(this.companyHistory);
              this.messages.push({severity: Constants.SUCCESS, summary: Constants.SAVE_LABEL, detail: Constants.SAVE_SUCCESSFUL});
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
