import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Patient } from '../models/patient';
import { UserGroup } from '../models/userGroup';
import { FileUploader } from './fileUploader';
import { EditorModule } from 'primeng/editor';
import { CountryDropdown, ReligionDropdown, OccupationDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, UserService } from '../services';

@Component({
  selector: 'app-patient-details',
  templateUrl: '../pages/patientDetails.html',
  providers: [GenericService, CountryDropdown, ReligionDropdown, OccupationDropdown]
})
export class PatientDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  patient: Patient = new Patient();
  countryDropdown:  CountryDropdown;
  religionDropdown:  ReligionDropdown;
  occupationDropdown:  OccupationDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  @ViewChild('uploadFile') input: ElementRef;
  formData = new FormData();
  
  constructor
    (
      private genericService: GenericService,
      private userService: UserService,
      private cntryDropdown: CountryDropdown,
      private rlgDropdown: ReligionDropdown,
      private occDropdown: OccupationDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.countryDropdown = cntryDropdown;
      this.religionDropdown = rlgDropdown;
      this.occupationDropdown = occDropdown;
  }

  ngOnInit(): void {

    let patientId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.patient.user = new User();
          this.patient.user.userGroup = new UserGroup();
          patientId = params['patientId'];
          
          if (patientId != null) {
              this.genericService.getOne(patientId, 'Patient')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.patient = result
                }
                else {
                  this.error = Constants.saveFailed;
                  this.displayDialog = true;
                }
              })
          } else {
              
              if (params['groupId'] != null) {
                this.patient.user.userGroup.id = params['groupId'];
              }
          }
        });
    
  }
  
  ngOnDestroy() {
    this.patient = null;
  }

  save() {
    
    this.formData = new FormData();
    let inputEl = this.input.nativeElement;
    if (inputEl.files.length == 0) return;
    
    let files :FileList = inputEl.files;
    for(var i = 0; i < files.length; i++){
        this.formData.append('file', files[i], files[i].name);
    }
    
    try {
      this.error = '';
      this.userService.savePatient(this.patient, this.formData)
        .subscribe(result => {
          if (result.id > 0) {
            this.patient = result
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

 }
