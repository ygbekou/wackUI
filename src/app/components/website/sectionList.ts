import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Section } from '../../models/website';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager, TokenStorage } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { BaseComponent } from './baseComponent';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-section-list',
  templateUrl: '../../pages/website/sectionList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class SectionList extends BaseComponent implements OnInit, OnDestroy {

  sections: Section[] = [];
  cols: any[];

  @Output() sectionIdEvent = new EventEmitter<string>();

  SECTION_LIST_LABEL: string;
  SECTION_LIST: string;

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
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME' },
            { field: 'title', header: 'Title', headerKey: 'COMMON.TITLE' },
            { field: 'language', header: 'Language', headerKey: 'COMMON.LANGUAGE' },
            { field: 'picture', header: 'Picture', headerKey: 'COMMON.PICTURE' },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS' }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.website.Section', parameters)
            .subscribe((data: Section[]) => {
              this.sections = data;
            },
            error => console.log(error),
            () => console.log('Get all Section complete'));
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
    this.sections = null;
  }

  edit(sectionId: number) {
      this.sectionIdEvent.emit(sectionId + '');
  }

  delete(sectionId: number) {
    try {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'sectionId': sectionId,
        }
      };
      this.router.navigate(['/admin/sectionDetails'], navigationExtras);
    } catch (e) {
      console.log(e);
    }
  }


  updateTable(section: Section) {
		const index = this.sections.findIndex(x => x.id === section.id);

		if (index === -1) {
			this.sections.push(section);
		} else {
			this.sections[index] = section;
		}

  }

 }
