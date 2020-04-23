import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService, GlobalEventsManager, TokenStorage } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { ContractLabor } from 'src/app/models';
import { BaseComponent } from '../website/baseComponent';
import { ConfirmationService } from 'primeng';

@Component({
  selector: 'app-contractlabor-list',
  templateUrl: '../../pages/stock/contractLaborList.html',
  styles: [`
        .cancelled {
          background-color: #FF0000 !important;
          color: #ffffff !important;
        }
    `
    ],
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class ContractLaborList extends BaseComponent implements OnInit, OnDestroy {

  contractLabors: ContractLabor[] = [];
  selectedContractLabor: ContractLabor;
  cols: any[];
  totalstyle = {
          width: '12%',
          'font-weight': 'bold',
          'text-align': 'right'
        };
  totalAmount = 0;
  totalPaid = 0;
  totalBalance = 0;
  @Output() contractLaborIdEvent = new EventEmitter<string>();


  constructor
    (
    public genericService: GenericService,
    public translate: TranslateService,
    public confirmationService: ConfirmationService,
    public tokenStorage: TokenStorage,
    private route: ActivatedRoute,
    public globalEventsManager: GlobalEventsManager,
    private router: Router,
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                  headerstyle: {width: '20%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '20%'} },
            { field: 'contractDate', header: 'Date', headerKey: 'COMMON.CONTRACT_DATE', type: 'date',
                  headerstyle: {width: '10%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '10%'}  },
            { field: 'contractorName', header: 'Contractor', headerKey: 'COMMON.CONTRACTOR',  type: 'string',
                  headerstyle: {width: '17%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '17%'} },
            { field: 'quoteName', header: 'Quote', headerKey: 'COMMON.QUOTE',  type: 'string',
                  headerstyle: {width: '17%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '17%'} },
            { field: 'amount', header: 'Amount', headerKey: 'COMMON.AMOUNT', type: 'currency',
                  headerstyle: {width: '12%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '12%', 'text-align': 'right'} },
            { field: 'paid', header: 'Paid', headerKey: 'COMMON.PAID', type: 'currency',
                  headerstyle: {width: '12%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '12%', 'text-align': 'right'} },
            { field: 'balance', header: 'Balance', headerKey: 'COMMON.BALANCE', type: 'currency',
                  headerstyle: {width: '12%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '12%', 'text-align': 'right'} },
        ];

        let totalAmount = 0;
        let totalPaid = 0;
        let totalBalance = 0;
    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.ContractLabor', parameters, ' ORDER BY status, contractDate DESC ')
            .subscribe((data: ContractLabor[]) => {
              this.contractLabors = data;
              this.contractLabors.forEach(function (c) {
                  if (c.status === 0) {
                    totalAmount += c.amount;
                    totalPaid += c.paid;
                    totalBalance += c.balance;
                  }
                }
              );
              this.totalAmount = totalAmount;
              this.totalPaid = totalPaid;
              this.totalBalance = totalBalance;
            },
            error => console.log(error),
            () => console.log('Get all ContractorLabor complete'));
     });


    this.updateCols();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateCols();
    });
  }


  updateCols() {
    // tslint:disable-next-line:forin
    for (const index in this.cols) {
      const col = this.cols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }
  }


  ngOnDestroy() {
    this.contractLabors = null;
  }

  edit(contractLabor: ContractLabor) {
      this.contractLaborIdEvent.emit(contractLabor.id + '');
      this.selectedContractLabor = contractLabor;
  }

  updateTable(contractLabor: ContractLabor) {
    const index = this.contractLabors.findIndex(x => x.id === contractLabor.id);

    if (index === -1) {
      this.contractLabors.push(contractLabor);
    } else {
      this.contractLabors[index] = contractLabor;
    }
  }

 }
