import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Fund } from 'src/app/models/stock';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';
import { ManagerDropdown } from '../dropdowns/dropdown.manager';

@Component({
  selector: 'app-fund-details',
  templateUrl: '../../pages/stock/fundDetails.html',
  providers: [GenericService, AppInfoStorage, EmployeeDropdown]

})
// tslint:disable-next-line:component-class-suffix
export class FundDetails implements OnInit, OnDestroy {

    fund: Fund = new Fund();
    messages: Message[] = [];
    @Output() fundSaveEvent = new EventEmitter<Fund>();

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public managerDropdown: ManagerDropdown
    ) {
      this.fund = new Fund();
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.fund = null;
  }

  getFund(fundId: number) {

    this.messages = [];
    this.genericService.getOne(fundId, 'com.wack.model.stock.Fund')
        .subscribe(result => {
      if (result.id > 0) {
        this.fund = result;
        this.fund.receptionDate = new Date(this.fund.receptionDate);
        this.fund.receptionDate = new Date(this.fund.receptionDate.toLocaleString('en-US', {timeZone: 'UTC'}));
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
    this.fund = new Fund();
  }

  cancel() {
    this.fund.status = 1;
    this.save();
  }

  save() {

    try {


      this.genericService.save(this.fund, 'com.wack.model.stock.Fund')
        .subscribe(result => {
          if (result.id > 0) {
            this.fund = result;
            this.fund.receptionDate = new Date(this.fund.receptionDate);
            this.fundSaveEvent.emit(this.fund);
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
              this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
              });
          } else {
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
              this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
              });
          }
        });

    } catch (e) {
      console.log(e);
    }
  }


  delete() {

  }

  isNew() {
    return this.fund.id === undefined || this.fund.id === null;
  }

  isCancel() {
    return this.fund.status === 1;
  }
}
