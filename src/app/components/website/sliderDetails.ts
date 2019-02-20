import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Section, Slider } from '../../models/website';
import { Constants } from '../../app.constants';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-slider-details',
  templateUrl: '../../pages/website/sliderDetails.html',
  providers: [GenericService]

})
// tslint:disable-next-line:component-class-suffix
export class SliderDetails implements OnInit, OnDestroy {

    slider: Slider = new Slider();
    messages: Message[] = [];
    @ViewChild('picture') picture: ElementRef;
    formData = new FormData();
    pictureUrl: any = '';

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService
    ) {
      this.slider = new Slider();
      this.pictureUrl = '';
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.slider = null;
  }

  getSlider(sliderId: number) {

    this.messages = [];
    this.genericService.getOne(sliderId, 'com.wack.model.website.Slider')
        .subscribe(result => {
      if (result.id > 0) {
        this.slider = result;
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
    this.slider = new Slider();
  }


  save() {
    this.formData = new FormData();

    const pictureEl = this.picture.nativeElement;
    if (pictureEl && pictureEl.files && (pictureEl.files.length > 0)) {
      const files: FileList = pictureEl.files;
      for (let i = 0; i < files.length; i++) {
          this.formData.append('file', files[i], files[i].name);
      }
    } else {
       this.formData.append('file', null, null);
    }

    try {

      if (pictureEl && pictureEl.files && pictureEl.files.length > 0) {
        this.slider.fileLocation = '';
        this.genericService.saveWithFile(this.slider, 'com.wack.model.website.Slider', this.formData, 'saveWithFile')
          .subscribe(result => {
            if (result.id > 0) {
              this.slider = result;
              this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
                this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
                });
              this.pictureUrl = '';
            } else {
              this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_UNSUCCESS']).subscribe(res => {
                this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
                });
            }
          });
      } else {
        this.genericService.save(this.slider, 'com.wack.model.website.Slider')
          .subscribe(result => {
            if (result.id > 0) {
              this.slider = result;
              this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
                this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
                });
            } else {
              this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
                this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
                });
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
