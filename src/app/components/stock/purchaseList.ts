import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Purchase } from 'src/app/models';
import { CurrencyPipe } from '@angular/common';
import { Constants } from 'src/app/app.constants';


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
  providers: [GenericService, CurrencyPipe]
})
// tslint:disable-next-line:component-class-suffix
export class PurchaseList implements OnInit, OnDestroy {

  purchases: Purchase[] = [];
  selectedPurchase: Purchase;
  cols: any[];
  exportCols: any[];
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
    private currencyPipe: CurrencyPipe,
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

    this.exportCols = this.cols.map(col => ({title: col.header, dataKey: col.field}))
                                .filter(col => col.dataKey !== 'secondaryPurchaserName');

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Purchase', parameters, ' ORDER BY status, purchaseDate DESC ')
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
  

  exportPdf() {
      const doc = new jsPDF();
      const locale = this.globalEventsManager.LOCALE;
      const cp = this.currencyPipe;
      const translate = this.translate;
      const footRow = [{purchaseDate: 'Totals', totalAmount: this.sumTotalAmount}];
      doc.autoTable({
        columns: this.exportCols,
        body: this.purchases,
        foot: footRow,
        footStyles: {
            fillColor: [241, 196, 15],
            fontSize: 10
        },
        columnStyles: {
            unitAmount: {
                halign: 'right',
                cellWidth: 25,
            },
            totalAmount: {
                halign: 'right',
                cellWidth: 30,
            }
        },
        didParseCell: function(data) {
            if (data.row.section === 'body' && data.column.dataKey === 'purchaseDate') {
              data.cell.text[0] = new Date(+ data.cell.text[0]).toLocaleDateString(locale,
                Constants.LOCAL_DATE_OPTIONS);
            }
            if ((data.row.section === 'body' || data.row.section === 'foot') && data.column.dataKey === 'totalAmount') {
              data.cell.text[0] = cp.transform(+ data.cell.text[0], null, '', '1.0-0', translate.currentLang);
              data.cell.styles.halign = 'right';
            }
            if ((data.row.section === 'body') &&
               (data.column.dataKey === 'unitAmount' || data.column.dataKey === 'quantity')) {
              data.cell.text[0] = cp.transform(+ data.cell.text[0], null, '', '1.0-0', translate.currentLang);
              data.cell.styles.halign = 'right';
            }
            
        },
        didDrawCell: function(data) {

        },
        didDrawPage: function (data) {
            // Footer
            const str = 'Page ' + doc.internal.getNumberOfPages();
            doc.setFontSize(10);

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
      });



      doc.save('purchaseList.pdf');
  }

 }
