import { Component,LOCALE_ID,OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../../app.constants';
import { GenericService, UserService, GlobalEventsManager } from '../../services';
import { SectionDetails } from './sectionDetails';
import { SectionList } from './sectionList';
import { SectionItemDetails } from './sectionItemDetails';
import { SectionItemList } from './sectionItemList';



@Component({
  selector: 'app-admin-website',
  templateUrl: '../../pages/website/adminWebsite.html',
  providers: [GenericService ]
})
export class AdminWebsite implements OnInit, OnDestroy {
  [x: string]: any;

  @ViewChild(SectionDetails) sectionDetails: SectionDetails;
  @ViewChild(SectionList) sectionList: SectionList;
  @ViewChild(SectionItemDetails) sectionItemDetails: SectionItemDetails;
  @ViewChild(SectionItemList) sectionItemList: SectionItemList;
  
  public activeTab = 0;

  constructor (
    private genericService: GenericService,
    private globalEventsManager: GlobalEventsManager,
  ) {
   
  }
  
  
  ngOnInit() {
    
  }

  ngOnDestroy () {
    this.sectionDetails = null;
    this.sectionList = null;
    this.sectionItemDetails = null;
    this.sectionItemList = null;
  }
  
  onSectionSelected($event) {
      let sectionId = $event;
      this.sectionDetails.getSection(sectionId);
  }
  
  onSectionItemSelected($event) {
      let sectionItemId = $event;
      this.sectionItemDetails.getSection(sectionItemId);
  }
  
  
  onTabChange(evt) {
    this.activeTab = evt.index;
    setTimeout(() => {
        if (evt.index == 0) {
        } else if (evt.index == 1) {
          
        } 
    
     }, 0);
  }
}
