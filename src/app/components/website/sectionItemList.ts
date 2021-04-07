import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SectionItem } from '../../models/website';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager, TokenStorage } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { BaseComponent } from './baseComponent';
import { ConfirmationService } from 'primeng/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sectionItem-list',
  templateUrl: '../../pages/website/sectionItemList.html',
  providers: []
})
// tslint:disable-next-line:component-class-suffix
export class SectionItemList extends BaseComponent implements OnInit, OnDestroy {

  sectionItems: SectionItem[] = [];
  cols: any[];

  @Output() sectionItemIdEvent = new EventEmitter<string>();

  SECTIONITEM_LIST_LABEL: string;
  SECTIONITEM_LIST: string;

  constructor
    (
    public genericService: GenericService,
		public confirmationService: ConfirmationService,
		public translate: TranslateService,
		public tokenStorage: TokenStorage,
    private route: ActivatedRoute,
    private router: Router,
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'sectionName', header: 'Section', headerKey: 'COMMON.SECTION' },
            { field: 'title', header: 'Title', headerKey: 'COMMON.TITLE' },
            //{ field: 'picture', header: 'Picture', headerKey: 'COMMON.PICTURE' },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS' }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
            .subscribe((data: SectionItem[]) => {
              this.sectionItems = data ;
            },
            error => console.log(error),
            () => console.log('Get all SectionItem complete'));
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
    this.sectionItems = null;
  }

  edit(sectionItemId: number) {
      this.sectionItemIdEvent.emit(sectionItemId + '');
  }

  delete(sectionItemId: number) {
    try {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'sectionItemId': sectionItemId,
        }
      };
      // tslint:disable-next-line:quotemark
      this.router.navigate(["/admin/sectionItemDetails"], navigationExtras);
    } catch (e) {
      console.log(e);
    }
  }


  updateTable(sectionItem: SectionItem) {
		const index = this.sectionItems.findIndex(x => x.id === sectionItem.id);

		if (index === -1) {
			this.sectionItems.push(sectionItem);
		} else {
			this.sectionItems[index] = sectionItem;
		}

  }

 }
