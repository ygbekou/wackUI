import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Constants} from '../../app.constants';
import {Admission, Patient, User} from '../../models';
import {BirthReport} from '../../models/activities';
import {EditorModule} from 'primeng/editor';
import {DoctorDropdown} from './../dropdowns';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/growl';
import {Message} from 'primeng/api';
import {GenericService, GlobalEventsManager} from '../../services';

@Component({
  selector: 'app-birthReport-details',
  templateUrl: '../../pages/activities/birthReportDetails.html',
  providers: [GenericService, GlobalEventsManager]
})
export class BirthReportDetails implements OnInit, OnDestroy {

  birthReport: BirthReport = new BirthReport();
  messages: Message[] = [];

  @Input() admission: Admission;

  patient: Patient = new Patient();
  itemNumber: string;
  itemNumberLabel: string = 'Admission';

  constructor
    (
    private globalEventsManager: GlobalEventsManager,
    private genericService: GenericService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {

    let birthReportId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          this.itemNumberLabel = params['itemNumberLabel'] ? params['itemNumberLabel'] : this.itemNumberLabel;
          birthReportId = params['birthReportId'];
          
          if (birthReportId != null) {
              this.genericService.getOne(birthReportId, Constants.BIRTH_REPORT_CLASS)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.birthReport = result
                  this.birthReport.birthDatetime = new Date(this.birthReport.birthDatetime);
                  this.admission = this.birthReport.admission;
                  this.patient = this.admission.patient;
                }
                else {
                  
                 
                }
              })
          } else {
              
          }
     });

  }

  ngOnDestroy() {
    this.birthReport = null;
  }

  save() {
    if (this.birthReport.firstName == '' || this.birthReport.lastName == '' 
      || this.birthReport.motherFirstName == '' || this.birthReport.motherLastName == '') {
      this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:Constants.MISSING_REQUIRED_FIELD});
      return;
    }
    
    try {
      this.birthReport.admission = this.admission;
      this.genericService.save(this.birthReport, Constants.BIRTH_REPORT_CLASS)
        .subscribe(result => {
          if (result.id > 0) {
            this.birthReport = result
            this.messages.push({severity:Constants.SUCCESS, summary:Constants.SAVE_LABEL, detail:Constants.SAVE_SUCCESSFUL});
          }
          else {
            this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:Constants.SAVE_UNSUCCESSFUL});
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  
  clear() {
      this.birthReport = new BirthReport();
      this.admission = new Admission();
  }

  lookUpVisitAdm(event) {
    this.admission = event;
    
  }
  
  delete() {
    
  }
}
