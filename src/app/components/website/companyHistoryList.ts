import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Section, CompanyHistory } from '../../models/website';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager, TokenStorage } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { BaseComponent } from './baseComponent';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-companyhistory-list',
  templateUrl: '../../pages/website/companyHistoryList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class CompanyHistoryList extends BaseComponent implements OnInit, OnDestroy {

  companyHistories: CompanyHistory[] = [];
  cols: any[];

  @Output() companyHistoryIdEvent = new EventEmitter<string>();

  COMPANY_HISTORY_LIST_LABEL: string;
  COMPANY_HISTORY_LIST: string;

  constructor
    (
    public genericService: GenericService,
		public confirmationService: ConfirmationService,
		public translate: TranslateService,
		public tokenStorage: TokenStorage,
    private globalEventsManager: GlobalEventsManager,
    private route: ActivatedRoute,
    private router: Router,
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'year', header: 'Year', headerKey: 'COMMON.YEAR' },
            { field: 'title', header: 'Title', headerKey: 'COMMON.TITLE' },
            { field: 'language', header: 'Language', headerKey: 'COMMON.LANGUAGE' },
            { field: 'picture', header: 'Picture', headerKey: 'COMMON.PICTURE' },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS' }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.website.CompanyHistory', parameters)
            .subscribe((data: CompanyHistory[]) => {
              this.companyHistories = data;
            },
            error => console.log(error),
            () => console.log('Get all CompanyHistory complete'));
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
    this.companyHistories = null;
  }

  edit(companyHistoryId: number) {
      this.companyHistoryIdEvent.emit(companyHistoryId + '');
  }

  delete(companyHistoryId: number) {
    try {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'companyHistoryId': companyHistoryId,
        }
      };
      this.router.navigate(['/admin/companyHistoryDetails'], navigationExtras);
    } catch (e) {
      console.log(e);
    }
  }


  updateTable(companyHistory: CompanyHistory) {
		const index = this.companyHistories.findIndex(x => x.id === companyHistory.id);

		if (index === -1) {
			this.companyHistories.push(companyHistory);
		} else {
			this.companyHistories[index] = companyHistory;
		}

  }

 }
