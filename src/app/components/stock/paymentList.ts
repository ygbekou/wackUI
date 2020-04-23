import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Payment } from 'src/app/models';

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
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class PaymentList implements OnInit, OnDestroy {

  payments: Payment[] = [];
  selectedPayment: Payment;
  cols: any[] = [];
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

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          if (this.paymentGroup === 'SALARY') {
            parameters.push('e.paymentType.id = |paymentTypeId|100|Long');
          } else {
            parameters.push('e.paymentType.id != |paymentTypeId|100|Long');
          }

          this.genericService.getAllByCriteria('com.wack.model.stock.Payment', parameters, ' ORDER BY paymentDate DESC ')
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

 }
