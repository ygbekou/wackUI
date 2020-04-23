import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Purchase } from 'src/app/models';

@Component({
  selector: 'app-purchase-list',
  templateUrl: '../../pages/stock/purchaseList.html',
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
export class PurchaseList implements OnInit, OnDestroy {

  purchases: Purchase[] = [];
  selectedPurchase: Purchase;
  cols: any[];
  totalstyle = {
          width: '14%',
          'font-weight': 'bold',
          'text-align': 'right'
        };
  sumTotalAmount: number;
  @Output() purchaseIdEvent = new EventEmitter<string>();


  constructor
    (
    public genericService: GenericService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public globalEventsManager: GlobalEventsManager,
    private router: Router,
    ) {
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'purchaseDate', header: 'Date', headerKey: 'COMMON.PURCHASE_DATE', type: 'date',
                  headerstyle: {width: '10%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '10%'}  },
            { field: 'productName', header: 'Product', headerKey: 'COMMON.PRODUCT', type: 'string',
                  headerstyle: {width: '15%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '15%'} },
            { field: 'primaryPurchaserName', header: 'Primary Purchaser', headerKey: 'COMMON.PRIMARY_PURCHASER', type: 'string',
                  headerstyle: {width: '16%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '16%'}  },
            { field: 'secondaryPurchaserName', header: 'Secondary Purchaser', headerKey: 'COMMON.SECONDARY_PURCHASER', type: 'string',
                  headerstyle: {width: '16%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '16%'}  },
            { field: 'supplierName', header: 'Supplier', headerKey: 'COMMON.SUPPLIER', type: 'string',
                  headerstyle: {width: '14%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '14%'}  },
            { field: 'unitAmount', header: 'Unit Price', headerKey: 'COMMON.UNIT_PRICE', type: 'currency',
                  headerstyle: {width: '10%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '10%', 'text-align': 'right'}  },
            { field: 'quantity', header: 'Quantity', headerKey: 'COMMON.QUANTITY', type: 'integer',
                  headerstyle: {width: '5%', 'text-align': 'center', 'font-weight': 'bold'} ,
                  rowstyle: {width: '5%', 'text-align': 'right'} },
            { field: 'totalAmount', header: 'Total Amount', headerKey: 'COMMON.TOTAL_AMOUNT', type: 'currency',
                  headerstyle: {width: '14%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '14%', 'text-align': 'right'} }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Purchase', parameters, ' ORDER BY purchaseDate DESC ')
            .subscribe((data: Purchase[]) => {
              this.purchases = data;
              this.sumTotalAmount = this.purchases
                              .map(c => c.status === 0 ? c.totalAmount : 0)
                              .reduce((sum, current) => sum + current);
            },
            error => console.log(error),
            () => console.log('Get all Purchase complete'));
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
    this.purchases = null;
  }

  edit(purchase: Purchase) {
      this.purchaseIdEvent.emit(purchase.id + '');
      this.selectedPurchase = purchase;
  }

  delete(purchaseId: number) {

  }

  updateTable(purchase: Purchase) {
		const index = this.purchases.findIndex(x => x.id === purchase.id);

		if (index === -1) {
			this.purchases.push(purchase);
		} else {
			this.purchases[index] = purchase;
		}

	}

 }
