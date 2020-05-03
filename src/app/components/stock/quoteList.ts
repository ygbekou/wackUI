import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager, TokenStorage } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Quote, Reference, Material, ContractLabor } from 'src/app/models';
import { Message, ConfirmationService } from 'primeng/api';
import { Constants } from 'src/app/app.constants';
import { GenericResponse } from 'src/app/models/genericResponse';
import { BaseComponent } from '../website/baseComponent';
import { ProductDropdown } from '../dropdowns/dropdown.product';



@Component({
  selector: 'app-quote-list',
  templateUrl: '../../pages/stock/quoteList.html',
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
export class QuoteList extends BaseComponent implements OnInit, OnDestroy {

  quotes: Quote[] = [];
  selectedQuote: Quote;
  selectedQuotes: any[] = [];
  cols: any[];
  exportCols: any[];
  fileCols: any[];
  materialCols: any[];
  laborCols: any[];
  messages: Message[] = [];

  totalstyle = {
          width: '15%',
          'font-weight': 'bold',
          'text-align': 'right'
        };
  totalQuote: number;


  @Output() quoteIdEvent = new EventEmitter<string>();


  constructor
    (
    public genericService: GenericService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public globalEventsManager: GlobalEventsManager,
    public confirmationService: ConfirmationService,
    public tokenStorage: TokenStorage,
    public productDropdown: ProductDropdown,
    private router: Router,
    private cp: CurrencyPipe
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'quoteDate', header: 'Date', headerKey: 'COMMON.QUOTE_DATE', type: 'date',
                  headerstyle: {width: '12%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '12%'}  },
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                  headerstyle: {width: '20%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '20%'} },
            { field: 'quoterName', header: 'Quoter', headerKey: 'COMMON.QUOTER', type: 'string',
                  headerstyle: {width: '20%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '20%'}  },
            { field: 'totalAmount', header: 'Total Amount', headerKey: 'COMMON.TOTAL_AMOUNT', type: 'currency',
                  headerstyle: {width: '15%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '15%', 'text-align': 'right'}  },
            { field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION', type: 'string',
                  headerstyle: {width: '28%', 'text-align': 'center', 'font-weight': 'bold'},
                  rowstyle: {width: '28%', 'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'}  }
        ];

    this.exportCols = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.fileCols = [
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                  style: {width: '90%', 'text-align': 'center'}  }
        ];

    this.materialCols = [
            { field: 'product', header: 'Product', headerKey: 'COMMON.PRODUCT', type: 'string',
                  headerstyle: {width: '30%', 'text-align': 'center'}, rowstyle: {width: '15%'} },
            { field: 'unitPrice', header: 'Unit Price', headerKey: 'COMMON.UNIT_PRICE', type: 'currency',
                  headerstyle: {width: '15%', 'text-align': 'center'}, rowstyle: {width: '15%'},
                  textstyle: {'text-align': 'right'}  },
            { field: 'quantity', header: 'Qty', headerKey: 'COMMON.QUANTITY', type: 'currency',
                  headerstyle: {width: '10%', 'text-align': 'center'}, rowstyle: {width: '15%'},
                  textstyle: {'text-align': 'right'}  },
            { field: 'totalAmount', header: 'Total Amount', headerKey: 'COMMON.TOTAL_AMOUNT', type: 'currency',
                  headerstyle: {width: '15%', 'text-align': 'center'}, rowstyle: {width: '15%'},
                  textstyle: {'text-align': 'right'}  }
        ];

    this.laborCols = [
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                  headerstyle: {width: '30%', 'text-align': 'center'}, rowstyle: {width: '15%'} },
            { field: 'amount', header: 'Amount', headerKey: 'COMMON.AMOUNT', type: 'currency',
                  headerstyle: {width: '15%', 'text-align': 'center'}, rowstyle: {width: '15%'},
                  textstyle: {'text-align': 'right'}  },
            { field: 'paid', header: 'Paid', headerKey: 'COMMON.PAID', type: 'currency',
                  headerstyle: {width: '10%', 'text-align': 'center'}, rowstyle: {width: '15%'},
                  textstyle: {'text-align': 'right'}  },
            { field: 'balance', header: 'Balance', headerKey: 'COMMON.BALANCE', type: 'currency',
                  headerstyle: {width: '15%', 'text-align': 'center'}, rowstyle: {width: '15%'},
                  textstyle: {'text-align': 'right'}  },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS', type: 'string',
                  headerstyle: {width: '5%', 'text-align': 'center'}, rowstyle: {width: '15%'} },
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Quote', parameters , ' ORDER BY status, quoteDate DESC ')
            .subscribe((data: Quote[]) => {
              this.quotes = data;
              this.totalQuote = this.quotes
                              .map(c => c.status === 0 ? c.totalAmount : 0)
                              .reduce((sum, current) => sum + current);
            },
            error => console.log(error),
            () => console.log('Get all quote complete'));
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
    this.quotes = null;
  }

  edit(quote: Quote) {
      this.quoteIdEvent.emit(quote.id + '');
      this.selectedQuote = quote;
  }

  deleteFile(quote: Quote, fileName: string) {
    const vo = new Reference();
    vo.id = quote.id;
    vo.name = fileName;
     this.genericService.deleteFile('com.wack.model.stock.Quote', vo)
            .subscribe((data: GenericResponse) => {
        this.removeElement(quote.fileNames, fileName);
      },
      error => console.log(error),
      () => console.log('Get all quote complete'));

  }

  updateTable(quote: Quote) {
    const index = this.quotes.findIndex(x => x.id === quote.id);

    if (index === -1) {
      this.quotes.push(quote);
    } else {
      this.quotes[index] = quote;
    }

  }

  public getFiles(quote: Quote) {
    this.getQuote(quote);
  }

  getQuote(quote: Quote) {

    this.genericService.getOneWithFiles(quote.id, 'com.wack.model.stock.Quote')
        .subscribe(result => {
      if (result.id > 0) {
        quote.fileNames = result.fileNames;
      } else {
        this.translate.get(['COMMON.READ', 'MESSAGE.READ_FAILED']).subscribe(res => {
          this.messages.push({severity:
            Constants.ERROR, summary:
            res['COMMON.READ'], detail:
            res['MESSAGE.READ_FAILED']});
        });
      }
    });
  }

  getQuoteItems(quote: Quote) {
      const parameters: string [] = [];
      parameters.push('e.quote.id = |quoteId|' + quote.id + '|Long');

      this.genericService.getAllByCriteria('com.wack.model.stock.Material', parameters, ' ')
      .subscribe((data: any[]) => {
          quote.materials = data;
          if (data.length === 0) {
            quote.materials.push(new Material());
          }
      },
      error => console.log(error),
      () => console.log('Get Material List complete'));


      this.genericService.getAllByCriteria('com.wack.model.stock.ContractLabor', parameters, ' ')
      .subscribe((data: any[]) => {
          quote.contractLabors = data;
      },
      error => console.log(error),
      () => console.log('Get Labor List complete'));
   }


  calculateTotal(quote: Quote, material: Material) {
    material.totalAmount = this.getNumber(material.unitPrice) * this.getNumber(material.quantity);

    quote.totalAmount = 0;

    // tslint:disable-next-line: forin
    for (const i in quote.materials) {
      quote.totalAmount += quote.materials[i].totalAmount;
    }
  }


  save(quote: Quote, material: Material, index: number) {
    this.messages = [];
    try {
      material.quote = new Quote();
      material.quote.id = quote.id;

      this.genericService.saveMaterial(material)
        .subscribe(result => {
          if (result.id > 0) {
            material = result;
            this.updateMaterialTable(quote, material, index);
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
              this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
              });
          } else {
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
              this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
              });
          }
        });


    } catch (e) {
      console.log(e);
    }
  }

  updateMaterialTable(quote: Quote, material: Material, comingIndex: number) {
    const index = comingIndex === -1 ? quote.materials.findIndex(x => x.id === material.id) : comingIndex;
    if (index === -1) {
      quote.materials.push(material);
    } else {
      quote.materials[index] = material;
    }

  }

  deleteMaterial(quote: Quote, material: Material) {
    this.messages = [];
    quote.totalAmount -= this.getNumber(material.totalAmount);

    if (material.id === undefined || material.id === null) {
      this.removeItem(quote.materials, +material.id);
      return;
    }

    try {

      this.genericService.deleteWithUrl('/service/Quote/material/delete/', material.id)
        .subscribe(result => {
          this.removeItem(quote.materials, material.id);
          this.processDeleteResult(result, this.messages);
        });


    } catch (e) {
      console.log(e);
    }
  }

  addNewMaterial(quote: Quote) {
    quote.materials.push(new Material());
  }

  exportPdf() {
      const doc = new jsPDF();
      const locale = this.globalEventsManager.LOCALE;
      const cp = this.cp;
      const translate = this.translate;
      const footRow = [{paymentDate: 'Totals', totalAmount: this.totalQuote}];
      doc.autoTable({
        columns: this.exportCols,
        body: this.quotes,
        foot: footRow,
        footStyles: {
            fillColor: [241, 196, 15],
            fontSize: 10
        },
        columnStyles: {
            totalAmount: {
                halign: 'right',
                cellWidth: 30,
            }
        },
        didParseCell: function(data) {
            if (data.row.section === 'body' && data.column.dataKey === 'quoteDate') {
              data.cell.text[0] = new Date(+ data.cell.text[0]).toLocaleDateString(locale,
                Constants.LOCAL_DATE_OPTIONS);
            }
            if ((data.row.section === 'body' || data.row.section === 'foot') && data.column.dataKey === 'totalAmount') {
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



      doc.save('quoteList.pdf');
  }


    // exportExcel() {
    //     import('xlsx').then(xlsx => {
    //         const worksheet = xlsx.utils.json_to_sheet(this.getCars());
    //         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //         this.saveAsExcelFile(excelBuffer, 'primengTable');
    //     });
    // }

    // saveAsExcelFile(buffer: any, fileName: string): void {
    //     import('file-saver').then(FileSaver => {
    //         const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //         const EXCEL_EXTENSION = '.xlsx';
    //         const data: Blob = new Blob([buffer], {
    //             type: EXCEL_TYPE
    //         });
    //         FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //     });
    // }

 }
