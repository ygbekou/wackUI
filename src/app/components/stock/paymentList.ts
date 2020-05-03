import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Payment } from 'src/app/models';
import { CurrencyPipe } from '@angular/common';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-payment-list',
  templateUrl: '../../pages/stock/paymentList.html',
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
export class PaymentList implements OnInit, OnDestroy {

  payments: Payment[] = [];
  selectedPayment: Payment;
  cols: any[] = [];
  exportCols: any[];
  totalstyle = {
          width: '10%',
          'font-weight': 'bold',
          'text-align': 'right'
        };
  totalPayment: number;
  @Output() paymentIdEvent = new EventEmitter<string>();
  @Input() paymentGroup: string;


  constructor
    (
    private genericService: GenericService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public globalEventsManager: GlobalEventsManager,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    ) {
  }

  ngOnInit(): void {

    this.cols.push(
            { field: 'paymentDate', header: 'Date', headerKey: 'COMMON.RECEPTION_DATE', type: 'date',
                  headerstyle: {width: '10%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '10%'}   }
    );
    if (this.paymentGroup === 'LABOR') {
      this.cols.push(
        { field: 'contractLaborLabel', header: 'Labor', headerKey: 'COMMON.LABOR', type: 'string',
                  headerstyle: {width: '29%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '29%'}   }
      );
    } else {
      this.cols = this.cols.concat([
        { field: 'salaryMonthName', header: 'Month', headerKey: 'COMMON.SALARY_MONTH', type: 'string',
                  headerstyle: {width: '19%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '19%'}   },
        { field: 'salaryYear', header: 'Year', headerKey: 'COMMON.SALARY_YEAR', type: 'string',
                  headerstyle: {width: '10%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '10%', 'text-align': 'right'}   }
      ]
      );
    }

    this.cols = this.cols.concat([
      { field: 'paymentTypeName', header: 'Payment Type', headerKey: 'COMMON.PAYMENT_TYPE', type: 'string',
                  headerstyle: {width: '15%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '15%'}   },
            { field: 'payerName', header: 'Payer', headerKey: 'COMMON.PAYER', type: 'string',
                  headerstyle: {width: '18%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '18%'}  },
            { field: 'receiverName', header: 'Receiver', headerKey: 'COMMON.RECEIVER', type: 'string',
                  headerstyle: {width: '18%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '18%'}   },
            { field: 'amount', header: 'Amount', headerKey: 'COMMON.AMOUNT', type: 'currency',
                  headerstyle: {width: '10%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '10%', 'text-align': 'right'}   }
    ]);

    this.exportCols = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          if (this.paymentGroup === 'SALARY') {
            parameters.push('e.paymentType.id = |paymentTypeId|100|Long');
          } else {
            parameters.push('e.paymentType.id != |paymentTypeId|100|Long');
          }

          this.genericService.getAllByCriteria('com.wack.model.stock.Payment', parameters, ' ORDER BY status,  paymentDate DESC ')
            .subscribe((data: Payment[]) => {
              this.payments = data;
              this.totalPayment = this.payments
                              .map(c => c.status === 0 ? c.amount : 0)
                              .reduce((sum, current) => sum + current);
            },
            error => console.log(error),
            () => console.log('Get all Payment complete'));
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
    this.payments = null;
  }

  edit(payment: Payment) {
      this.paymentIdEvent.emit(payment.id + '');
      this.selectedPayment = payment;
  }

  delete(paymentId: number) {

  }

  updateTable(payment: Payment) {
		const index = this.payments.findIndex(x => x.id === payment.id);

		if (index === -1) {
			this.payments.push(payment);
		} else {
			this.payments[index] = payment;
		}

  }


  exportPdf() {
    const doc = new jsPDF();
    const locale = this.globalEventsManager.LOCALE;
    const cp = this.currencyPipe;
    const translate = this.translate;
    const footRow = [{paymentDate: 'Totals', amount: this.totalPayment}];
    doc.autoTable({
      columns: this.exportCols,
      body: this.payments,
      foot: footRow,
      footStyles: {
          fillColor: [241, 196, 15],
          fontSize: 10
      },
      columnStyles: {
          amount: {
              halign: 'right',
              cellWidth: 30,
          }
      },
      didParseCell: function(data) {
          if (data.row.section === 'body' && data.column.dataKey === 'paymentDate') {
            data.cell.text[0] = new Date(+ data.cell.text[0]).toLocaleDateString(locale,
              Constants.LOCAL_DATE_OPTIONS);
          }
          if ((data.row.section === 'body' || data.row.section === 'foot') && data.column.dataKey === 'amount') {
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



    doc.save(this.paymentGroup.toLocaleLowerCase() + 'PaymentList.pdf');
  }

 }
