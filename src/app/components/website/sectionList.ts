import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Section } from '../../models/website';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Component({
  selector: 'app-section-list',
  templateUrl: '../../pages/website/sectionList.html',
  providers: [GenericService]
})
export class SectionList implements OnInit, OnDestroy {
  
  sections: Section[] = [];
  cols: any[];
  
  @Output() sectionIdEvent = new EventEmitter<string>();
  
  SECTION_LIST_LABEL: string;
  SECTION_LIST: string;
  
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
                      
          this.genericService.getAllByCriteria('com.qkcare.model.website.Section', parameters)
            .subscribe((data: Section[]) => 
            { 
              this.sections = data 
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
    for (var index in this.cols) {
      let col = this.cols[index];
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

  delete(sectionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "sectionId": sectionId,
        }
      }
      this.router.navigate(["/admin/sectionDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
