import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Constants } from 'src/app/app.constants';
import { Fund } from 'src/app/models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-fund-list',
  templateUrl: '../../pages/stock/fundList.html',
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
export class FundList implements OnInit, OnDestroy {

  funds: Fund[] = [];
  selectedFund: Fund;
  cols: any[];
  exportCols: any[];
  totalstyle = {
          width: '15%',
          'font-weight': 'bold',
          'text-align': 'right'
        };
  totalFund: number;
  @Output() fundIdEvent = new EventEmitter<string>();


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

    this.cols = [
            { field: 'receptionDate', header: 'Date', headerKey: 'COMMON.RECEPTION_DATE', type: 'date',
                  headerstyle: {width: '15%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '15%'} },
            { field: 'receiverName', header: 'Receiver', headerKey: 'COMMON.RECEIVER', type: 'string',
                  headerstyle: {width: '30%', 'text-align': 'center', 'font-weight': 'bold'}, 
                  rowstyle: {width: '30%'} },
            { field: 'amount', header: 'Amount', headerKey: 'COMMON.AMOUNT', type: 'currency',
                  headerstyle: {width: '15%', 'text-align': 'center', 'font-weight': 'bold'}, 
                  rowstyle: {width: '15%', 'text-align': 'right'} },
            { field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION', type: 'string',
                  headerstyle: {width: '40%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '40%', 'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} }
        ];

    this.exportCols = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Fund', parameters , ' ORDER BY status , receptionDate DESC ')
            .subscribe((data: Fund[]) => {
              this.funds = data;
              this.totalFund = this.funds
                              .map(c => c.status === 0 ? c.amount : 0)
                              .reduce((sum, current) => sum + current);
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

  exportPdf() {
      const doc = new jsPDF();
      const locale = this.globalEventsManager.LOCALE;
      const cp = this.currencyPipe;
      const translate = this.translate;
      const footRow = [{receptionDate: 'Totals', amount: this.totalFund}];
      doc.autoTable({
        columns: this.exportCols,
        body: this.funds,
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
            if (data.row.section === 'body' && data.column.dataKey === 'receptionDate') {
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



      doc.save('fundList.pdf');
  }

 }
