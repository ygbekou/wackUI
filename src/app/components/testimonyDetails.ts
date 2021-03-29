import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { GenericService, TokenStorage } from '../services';
import { TranslateService} from '@ngx-translate/core';
import { Message, ConfirmationService } from 'primeng/api';
import { BaseComponent } from './website/baseComponent';
import { Testimony } from '../models';
import { RatingModule} from 'primeng/rating';

@Component({
  selector: 'app-testimony-details',
  templateUrl: '../pages/testimonyDetails.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class TestimonyDetails extends BaseComponent implements OnInit, OnDestroy {

  testimony: Testimony = new Testimony();
  messages: Message[] = [];
  @Output() testimonySaveEvent = new EventEmitter<Testimony>();
  MODEL = 'com.wack.model.website.Testimony';

  constructor
    (
      public genericService: GenericService,
      public confirmationService: ConfirmationService,
      public translate: TranslateService,
      public tokenStorage: TokenStorage,
      private route: ActivatedRoute,
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
  }

  ngOnInit(): void {

    let testimonyId = null;
    this.route
        .queryParams
        .subscribe(params => {
          testimonyId = params['testimonyId'];

          if (testimonyId != null) {
              this.genericService.getOne(testimonyId, this.MODEL)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.testimony = result;
                }
              });
          } else {
          }
        });

  }

  ngOnDestroy() {
    this.testimony = null;
  }

  save() {
    this.messages = [];
    try {
      this.genericService.save(this.testimony, this.MODEL)
        .subscribe(result => {
          this.processResult(result, this.testimony, this.messages, null);
          this.testimony = result;
          this.testimonySaveEvent.emit(this.testimony);
        });
    } catch (e) {
      console.log(e);
    }
  }

  clear() {
    this.testimony = new Testimony();
  }


  getTestimony(testimonyId: number) {
    this.messages = [];
    this.genericService.getOne(testimonyId, this.MODEL)
        .subscribe(result => {
      if (result.id > 0) {
        this.testimony = result;
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

  cancel() {
    this.testimony.status = 1;
    this.save();
  }

  isNew() {
    return this.testimony.id === undefined || this.testimony.id === null;
  }

  isCancel() {
    return this.testimony.status === 1;
  }

 }
