import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService, TokenStorage } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message, ConfirmationService } from 'primeng/api';
import { Fund } from 'src/app/models/stock';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';
import { ManagerDropdown } from '../dropdowns/dropdown.manager';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../website/baseComponent';

@Component({
  selector: 'app-fundexpensestatistics',
  templateUrl: '../../pages/stock/FundExpenseStatistics.html',
  providers: [GenericService, AppInfoStorage, EmployeeDropdown]

})
// tslint:disable-next-line:component-class-suffix
export class FundExpenseStatistics extends BaseComponent implements OnInit, OnDestroy {

    data: any;
    payments: any[];
    messages: Message[] = [];
    @Output() fundSaveEvent = new EventEmitter<Fund>();

    constructor
    (
      public genericService: GenericService,
      public translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public managerDropdown: ManagerDropdown,
      private route: ActivatedRoute,
      public tokenStorage: TokenStorage,
      public confirmationService: ConfirmationService
    ) {
      super(genericService, translate, confirmationService, tokenStorage);

      this.route
        .queryParams
        .subscribe(params => {

          this.genericService.getNewObject("/service/Payment/statistic/months", 0)
            .subscribe((data: any) => {
              this.data = data;
            },
            error => console.log(error),
            () => console.log('Get statistic data complete'));
     });



  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.data = null;
  }

  save() {

  }

}
