import {User} from '../../models/user';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-admin-menu',
  templateUrl: '../../pages/menu/adminMenu.html',
  styles: [` .nav>li.active>a {
    background: 0;
    color: #0078ae;
    font-weight: bold;
    border-left: 10px solid #2191c0;
}
    `]
})
export class AdminMenu implements OnInit {
  public departmentDetails: string;
  public departmentList: string;
  public doctorDetails: string;
  public doctorList: string;
  public employeeDetails: string;
  public employeeList: string;
  public patientDetails: string;
  public patientList: string;
  public documentDetails: string;
  public documentList: string;
  public scheduleDetails: string;
  public scheduleList: string;
  public appointmentDetails: string;
  public caseStudyDetails: string;
  public caseStudyList: string;
  public medicineCategoryDetails: string;
  public medicineCategoryList: string;
  public manufacturerDetails: string;
  public manufacturerList: string;
  public medicineDetails: string;
  public medicineList: string;
  public adminMain: string;
  public adminProfile: string;
  user: User;
  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    if (this.user == null) {
      if (Cookie.get('user'))
        this.user = JSON.parse(Cookie.get('user'));
      if (this.user == null) {
        this.user = new User();
        this.user.id = 0;
      }
    }

    this.route
      .queryParams
      .subscribe(params => {
        this.departmentDetails = params['departmentDetails'];
        this.departmentList = params['departmentList'];
        this.doctorDetails = params['doctorDetails'];
        this.doctorList = params['doctorList'];
        this.employeeDetails = params['employeeDetails'];
        this.employeeList = params['employeeList'];
        this.patientDetails = params['patientDetails'];
        this.patientList = params['patientList'];
        this.documentDetails = params['documentDetails'];
        this.documentList = params['documentList'];
        this.scheduleDetails = params['scheduleDetails'];
        this.scheduleList = params['scheduleList'];
        this.appointmentDetails = params['appointmentDetails'];
        this.caseStudyDetails = params['caseStudyDetails'];
        this.caseStudyList = params['caseStudyList'];
        this.medicineCategoryDetails = params['medicineCategoryDetails'];
        this.medicineCategoryList = params['medicineCategoryList'];
        this.manufacturerDetails = params['manufacturerDetails'];
        this.manufacturerList = params['manufacturerList'];
        this.medicineDetails = params['medicineDetails'];
        this.medicineList = params['medicineList'];
        this.adminMain = params['adminMain'];
        this.adminProfile = params['adminProfile'];
      })
  }
}
