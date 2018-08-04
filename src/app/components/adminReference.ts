import { Component,LOCALE_ID,OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { PatientDetails } from './patientDetails';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import { Patient } from '../models/patient';
import { UserGroup } from '../models/userGroup';
import { GenericService, UserService, GlobalEventsManager } from '../services';
import { CategoryDropdown } from './dropdowns';
import { ReferenceDetails } from './referenceDetails';
import { ReferenceList } from './referenceList';
import { ReferenceWithCategoryDetails } from './referenceWithCategoryDetails';

@Component({
  selector: 'app-admin-reference',
  templateUrl: '../pages/adminReference.html',
  providers: [GenericService ]
})
export class AdminReference implements OnInit {
  [x: string]: any;

  @ViewChild(ReferenceDetails) referenceDetails: ReferenceDetails;
  @ViewChild(ReferenceWithCategoryDetails) referenceWithCategoryDetails: ReferenceWithCategoryDetails;
  public user: User;
  public patient: Patient;
  public activeTab = 0;
  currentUser: User = JSON.parse(Cookie.get('user'));

  ABSENCES: string = Constants.ABSENCES;
  constructor (
    private genericService: GenericService,
    private globalEventsManager: GlobalEventsManager,
    private categoryDropdown: CategoryDropdown,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    
    this.user = new User();
    this.patient = new Patient();
  }
  
  
  ngOnInit() {
    this.globalEventsManager.currentPatientId.subscribe(patientId => this.patient.id = patientId)
    this.globalEventsManager.selectedParentId = 3;
    
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.globalEventsManager.selectedReferenceType = "Category";
    
  }

  onReferenceSelected($event, referenceType) {
    let referenceId = $event;
    this.referenceDetails.getReference(referenceId, referenceType);
  }
  
   onReferenceWithCategorySelected($event, referenceWithCategoryType) {
    let referenceWithCategoryId = $event;
    this.referenceWithCategoryDetails.getReferenceWithCategory(referenceWithCategoryId, referenceWithCategoryType);
  }
  
  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) {
      this.globalEventsManager.selectedParentId = 3;
      this.globalEventsManager.selectedReferenceType = "Category";
    } else if (evt.index == 1) {
      this.globalEventsManager.selectedParentId = 3;
      this.globalEventsManager.selectedReferenceWithCategoryType = "Symptom";
      this.categoryDropdown.getAllCategories(3);
    } else if (evt.index == 2) {
      this.globalEventsManager.selectedParentId = 4;
      this.globalEventsManager.selectedReferenceType = "Category";
      this.referenceDetails.parentId = 4;
    } else if (evt.index == 3) {
      this.globalEventsManager.selectedParentId = 4;
      this.globalEventsManager.selectedReferenceWithCategoryType = "Allergy";
      this.categoryDropdown.getAllCategories(4);
    }
  }


}
