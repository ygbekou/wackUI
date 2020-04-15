import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Payment } from 'src/app/models';

@Component({
  selector: 'app-payment-list',
  templateUrl: '../../pages/stock/paymentList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class PaymentList implements OnInit, OnDestroy {

  payments: Payment[] = [];
  selectedPayment: Payment;
  cols: any[];

  @Output() paymentIdEvent = new EventEmitter<string>();


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
            { field: 'paymentDate', header: 'Date', headerKey: 'COMMON.RECEPTION_DATE', type: 'date',
                  style: {width: '10%', 'text-align': 'center'}   },
            { field: 'contractLaborLabel', header: 'Labor', headerKey: 'COMMON.LABOR', type: 'string',
                  style: {width: '28%', 'text-align': 'center'}   },
            { field: 'paymentTypeName', header: 'Payment Type', headerKey: 'COMMON.PAYMENT_TYPE', type: 'string',
                  style: {width: '10%', 'text-align': 'center'}   },
            { field: 'payerName', header: 'Payer', headerKey: 'COMMON.PAYER', type: 'string',
                  style: {width: '15%', 'text-align': 'center'}  },
            { field: 'receiverName', header: 'Receiver', headerKey: 'COMMON.RECEIVER', type: 'string',
                  style: {width: '15%', 'text-align': 'center'}   },
            { field: 'amount', header: 'Amount', headerKey: 'COMMON.AMOUNT', type: 'currency',
                  style: {width: '10%', 'text-align': 'center'},
                  textstyle: {'text-align': 'right'}   },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS', type: 'string',
                  style: {width: '8%', 'text-align': 'center'}   },
            //{ field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION' }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Payment', parameters)
            .subscribe((data: Payment[]) => {
              this.payments = data;
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
