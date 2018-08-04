import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Appointment } from '../models/appointment';
import { Admission } from '../models/admission';
import { Bill } from '../models/bill';
import { BillPayment } from '../models/billPayment';
import { BillService } from '../models/billService';
import { Employee } from '../models/employee';
import { Patient } from '../models/patient';
import { Service } from '../models/service';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, ServiceDropdown, AppointmentDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, BillingService } from '../services';

@Component({ 
  selector: 'app-bill-details',
  templateUrl: '../pages/billDetails.html',
  providers: [GenericService, BillingService, ServiceDropdown, AppointmentDropdown, DoctorDropdown]
})
export class BillDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  bill: Bill = new Bill();
  serviceCols: any[];
  billPaymentCols: any[];
  
  serviceDropdown: ServiceDropdown;
  appointmentDropdown: AppointmentDropdown;
  doctorDropdown: DoctorDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  patient: Patient = new Patient();
  
  
  constructor
    (
      private genericService: GenericService,
      private billingService: BillingService,
      private srvDropdown: ServiceDropdown,
      private aptDropdown: AppointmentDropdown,
      private dctDropdown: DoctorDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.serviceDropdown = srvDropdown;
    this.appointmentDropdown = aptDropdown;
    this.doctorDropdown = dctDropdown;
    this.patient.user = new User();
  }

  ngOnInit(): void {

     this.serviceCols = [
            { field: 'service', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'doctor', header: 'Doctor' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'unitAmount', header: 'Price' },
            { field: 'discountAmount', header: 'Discount' },
            { field: 'payerAmount', header: 'Payer Amount' },
            { field: 'patientAmount', header: 'Patient Amount' }
        ]; 
    
      this.billPaymentCols = [
            { field: 'description', header: 'Description' },
            { field: 'amount', header: 'Amount' }
        ];
    
    let billId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.bill.admission = new Admission();
          this.bill.appointment = new Appointment();
          this.addRow();
          this.addPaymentRow();
          
          billId = params['billId'];
          
          if (billId != null) {
              this.billingService.getBill(billId)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.bill = result
                  this.patient = this.bill.appointment.patient;
                  if (this.bill.billServices.length == 0) 
                    this.addRow();
                  if (this.bill.billPayments.length == 0) 
                    this.addPaymentRow();
                }
                else {
                  this.error = Constants.saveFailed;
                  this.displayDialog = true;
                }
              })
          } else {
              
          }
     });
    
  }
  
  ngOnDestroy() {
    this.bill = null;
  }
  
  addRow() {
    let bs =  new BillService();
    bs.service = new Service();
    bs.doctor = new Employee();
    this.bill.billServices.push(bs);
  }
  
  addPaymentRow() {
    let bp =  new BillPayment();
    this.bill.billPayments.push(bp);
  }
  
  calculateGrandTotal() {
    this.bill.grandTotal = +this.getNumber(this.bill.subTotal) + +this.getNumber(this.bill.taxes)
                    - +this.getNumber(this.bill.discount);
  }
  
  calculateDue() {
    this.bill.due = +this.bill.grandTotal - +this.getNumber(this.bill.paid);
  }
  
  calculateTotal() {
    this.bill.subTotal = 0;
    for (let i in this.bill.billServices) {
       this.bill.subTotal += this.calculateRowTotal(this.bill.billServices[i]);
    }
  }
  
  calculateRowTotal(rowData) {
    rowData.totalAmount = (+this.getNumber(rowData.quantity) * +this.getNumber(rowData.unitAmount));
    rowData.patientAmount = rowData.totalAmount - +this.getNumber(rowData.discountAmount) - +this.getNumber(rowData.payerAmount);
    return rowData.totalAmount;
    
  }
  
  private getNumber(value: number): number {
    return value != undefined ? value : 0;
  } 
  
  savePayment(rowData) {
    rowData.data.bill = new Bill()
    rowData.data.bill.id = this.bill.id;
    alert(rowData.amount)
    this.genericService.save(rowData.data, 'BillPayment')
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            rowData.data = result
            console.info(rowData.data);
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
  }
  
  save() {
    
    try {
      this.error = '';
      this.billingService.saveBill(this.bill)
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.bill = result
            console.info(this.bill);
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  
  lookUpPatient() {
    let parameters: string [] = []; 
            
    parameters.push('e.matricule = |matricule|' + this.patient.matricule + '|String')
    let patientMatricule = this.patient.matricule;
    this.patient = new Patient()
    this.patient.matricule = patientMatricule;
    
    this.genericService.getAllByCriteria('Patient', parameters)
      .subscribe((data: Patient[]) => 
      { 
        if (data.length > 0) {
          this.patient = data[0];
          this.appointmentDropdown.patientId = this.patient.id;
          this.appointmentDropdown.getAllAppointments();
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }

 }
