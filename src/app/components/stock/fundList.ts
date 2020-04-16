import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Fund } from 'src/app/models';

@Component({
  selector: 'app-fund-list',
  templateUrl: '../../pages/stock/fundList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class FundList implements OnInit, OnDestroy {

  funds: Fund[] = [];
  selectedFund: Fund;
  cols: any[];

  @Output() fundIdEvent = new EventEmitter<string>();


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
            { field: 'receptionDate', header: 'Date', headerKey: 'COMMON.RECEPTION_DATE', type: 'date',
                  style: {width: '10%', 'text-align': 'center'} },
            { field: 'receiverName', header: 'Receiver', headerKey: 'COMMON.RECEIVER', type: 'string',
                  style: {width: '20%', 'text-align': 'center'} },
            { field: 'amount', header: 'Amount', headerKey: 'COMMON.AMOUNT', type: 'currency',
                  style: {width: '10%', 'text-align': 'center'},
                  textstyle: {'text-align': 'right'} },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS', type: 'string',
                  style: {width: '10%', 'text-align': 'center'} },
            { field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION', type: 'string',
                  style: {width: '40%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Fund', parameters , ' ORDER BY receptionDate DESC ')
            .subscribe((data: Fund[]) => {
              this.funds = data;
            },
            error => console.log(error),
            () => console.log('Get all Fund complete'));
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
    this.funds = null;
  }

  edit(fund: Fund) {
      this.fundIdEvent.emit(fund.id + '');
      this.selectedFund = fund;
  }

  delete(fundId: number) {
  
  }

  updateTable(fund: Fund) {
		const index = this.funds.findIndex(x => x.id === fund.id);

		if (index === -1) {
			this.funds.push(fund);
		} else {
			this.funds[index] = fund;
		}

  }
  
 }
