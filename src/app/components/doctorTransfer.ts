import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Bed } from '../models/bed';
import { BedAssignment } from '../models/bedAssignment';
import { Country } from '../models/country';
import { DoctorAssignment } from '../models/doctorAssignment';
import { Employee } from '../models/employee';
import { Floor } from '../models/floor';
import { Package } from '../models/package'; 
import { Patient } from '../models/patient';
import { Admission } from '../models/admission';
import { Reference } from '../models/reference';
import { Room } from '../models/room';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, PackageDropdown, InsuranceDropdown, BuildingDropdown, FloorDropdown, RoomDropdown, 
      CategoryDropdown, BedDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, AppointmentService, GlobalEventsManager, AdmissionService } from '../services';
 
@Component({
  selector: 'app-doctor-transfer',
  templateUrl: '../pages/doctorTransfer.html',
  providers: [GenericService, AdmissionService, DoctorDropdown, PackageDropdown, 
    InsuranceDropdown, BuildingDropdown, FloorDropdown, RoomDropdown, CategoryDropdown, BedDropdown]
})
export class DoctorTransfer implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  admission: Admission = new Admission();

  doctorDropdown: DoctorDropdown;
  buildingDropdown: BuildingDropdown;
  floorDropdown: FloorDropdown;
  roomDropdown: RoomDropdown;
  categoryDropdown: CategoryDropdown;
  bedDropdown: BedDropdown
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  DEPARTMENT: string = Constants.DEPARTMENT;
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  transferType: string;
  
  constructor
    (
      private genericService: GenericService,
      private admissionService: AdmissionService,
      private globalEventsManager: GlobalEventsManager,
      private dcDropdown: DoctorDropdown,
      private bdgDropdown: BuildingDropdown,
      private flrDropdown: FloorDropdown,
      private rmDropdown: RoomDropdown,
      private catDropdown: CategoryDropdown,
      private bdDropdown: BedDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.doctorDropdown = dcDropdown;
    this.buildingDropdown = bdgDropdown;
    this.floorDropdown = flrDropdown;
    this.roomDropdown = rmDropdown;
    this.categoryDropdown = catDropdown;
    this.bedDropdown = bdDropdown;
    this.initilizePatientAdmission();
    this.initTansferBedData();
    this.categoryDropdown.getAllCategories(100);
  }

  initilizePatientAdmission() {
    this.admission.patient = new Patient();
    this.admission.patient.user = new User();
    
    this.admission.bedAssignment = new BedAssignment();
    this.admission.bedAssignment.bed = new Bed();
    this.admission.bedAssignment.bed.room = new Room();
    this.admission.bedAssignment.bed.room.floor = new Floor();
    this.admission.bedAssignment.bed.room.floor.building = new Reference();
    this.admission.bedAssignment.bed.category = new Reference();
    
    this.admission.doctorAssignment = new DoctorAssignment();
    this.admission.doctorAssignment.doctor = new Employee()
   
  }
  
  initTansferBedData() {
    this.admission.bedAssignment.transferBed = new Bed();
    this.admission.bedAssignment.transferBed.room = new Room();
    this.admission.bedAssignment.transferBed.room.floor = new Floor();
    this.admission.bedAssignment.transferBed.room.floor.building = new Reference();
    this.admission.bedAssignment.transferBed.category = new Reference();
  }
  
  ngOnInit(): void {
    
    this.route
        .queryParams
        .subscribe(params => {
          this.transferType = params['transferType'];
        });
  }
  
  ngOnDestroy() {
    this.admission = null;
  }

  transfer() {
    if (this.transferType == 'DOCTOR') {
      this.transferDoctor();
    } 
    else if (this.transferType == 'BED') {
      this.transferBed(); 
    }
  }
  
  
  transferDoctor() {
    
    try {
      this.error = '';
      if (this.validateDoctorTransfer()) {
        this.admissionService.transferDoctor(this.admission.doctorAssignment)
          .subscribe(result => {
            alert(result.id)
            if (result.id > 0) {
              this.admission.doctorAssignment = result
            }
            else {
              this.error = Constants.saveFailed;
              this.displayDialog = true;
            }
          })
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  
  transferBed() {
    
    try {
      this.error = '';
      if (this.validateBedTransfer()) {
        this.admissionService.transferBed(this.admission.bedAssignment)
          .subscribe(result => {
            alert(result.id)
            if (result.id > 0) {
              this.admission.bedAssignment = result
            }
            else {
              this.error = Constants.saveFailed;
              this.displayDialog = true;
            }
          })
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  
  validateDoctorTransfer() {
    if (this.admission.doctorAssignment.transferDoctor != null
          && this.admission.doctorAssignment.doctor.id 
              == this.admission.doctorAssignment.transferDoctor.id)
    {
      alert("The transfer doctor should be different than the current doctor.");
      return false;
    }
    if (this.admission.doctorAssignment.transferDate != null 
          && this.admission.doctorAssignment.transferDate 
              < this.admission.doctorAssignment.startDate) {
      alert("The Transfer Date should be greater than the current assignment Date.")
      return false;
    }
    
    return true;
      
  }
  
  validateBedTransfer() {
    if (this.admission.bedAssignment.transferBed != null
          && this.admission.bedAssignment.bed.id 
              == this.admission.bedAssignment.transferBed.id)
    {
      alert("The transfer bed should be different than the current doctor.");
      return false;
    }
    if (this.admission.bedAssignment.transferDate != null 
          && this.admission.bedAssignment.transferDate 
              < this.admission.bedAssignment.startDate) {
      alert("The Transfer Date should be greater than the current assignment Date.")
      return false;
    }
    
    return true;
      
  }
  
  lookUpPatientAdmission() {
    let parameters: string [] = []; 
            
    parameters.push('e.id = |patientAdmissionId|' + this.admission.admissionNumber + '|Long')
    let admissionNumber = this.admission.admissionNumber;
    this.admission = new Admission()
    this.initilizePatientAdmission();
    this.initTansferBedData();
    this.admission.admissionNumber = admissionNumber;
    
    this.admissionService.getAdmission(+this.admission.admissionNumber)
      .subscribe((data: Admission) => 
      { 
        if (data.id > 0) {
          this.admission = data;
          this.admission.doctorAssignment.startDate = new Date(this.admission.doctorAssignment.startDate)
          this.initTansferBedData();
        } 
      },
      error => console.log(error),
      () => console.log('Get Patient Admission complete'));
  }
  
  populateFloorDropdown(event) {
    this.floorDropdown.buildingId = this.admission.bedAssignment.transferBed.room.floor.building.id;
    this.floorDropdown.getAllFloors();
  }
  
  populateRoomDropdown(event) {
    this.roomDropdown.floorId = this.admission.bedAssignment.transferBed.room.floor.id;
    this.roomDropdown.getAllRooms();
  }
  
  populateBedDropdown(event) {
    this.bedDropdown.roomId = this.admission.bedAssignment.transferBed.room.id;
    this.bedDropdown.categoryId = this.admission.bedAssignment.transferBed.category.id;
    this.bedDropdown.getAllBeds();
  }
  
 }
