import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SectionItem } from '../../models/website';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { SectionDropdown } from './../dropdowns';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-sectionItem-details',
  templateUrl: '../../pages/website/sectionItemDetails.html',
  providers: [GenericService, SectionDropdown]
  
})
export class SectionItemDetails implements OnInit, OnDestroy {
  
  sectionItem: SectionItem = new SectionItem();
  messages: Message[] = [];
 
  constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      private globalEventsManager: GlobalEventsManager,
      public  sectionDropdown: SectionDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.sectionItem = new SectionItem();
  }

  
  
  ngOnInit(): void {
    
  }
  
  ngOnDestroy() {
    this.sectionItem = null;
  }

  getSection(sectionItemId: number) {
    this.messages = [];
    this.genericService.getOne(sectionItemId, 'com.qkcare.model.website.SectionItem')
        .subscribe(result => {
      if (result.id > 0) {
        this.sectionItem = result;
      }
      else {
        this.translate.get(['COMMON.READ', 'MESSAGE.READ_FAILED']).subscribe(res => {
          this.messages.push({severity:Constants.ERROR, summary:res['COMMON.READ'], detail:res['MESSAGE.READ_FAILED']});
        });
      }
    })
  }
  
  clear() {
    this.sectionItem = new SectionItem();
  }
  
  save() {
    this.messages = [];
    try {
      
      this.genericService.save(this.sectionItem, 'com.qkcare.model.website.SectionItem')
        .subscribe(result => {
          if (result.id > 0) {
            this.sectionItem = result;
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
              this.messages.push({severity:Constants.SUCCESS, summary:res['COMMON.SAVE'], detail:res['MESSAGE.SAVE_SUCCESS']});
            });
          }
          else {
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_UNSUCCESS']).subscribe(res => {
              this.messages.push({severity:Constants.SUCCESS, summary:res['COMMON.SAVE'], detail:res['MESSAGE.SAVE_UNSUCCESS']});
            });
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

 }
