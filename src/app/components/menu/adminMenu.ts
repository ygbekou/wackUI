import {User} from '../../models/user';
import {GlobalEventsManager} from "../../services/globalEventsManager";
import {Component, OnInit, Input} from '@angular/core';
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
  public religionDetails: string;
  public religionList: string;
  public occupationDetails: string;
  public occupationList: string;
  public departmentDetails: string;
  public departmentList: string;
  public doctorDetails: string;
  public doctorList: string;
  public employeeDetails: string;
  public employeeList: string;
  public adminPatient: string;
  public patientDetails: string;
  public patientList: string;
  public documentDetails: string;
  public documentList: string;
  public scheduleDetails: string;
  public scheduleList: string;
  public appointmentScheduler: string;
  public caseStudyDetails: string;
  public caseStudyList: string;
  public medicineCategoryDetails: string;
  public medicineCategoryList: string;
  public manufacturerDetails: string;
  public manufacturerList: string;
  public medicineDetails: string;
  public medicineList: string;
  public prescriptionDetails: string;
  public prescriptionList: string;
  public accountDetails: string;
  public accountList: string;
  public invoiceDetails: string;
  public invoiceList: string;
  public paymentDetails: string;
  public paymentList: string;
  public insuranceDetails: string;
  public insuranceList: string;
  public serviceDetails: string;
  public serviceList: string;
  public packageDetails: string;
  public packageList: string;
  public payerTypeDetails: string;
  public payerTypeList: string;
  public billDetails: string;
  public billList: string;
  public vitalSignDetails: string;
  public vitalSignList: string;
  public adminMain: string;
  public adminProfile: string;
  user: User;
  
  moduleName: string;
  menus: { [id: string] : any[]; } = {};
  
  constructor(
    private globalEventsManager: GlobalEventsManager,
    private route: ActivatedRoute
  ) {
    
    this.menus["appointmentModule"] = ['adminPatient', 'patientList', 'scheduleDetails', 'scheduleList', 'appointmentScheduler'];
    this.menus["outpatientModule"] = ['payerTypeDetails', 'payerTypeList', 'adminPatient', 'patientList', 'prescriptionDetails', 
      'prescriptionList', 'billDetails', 'billList', 'vitalSignDetails', 'vitalSignList'];

  }

  ngOnInit() {
    this.globalEventsManager.currentModuleName.subscribe(moduleName => this.moduleName = moduleName)

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
        this.religionDetails = params['religionDetails'];
        this.religionList = params['religionList'];
        this.occupationDetails = params['occupationDetails'];
        this.occupationList = params['occupationList'];
        this.departmentDetails = params['departmentDetails'];
        this.departmentList = params['departmentList'];
        this.doctorDetails = params['doctorDetails'];
        this.doctorList = params['doctorList'];
        this.employeeDetails = params['employeeDetails'];
        this.employeeList = params['employeeList'];
        this.adminPatient = params['adminPatient'];
        this.patientDetails = params['patientDetails'];
        this.patientList = params['patientList'];
        this.documentDetails = params['documentDetails'];
        this.documentList = params['documentList'];
        this.scheduleDetails = params['scheduleDetails'];
        this.scheduleList = params['scheduleList'];
        this.appointmentScheduler = params['appointmentScheduler'];
        this.caseStudyDetails = params['caseStudyDetails'];
        this.caseStudyList = params['caseStudyList'];
        this.medicineCategoryDetails = params['medicineCategoryDetails'];
        this.medicineCategoryList = params['medicineCategoryList'];
        this.manufacturerDetails = params['manufacturerDetails'];
        this.manufacturerList = params['manufacturerList'];
        this.medicineDetails = params['medicineDetails'];
        this.medicineList = params['medicineList'];
        this.prescriptionDetails = params['prescriptionDetails'];
        this.prescriptionList = params['prescriptionList'];
        this.accountDetails = params['accountDetails'];
        this.accountList = params['accountList'];
        this.invoiceDetails = params['invoiceDetails'];
        this.invoiceList = params['invoiceList'];
        this.paymentDetails = params['paymentDetails'];
        this.paymentList = params['paymentList'];
        this.insuranceDetails = params['insuranceDetails'];
        this.insuranceList = params['insuranceList'];
        this.serviceDetails = params['serviceDetails'];
        this.serviceList = params['serviceList'];
        this.packageDetails = params['packageDetails'];
        this.packageList = params['packageList'];
        this.payerTypeDetails = params['payerTypeDetails'];
        this.payerTypeList = params['payerTypeList'];
        this.billDetails = params['billDetails'];
        this.billList = params['billList'];
        this.vitalSignDetails = params['vitalSignDetails'];
        this.vitalSignList = params['vitalSignList'];
        this.adminMain = params['adminMain'];
        this.adminProfile = params['adminProfile'];
      })
  }
  
  
  isAvailable(menuLink: string) {
    if (this.menus[this.moduleName]) {
      return this.menus[this.moduleName].indexOf(menuLink) > -1
    }
    else {
      return false;
    }
  }
}
