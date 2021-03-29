import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng';
import { GenericService, TokenStorage } from '../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { BaseComponent } from './website/baseComponent';
import { Testimony } from '../models';

@Component({
  selector: 'app-testimony-list',
  templateUrl: '../pages/testimonyList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class TestimonyList extends BaseComponent implements OnInit, OnDestroy {

  testimonies: Testimony[] = [];
  selectedTestimony: Testimony;
  cols: any[];
  @Output() testimonyIdEvent = new EventEmitter<string>();
  MODEL = 'com.wack.model.website.Testimony';

  constructor
    (
    public genericService: GenericService,
		public confirmationService: ConfirmationService,
		public translate: TranslateService,
		public tokenStorage: TokenStorage,
    ) {

      super(genericService, translate, confirmationService, tokenStorage);
      const parameters: string [] = [];
      this.genericService.getAllByCriteria(this.MODEL, parameters)
          .subscribe((data: Testimony[]) => {
        this.testimonies = data;
      },
      error => console.log(error),
      () => console.log('Get all Testimony complete'));

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

  ngOnInit(): void {

    this.cols = [
            { field: 'author', header: 'Author', headerKey: 'COMMON.AUTHOR', type: 'string' },
            { field: 'language', header: 'Language', headerKey: 'COMMON.LANGUAGE', type: 'string' },
            { field: 'comments', header: 'Comments', headerKey: 'COMMON.COMMENTS' },
            { field: 'rank', header: 'Rank', headerKey: 'COMMON.RANK', type: 'number' },
            { field: 'status', header: 'Status', headerKey: 'COMMON.STATUS', type: 'string' }
        ];

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.updateCols();
    });
  }


  ngOnDestroy() {
    this.testimonies = null;
  }

  edit(testimony: Testimony) {
      this.testimonyIdEvent.emit(testimony.id + '');
      this.selectedTestimony = testimony;
  }

  updateTable(testimony: Testimony) {
		const index = this.testimonies.findIndex(x => x.id === testimony.id);

		if (index === -1) {
			this.testimonies.push(testimony);
		} else {
			this.testimonies[index] = testimony;
		}

  }

  getStatusDesc(testimony: Testimony): string {
    let statusDesc = '';
    if (testimony.status === 0) {
      statusDesc = 'Actif';
    } else if (testimony.status === 1) {
      statusDesc = 'Inactif';
    }
    return statusDesc;
  }
 }
