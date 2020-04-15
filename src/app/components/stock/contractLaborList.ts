import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Purchase, ContractLabor } from 'src/app/models';

@Component({
  selector: 'app-contractlabor-list',
  templateUrl: '../../pages/stock/contractLaborList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class ContractLaborList implements OnInit, OnDestroy {

  contractLabors: ContractLabor[] = [];
  selectedContractLabor: ContractLabor;
  cols: any[];

  @Output() contractLaborIdEvent = new EventEmitter<string>();


  constructor
    (
    private genericService: GenericService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public globalEventsManager: GlobalEventsManager,
    private router: Router,
    ) {
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                  style: {width: '20%', 'text-align': 'center'} },
            { field: 'contractDate', header: 'Date', headerKey: 'COMMON.CONTRACT_DATE', type: 'date',
                  style: {width: '10%', 'text-align': 'center'}  },
            { field: 'contractorName', header: 'Contractor', headerKey: 'COMMON.CONTRACTOR',  type: 'string',
                  style: {width: '12%', 'text-align': 'center'} },
            { field: 'amount', header: 'Amount', headerKey: 'COMMON.AMOUNT', type: 'currency',
                  style: {width: '10%', 'text-align': 'center'},
                textstyle: {'text-align': 'right'}  },
            { field: 'paid', header: 'Paid', headerKey: 'COMMON.PAID', type: 'currency',
                  style: {width: '10%', 'text-align': 'center'},
                textstyle: {'text-align': 'right'}  },
            { field: 'balance', header: 'Balance', headerKey: 'COMMON.BALANCE', type: 'currency',
                  style: {width: '10%', 'text-align': 'center'},
                textstyle: {'text-align': 'right'}  },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS', type: 'string',
                  style: {width: '5%', 'text-align': 'center'} },
            { field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION', type: 'string',
                  style: {width: '15%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.ContractLabor', parameters)
            .subscribe((data: ContractLabor[]) => {
              this.contractLabors = data;
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

  delete(contractLaborId: number) {

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
