import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager, TokenStorage } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Quote, Reference } from 'src/app/models';
import { Message, ConfirmationService } from 'primeng/api';
import { Constants } from 'src/app/app.constants';
import { GenericResponse } from 'src/app/models/genericResponse';
import { BaseComponent } from '../website/baseComponent';

@Component({
  selector: 'app-quote-list',
  templateUrl: '../../pages/stock/quoteList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class QuoteList extends BaseComponent implements OnInit, OnDestroy {

  quotes: Quote[] = [];
  selectedQuote: Quote;
  cols: any[];
  fileCols: any[];
  messages: Message[] = [];

  @Output() quoteIdEvent = new EventEmitter<string>();


  constructor
    (
    public genericService: GenericService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public globalEventsManager: GlobalEventsManager,
    public confirmationService: ConfirmationService,
    public tokenStorage: TokenStorage,
    private router: Router,
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'quoteDate', header: 'Date', headerKey: 'COMMON.QUOTE_DATE', type: 'date',
                  style: {width: '10%', 'text-align': 'center'}  },
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME',
                  style: {width: '20%', 'text-align': 'center'} },
            { field: 'quoterName', header: 'Quoter', headerKey: 'COMMON.QUOTER',
                  style: {width: '20%', 'text-align': 'center'}  },
            { field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION',
                  style: {width: '40%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'}  }
        ];

    this.fileCols = [
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                  style: {width: '90%', 'text-align': 'center'}  }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Quote', parameters)
            .subscribe((data: Quote[]) => {
              this.quotes = data;
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

 }
