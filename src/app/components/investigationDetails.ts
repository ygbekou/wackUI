import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Constants} from '../app.constants';
import {Admission} from '../models/admission';
import {Visit} from '../models/visit';
import {Patient} from '../models/patient';
import {Prescription} from '../models/prescription';
import {Diagnosis} from '../models/diagnosis';
import {Investigation} from '../models/investigation';
import {LabTest} from '../models/labTest';
import {EditorModule} from 'primeng/editor';
import {DoctorDropdown, ProductDropdown, LabTestDropdown} from './dropdowns';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule} from 'primeng/primeng';
import {User} from '../models/user';
import {GenericService, InvestigationService, GlobalEventsManager} from '../services';

@Component({
  selector: 'app-investigation-details',
  templateUrl: '../pages/investigationDetails.html',
  providers: [GenericService, InvestigationService, LabTestDropdown]
})
export class InvestigationDetails implements OnInit, OnDestroy {

  public error: String = '';
  displayDialog: boolean;
  investigation: Investigation = new Investigation();
  labTestCols: any[];
  labTests: LabTest[] = [];
  labTestDropdown: LabTestDropdown;

  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;
  DEPARTMENT: string = Constants.DEPARTMENT;
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  SELECT_OPTION: string = Constants.SELECT_OPTION;

  @Input() admission: Admission;
  @Input() visit: Visit;

  patient: Patient = new Patient();
  itemNumber: string;
  itemNumberLabel: string = 'Visit';

  constructor
    (
    private globalEventsManager: GlobalEventsManager,
    private genericService: GenericService,
    private investigationService: InvestigationService,
    private lbTestDropdown: LabTestDropdown,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.labTestDropdown = lbTestDropdown;

  }

  ngOnInit(): void {

    let investigationId = null;
    this.route
      .queryParams
      .subscribe(params => {

        investigationId = params['investigationId'];

        if (investigationId != null) {
          this.genericService.getOne(investigationId, 'Investigation')
            .subscribe(result => {
              if (result.id > 0) {
                this.investigation = result
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
    this.investigation = null;
  }

  save() {

    try {
      this.error = '';
      this.investigation.visit = this.visit;

      this.investigationService.saveInvestigaton(this.investigation)
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.investigation = result
            console.info(this.investigation);
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


  //  getPrescription(prescriptionId: number) {
  //    this.admissionService.getPrescription(prescriptionId)
  //        .subscribe(result => {
  //      if (result.id > 0) {
  //        this.prescription = result
  //        this.prescription.prescriptionDatetime = new Date(this.prescription.prescriptionDatetime);
  //      }
  //      else {
  //        this.error = Constants.saveFailed;
  //        this.displayDialog = true;
  //    }
  //    })
  //  }
  
  lookUpVisit() {
    let parameters: string[] = [];

    parameters.push('e.visitNumber = |visitNumber|' + this.itemNumber + '|String')

    this.genericService.getAllByCriteria('Visit', parameters)
      .subscribe((data: any[]) => {
        if (data) {
          this.visit = data[0];
          this.patient = this.visit.patient;
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }


  populateLabTests(event) {
    let parameters: string[] = [];

    parameters.push('e.parent.id = |parentId|' + this.investigation.labTest.id + '|Long')

    this.genericService.getAllByCriteria('LabTest', parameters)
      .subscribe((data: any[]) => {
        this.labTests = data;
      },
      error => console.log(error),
      () => console.log('Get LabTest List complete'));
  }
}
