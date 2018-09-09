import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Admission } from '../models/admission';
import { Appointment } from '../models/appointment';
import { DoctorOrder } from '../models/doctorOrder';
import { VitalSign } from '../models/vitalSign';
import { Patient } from '../models/patient';
import { EditorModule } from 'primeng/editor';
import { DoctorOrderTypeDropdown, DoctorOrderPriorityDropdown, DoctorOrderKindDropdown, DoctorDropdown, ServiceDropdown, LabTestDropdown} from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule, PickListModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { Visit } from '../models/visit';
import { Service } from '../models/service';
import { GenericService, VisitService } from '../services';

@Component({ 
  selector: 'app-doctorOrder-details',
  templateUrl: '../pages/doctorOrderDetails.html', 
  providers: [GenericService, DoctorDropdown, DoctorOrderTypeDropdown, 
    DoctorOrderPriorityDropdown, DoctorOrderKindDropdown, LabTestDropdown]
})
export class DoctorOrderDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  doctorOrder: DoctorOrder = new DoctorOrder();
 
  doctorOrderTypeDropdown: DoctorOrderTypeDropdown;
  doctorOrderPriorityDropdown: DoctorOrderPriorityDropdown;
  doctorOrderKindDropdown: DoctorOrderKindDropdown;
  doctorDropdown: DoctorDropdown;
  labTestDropdown: LabTestDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  user: User;
  @Input() admission: Admission;
  @Input() visit: Visit;
  
  constructor
    (
      private genericService: GenericService,
      private visitService: VisitService,
      private dotDropdown: DoctorOrderTypeDropdown,
      private dopDropdown: DoctorOrderPriorityDropdown,
      private dokDropdown: DoctorOrderKindDropdown,
      private docDropdown: DoctorDropdown,
      private lbtDropdown: LabTestDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.doctorOrderTypeDropdown = dotDropdown;
    this.doctorOrderPriorityDropdown = dopDropdown;
    this.doctorOrderKindDropdown = dokDropdown;
    this.doctorDropdown = docDropdown;
    this.labTestDropdown = lbtDropdown;
    this.user = new User();
  }

  ngOnInit(): void {
    
    this.user = JSON.parse(Cookie.get('user'));
    
    let doctorOrderId = null;
    this.route
        .queryParams
        .subscribe(params => {          
                 
          doctorOrderId = params['doctorOrderId'];
          
          if (doctorOrderId != null) {
              this.genericService.getOne(doctorOrderId, "DoctorOrder")
                  .subscribe(result => {
                if (result.id > 0) {
                  
                  this.doctorOrder = result
                  this.doctorOrder.doctorOrderDatetime = new Date(this.doctorOrder.doctorOrderDatetime);
                  if (this.doctorOrder.receivedDatetime != null)
                    this.doctorOrder.receivedDatetime = new Date(this.doctorOrder.receivedDatetime);
                }
                else {
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                  this.displayDialog = true;
                }
              })
          } else {
              
          }
     });
    
  }
  
  ngOnDestroy() {
    this.doctorOrder = null;
  }
  
  save() {
    
    this.doctorOrder.visit = this.visit;
    
    try {
      this.error = '';
      
      if (this.user.userGroup.id != 1 && 
        (this.doctorOrder.doctor == null || this.doctorOrder.doctorOrderPriority == null 
            || this.doctorOrder.receivedDatetime == null)) {
        alert('The Ordering Doctor and the Priority and Received Date is required.')
        return;
      }
      
      this.visitService.saveDoctorOrder(this.doctorOrder)
        .subscribe(result => {
          if (result.id > 0) {
            this.doctorOrder = result;
          }
          else {
            this.error = Constants.SAVE_UNSUCCESSFUL;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  
  getDoctorOrder(doctorOrderId: number) {
    this.genericService.getOne(doctorOrderId, 'DoctorOrder')
        .subscribe(result => {
      if (result.id > 0) {
        this.doctorOrder = result
        this.doctorOrder.doctorOrderDatetime = new Date(this.doctorOrder.doctorOrderDatetime);
        this.doctorOrder.receivedDatetime = new Date(this.doctorOrder.receivedDatetime);
      }
      else {
        this.error = Constants.SAVE_UNSUCCESSFUL;
        this.displayDialog = true;
      }
    })
  }
  
  
//  populateServiceDropdown(event) {
//    this.serviceDropdown.getServices(this.doctorOrder.service.serviceType.id);
//  }
  
  toggleTypeDropdown(event) {
    
  }
 }
