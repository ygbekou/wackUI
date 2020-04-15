import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Reference } from '../../models';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager, TokenStorage } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { BaseComponent } from '../website/baseComponent';

@Component({
  selector: 'app-reference-list',
  templateUrl: '../../pages/common/referenceList.html',
  providers: [GenericService]
})
export class ReferenceList extends BaseComponent implements OnInit, OnDestroy {

  references: Reference[] = [];
  selectedReference: Reference;
  cols: any[];

  referenceType: string = null;
  parentId: number = null;
  hiddenMenu = false;
  @Input() canView: boolean;
  @Input() canDelete: boolean;
  @Output() referenceIdEvent = new EventEmitter<string>();

  REFERENCE_LIST_LABEL: string;
  REFERENCE_LIST: string;

  constructor
    (
    public genericService: GenericService,
    public translate: TranslateService,
    public confirmationService: ConfirmationService,
    public tokenStorage: TokenStorage,
    private globalEventsManager: GlobalEventsManager,
    private route: ActivatedRoute,
    private router: Router,
    ) {
		  super(genericService, translate, confirmationService, tokenStorage);
  }

  ngOnInit(): void {

    	this.cols = [
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                                        style: {width: '25%', 'text-align': 'center'} },
            { field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION', type: 'string',
                                        style: {width: '50%', 'text-align': 'center'},
                                        textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS', type: 'string',
                                        style: {width: '10%', 'text-align': 'center'}
                                       }
        ];

		this.getAll();

		this.updateCols(this.REFERENCE_LIST_LABEL);
    	this.translate.onLangChange.subscribe(() => {
      		this.updateCols(this.REFERENCE_LIST_LABEL);
    	});
  }


  getAll() {
	   this.route
        .queryParams
        .subscribe(params => {

          this.referenceType = params['referenceType'];

          if (this.referenceType === undefined) {
            this.referenceType = this.globalEventsManager.selectedReferenceType;
            this.hiddenMenu = true;
          } else {
            this.hiddenMenu = false;
          }

          this.parentId = params['parentId'];
          if (this.parentId == null) {
            this.parentId = this.globalEventsManager.selectedParentId;
          }

          const parameters: string [] = [];

          if (this.parentId != null && this.referenceType === 'Category') {
            parameters.push('e.parent.id = |parentId|' + this.parentId + '|Long');
		  }

          this.genericService.getAllByCriteria(this.referenceType, parameters)
            .subscribe((data: Reference[]) => {
              this.references = data;
            },
            error => console.log(error),
            () => console.log('Get all Reference complete'));
     });
  }


  updateCols(category: string) {
    for (const index in this.cols) {
      const col = this.cols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }

    const refList = 'COMMON.LIST';
    this.translate.get(refList).subscribe((res: string) => {
        this.REFERENCE_LIST = res;
    });

    this.translate.onLangChange.subscribe(() => {
      this.updateCols(category);
    });
  }


  ngOnDestroy() {
    this.references = null;
  }

  edit(reference: Reference, referenceType) {
    try {
      if (this.hiddenMenu) {
        this.referenceIdEvent.emit(reference.id + '');
        this.selectedReference = reference;
      } else {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            'referenceId': reference.id,
            'referenceType': referenceType
          }
        };
        this.router.navigate(['/common/referenceDetails'], navigationExtras);
      }
    } catch (e) {
      console.log(e);
    }

  }

  updateTable(reference: Reference) {
		const index = this.references.findIndex(x => x.id === reference.id);

		if (index === -1) {
			this.references.push(reference);
		} else {
			this.references[index] = reference;
		}

	}

 }
