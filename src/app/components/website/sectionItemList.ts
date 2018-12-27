import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SectionItem } from '../../models/website';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Component({
  selector: 'app-sectionItem-list',
  templateUrl: '../../pages/website/sectionItemList.html',
  providers: [GenericService]
})
export class SectionItemList implements OnInit, OnDestroy {
  
  sectionItems: SectionItem[] = [];
  cols: any[];
  
  @Output() sectionItemIdEvent = new EventEmitter<string>();
  
  SECTIONITEM_LIST_LABEL: string;
  SECTIONITEM_LIST: string;
  
  constructor
    (
    private genericService: GenericService,
    private translate: TranslateService,
    private globalEventsManager: GlobalEventsManager,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    
    this.cols = [
            { field: 'section', header: 'Section', headerKey: 'COMMON.SECTION' },
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME' },
            { field: 'title', header: 'Title', headerKey: 'COMMON.TITLE' },
            { field: 'description', header: 'Description', headerKey: 'COMMON.DESCRIPTION' },
            { field: 'picture', header: 'Picture', headerKey: 'COMMON.PICTURE' },
            { field: 'statusDesc', header: 'Status', headerKey: 'COMMON.STATUS' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {

          let parameters: string [] = []; 
                      
          this.genericService.getAllByCriteria('com.qkcare.model.website.SectionItem', parameters)
            .subscribe((data: SectionItem[]) => 
            { 
              this.sectionItems = data 
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
    for (var index in this.cols) {
      let col = this.cols[index];
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

  delete(sectionItemId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "sectionItemId": sectionItemId,
        }
      }
      this.router.navigate(["/admin/sectionItemDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
