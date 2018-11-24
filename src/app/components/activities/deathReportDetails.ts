import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Constants} from '../../app.constants';
import {Admission} from '../../models/admission';
import {Patient} from '../../models/patient';
import {DeathReport} from '../../models/activities';
import {EditorModule} from 'primeng/editor';
import {DoctorDropdown} from './../dropdowns';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/growl';
import {Message} from 'primeng/api';
import {User} from '../../models/user';
import {GenericService, GlobalEventsManager} from '../../services';

@Component({
  selector: 'app-deathReport-details',
  templateUrl: '../../pages/activities/deathReportDetails.html',
  providers: [GenericService, GlobalEventsManager]
})
export class DeathReportDetails implements OnInit, OnDestroy {

  deathReport: DeathReport = new DeathReport();
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

    let deathReportId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          this.itemNumberLabel = params['itemNumberLabel'] ? params['itemNumberLabel'] : this.itemNumberLabel;
          deathReportId = params['deathReportId'];
          
          if (deathReportId != null) {
              this.genericService.getOne(deathReportId, Constants.DEATH_REPORT_CLASS)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.deathReport = result
                  this.deathReport.deathDatetime = new Date(this.deathReport.deathDatetime);
                  this.admission = this.deathReport.admission;
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
    this.deathReport = null;
  }

  save() {
    this.messages = [];
    if (this.deathReport.deathDatetime == null) {
      this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:Constants.MISSING_REQUIRED_FIELD});
      return;
    }
    
    try {
      this.deathReport.admission = this.admission;
      this.genericService.save(this.deathReport, Constants.DEATH_REPORT_CLASS)
        .subscribe(result => {
          if (result.id > 0) {
            this.deathReport = result
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
      this.messages = [];
      this.deathReport = new DeathReport();
      this.admission = new Admission();
  }

  lookUpVisitAdm(event) {
    this.admission = event;
    
  }

  delete() {
    
  }
}
