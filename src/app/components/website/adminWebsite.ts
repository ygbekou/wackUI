import { Component, LOCALE_ID, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../../app.constants';
import { GenericService, UserService, GlobalEventsManager } from '../../services';
import { SectionDetails } from './sectionDetails';
import { SectionList } from './sectionList';
import { SectionItemDetails } from './sectionItemDetails';
import { SectionItemList } from './sectionItemList';
import { EmployeeDetails } from '../employeeDetails';



@Component({
  selector: 'app-admin-website',
  templateUrl: '../../pages/website/adminWebsite.html',
  providers: [GenericService ]
})
// tslint:disable-next-line:component-class-suffix
export class AdminWebsite implements OnInit, OnDestroy {
  [x: string]: any;

  @ViewChild(SectionDetails) sectionDetails: SectionDetails;
  @ViewChild(SectionList) sectionList: SectionList;
  @ViewChild(SectionItemDetails) sectionItemDetails: SectionItemDetails;
  @ViewChild(SectionItemList) sectionItemList: SectionItemList;
  @ViewChild(EmployeeDetails) employeeDetails: EmployeeDetails;

  public activeTab = 0;
  public activeEmployeeTab = 1;

  constructor (
    private globalEventsManager: GlobalEventsManager,
  ) {

  }

  ngOnInit() {
    this.globalEventsManager.showMenu = true;
  }

  ngOnDestroy () {
    this.sectionDetails = null;
    this.sectionList = null;
    this.sectionItemDetails = null;
    this.sectionItemList = null;
  }

  onSectionSelected($event) {
      const sectionId = $event;
      this.sectionDetails.getSection(sectionId);
  }
  onSectionItemSelected($event) {
      const sectionItemId = $event;
      this.sectionItemDetails.getSection(sectionItemId);
  }
  onEmployeeSelected($event) {
      this.activeEmployeeTab = 0;
      const employeeId = $event;
      this.employeeDetails.getEmployee(employeeId);

  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    setTimeout(() => {
        if (evt.index === 0) {
        } else if (evt.index === 1) {
        }
    }, 0);
  }

  onEmployeeTabChange(evt) {
    this.activeEmployeeTab = evt.index;
  }
}
