import { Component,LOCALE_ID,OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import { Patient } from '../models/patient';
import { Admission } from '../models/admission';
import { UserGroup } from '../models/userGroup';
import { GenericService, UserService, GlobalEventsManager } from '../services';
import { AdmissionDetails } from './admissionDetails';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-patientAdmission',
  templateUrl: '../pages/adminAdmission.html',
  providers: [GenericService ]
})
export class AdminAdmission implements OnInit {
  [x: string]: any;

  @ViewChild(AdmissionDetails) patientAdmissionDetails: AdmissionDetails;
  public user: User;
  public admission: Admission;
  private patientAdmissionId: number;
  public activeTab = 0;
  currentUser: User = JSON.parse(Cookie.get('user'));

  ABSENCES: string = Constants.ABSENCES;
  constructor (
    private genericService: GenericService,
    private globalEventsManager: GlobalEventsManager,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.user = new User();
    this.admission = new Admission();
  }
  
  
  ngOnInit() {

    this.route
        .queryParams
        .subscribe(params => {          
          
          this.admission.id = params['admissionId'];
     
        });
        
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
  } 

  onAppointmentSelected($event) {
    let appointmentId = $event;
    this.appointmentDetails.getAppointment(appointmentId);
  }
  
  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) {
      this.activeTab = 0
    } else if (evt.index == 1) {
      this.activeTab = 1
    } 
  }


}
