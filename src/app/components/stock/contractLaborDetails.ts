import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService, TokenStorage } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message, ConfirmationService } from 'primeng/api';
import { ContractLabor } from 'src/app/models';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';
import { BaseComponent } from '../website/baseComponent';

@Component({
  selector: 'app-contractlabor-details',
  templateUrl: '../../pages/stock/contractLaborDetails.html',
  providers: [GenericService, AppInfoStorage]

})
// tslint:disable-next-line:component-class-suffix
export class ContractLaborDetails extends BaseComponent implements OnInit, OnDestroy {

    contractLabor: ContractLabor = new ContractLabor();
    messages: Message[] = [];
    @Output() contractLaborSaveEvent = new EventEmitter<ContractLabor>();

    formData = new FormData();

    constructor
    (
      public genericService: GenericService,
      public translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public  employeeDropdown: EmployeeDropdown,
      public tokenStorage: TokenStorage,
      public confirmationService: ConfirmationService
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
      this.contractLabor = new ContractLabor();
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.contractLabor = null;
  }

  getContractLabor(contractLaborId: number) {

    this.messages = [];
    this.genericService.getOne(contractLaborId, 'com.wack.model.stock.ContractLabor')
        .subscribe(result => {
      if (result.id > 0) {
        this.contractLabor = result;
        this.contractLabor.contractDate = new Date(this.contractLabor.contractDate);
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
    this.contractLabor = new ContractLabor();
  }

  updateBalance() {
    if (this.contractLabor.paid === undefined) {
      this.contractLabor.paid = 0;
    }
    setTimeout (() => {
      this.contractLabor.balance = this.getNumber(this.contractLabor.amount) - this.getNumber(this.contractLabor.paid);
    }, 0)
  }

  save() {

    try {

      this.genericService.saveWithFile(this.contractLabor, 'com.wack.model.stock.ContractLabor', this.formData, 'saveCompany')
        .subscribe(result => {
          if (result.id > 0) {
            this.contractLabor = result;
            this.contractLabor.contractDate =  new Date(this.contractLabor.contractDate);
            this.contractLaborSaveEvent.emit(this.contractLabor);
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

  public onFileUpload(event): void {

    const myFiles = event.files;
    if (event && myFiles && (myFiles.length > 0)) {
      const tempFileNames  = [];
      for (let i = 0; i < myFiles.length; i++) {

        this.formData.append('file[]', myFiles[i], 'image' + '.' + myFiles[i].name.split('.')[1]);
        tempFileNames.push(myFiles[i].name);
      }
    }
}


 public hasImage() {
   return this.contractLabor.image !== undefined && this.contractLabor.image !== null && this.contractLabor.image !== '';
 }

 cancel() {
    this.contractLabor.status = 1;
    this.save();
  }

  isNew() {
    return this.contractLabor.id === undefined || this.contractLabor.id === null;
  }

  isCancel() {
    return this.contractLabor.status === 1;
  }

}
