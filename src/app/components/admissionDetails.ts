import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Bed } from '../models/bed';
import { BedAssignment } from '../models/bedAssignment';
import { Country } from '../models/country';
import { DoctorAssignment } from '../models/doctorAssignment';
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
import { AdmissionDiagnoses } from './admissionDiagnoses';
import { PrescriptionDetails } from './prescriptionDetails';
import { PrescriptionList } from './prescriptionList';
 
@Component({
  selector: 'app-admission-details',
  templateUrl: '../pages/admissionDetails.html',
  providers: [GenericService, AdmissionService, DoctorDropdown, PackageDropdown, 
    InsuranceDropdown, BuildingDropdown, FloorDropdown, RoomDropdown, CategoryDropdown, BedDropdown]
})
export class AdmissionDetails implements OnInit, OnDestroy {
  
  @ViewChild(AdmissionDiagnoses) admissionDiagnoses: AdmissionDiagnoses;
  @ViewChild(PrescriptionDetails) prescriptionDetails: PrescriptionDetails;
  @ViewChild(PrescriptionList) prescriptionList: PrescriptionList;
  
  public error: String = '';
  displayDialog: boolean;
  admission: Admission = new Admission();
  medicineCols: any[];
  diagnosisCols: any[];
  patient: Patient = new Patient();
  
  doctorDropdown: DoctorDropdown;
  packageDropdown: PackageDropdown;
  insuranceDropdown: InsuranceDropdown;
  buildingDropdown: BuildingDropdown;
  floorDropdown: FloorDropdown;
  roomDropdown: RoomDropdown;
  categoryDropdown: CategoryDropdown;
  bedDropdown: BedDropdown
  
  activeTab: number = 0;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  DEPARTMENT: string = Constants.DEPARTMENT;
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  constructor
    (
      private genericService: GenericService,
      private admissionService: AdmissionService,
      private globalEventsManager: GlobalEventsManager,
      private dcDropdown: DoctorDropdown,
      private pkgeDropdown: PackageDropdown,
      private insceDropdown: InsuranceDropdown,
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
    this.packageDropdown = pkgeDropdown;
    this.insuranceDropdown = insceDropdown;
    this.buildingDropdown = bdgDropdown;
    this.floorDropdown = flrDropdown;
    this.roomDropdown = rmDropdown;
    this.categoryDropdown = catDropdown;
    this.bedDropdown = bdDropdown;
    
    // Initialize data
    this.initilizePatientAdmissionPatient();
    this.initilizePatientAdmissionBed();
    this.initilizePatientAdmissionDoctor();
    
    // Initialize the selectedParentCategoryId 
    this.categoryDropdown.getAllCategories(100);
  }

  initilizePatientAdmissionPatient() {
    this.patient.user = new User();
    this.patient.maritalStatus = new Reference();
    this.patient.occupation = new Reference();
    this.patient.nationality = new Country();
  }
  
  initilizePatientAdmissionBed() {
    this.admission.bedAssignment = new BedAssignment();
    this.admission.bedAssignment.bed = new Bed();
    this.admission.bedAssignment.bed.room = new Room();
    this.admission.bedAssignment.bed.room.floor = new Floor();
    this.admission.bedAssignment.bed.category = new Reference();
  }
  
  initilizePatientAdmissionDoctor() {
    this.admission.doctorAssignment = new DoctorAssignment();
    
  }
  
  ngOnInit(): void {
    
    let admissionId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.admission.patient = new Patient();
          this.admission.patient.user = new User();
          this.admission.pckage = new Package();
          
          admissionId = params['admissionId'];
          if (admissionId != null) {
              this.admissionService.getAdmission(+admissionId)
              .subscribe((data: Admission) => 
              { 
                if (data.id > 0) {
                  this.admission = data;
                  this.patient = this.admission.patient;
                  this.globalEventsManager.selectedAdmissionId = this.admission.id;
                  if (this.admission.bedAssignment == null) {
                    this.initilizePatientAdmissionBed();
                  }
                  if (this.admission.doctorAssignment == null) {
                    this.initilizePatientAdmissionDoctor();
                  } else {
                    this.admission.doctorAssignment.startDate = new Date(this.admission.doctorAssignment.startDate)
                  }
                } 
              },
              error => console.log(error),
              () => console.log('Get Patient Admission complete'));
          } else {
              
          }
     });
    
  }
  
  ngOnDestroy() {
    this.admission = null;
  }

  save() {
    
    try {
      this.error = '';
      this.admission.patient = this.patient;
      this.admissionService.saveAdmission(this.admission)
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.admission = result
            console.info(this.admission);
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
  
  lookUpPatient() {
    let parameters: string [] = []; 
            
    parameters.push('e.matricule = |matricule|' + this.patient.medicalRecordNumber + '|String')
    let patientMatricule = this.patient.medicalRecordNumber;
    this.patient = new Patient()
    this.patient.medicalRecordNumber = patientMatricule;
    
    this.genericService.getAllByCriteria('Patient', parameters)
      .subscribe((data: Patient[]) => 
      { 
        if (data.length > 0) {
          console.info(this.patient)
          this.patient = data[0];
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }
  
  populateFloorDropdown(event) {
    this.floorDropdown.buildingId = this.admission.bedAssignment.bed.room.floor.building.id;
    this.floorDropdown.getAllFloors();
  }
  
  populateRoomDropdown(event) {
    this.roomDropdown.floorId = this.admission.bedAssignment.bed.room.floor.id;
    this.roomDropdown.getAllRooms();
  }
  
  populateBedDropdown(event) {
    this.bedDropdown.roomId = this.admission.bedAssignment.bed.room.id;
    this.bedDropdown.categoryId = this.admission.bedAssignment.bed.category.id;
    this.bedDropdown.getAllBeds();
  }
  
  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 1) {
      this.admissionDiagnoses.getDiagnoses();
    } 
    else if (evt.index == 2) {
    } 
  }
  
  onPrescriptionSelected($event) {
    let prescriptionId = $event;
    this.prescriptionDetails.getPrescription(prescriptionId);
  }
  
 }
