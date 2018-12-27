import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Section } from '../../models/website';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-section-details',
  templateUrl: '../../pages/website/sectionDetails.html',
  providers: [GenericService]
  
})
export class SectionDetails implements OnInit, OnDestroy {
  
  section: Section = new Section();
  messages: Message[] = [];
 
  constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      private globalEventsManager: GlobalEventsManager,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.section = new Section();
  }

  
  
  ngOnInit(): void {
    
  }
  
  ngOnDestroy() {
    this.section = null;
  }

  getSection(sectionId: number) {
    this.messages = [];
    this.genericService.getOne(sectionId, 'com.qkcare.model.website.Section')
        .subscribe(result => {
      if (result.id > 0) {
        this.section = result;
      }
      else {
        this.translate.get(['COMMON.READ', 'MESSAGE.READ_FAILED']).subscribe(res => {
          this.messages.push({severity:Constants.ERROR, summary:res['COMMON.READ'], detail:res['MESSAGE.READ_FAILED']});
        });
      }
    })
  }
  
  clear() {
    this.section = new Section();
  }
  
  save() {
    this.messages = [];
    try {
      
      this.genericService.save(this.section, 'com.qkcare.model.website.Section')
        .subscribe(result => {
          if (result.id > 0) {
            this.section = result;
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
