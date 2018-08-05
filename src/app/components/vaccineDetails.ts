import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Reference } from '../models/reference';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { Visit } from '../models/visit';
import { GenericService, GlobalEventsManager, VisitService } from '../services';
 
@Component({
  selector: 'app-vaccine-details',
  template: `IMMUNIZATIONS
            <div class="ui-grid-row" *ngFor="let vaccineGroup of vaccineGroups">
              <div class="ui-grid-col-1 ui-sm-12" >
                {{vaccineGroup.name}}:
              </div>
              <div class="ui-grid-col-11 ui-sm-12" >
                <p-checkbox id="status" 
                  [(ngModel)]="vaccines" [value]="vaccine.id"
                  label="{{vaccine.name}}"
                  *ngFor="let vaccine of vaccineGroup.childs; let i = index"></p-checkbox>
              </div>
            </div>`,
  providers: [GenericService, VisitService]
})
export class VaccineDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  @Input() vaccines: Reference[] = [];
  vaccineGroups: Reference[] = [];
 
  constructor
    (
      private genericService: GenericService,
      private visitService: VisitService,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
  }

  ngOnInit(): void {
    
    this.visitService.getActiveElements('vaccine')
      .subscribe((data: Reference[]) => 
      { 
        console.info(data)
        if (data.length > 0) {
          this.vaccineGroups = data;
        }
      },
      error => console.log(error),
      () => console.log('Get ative vaccines complete'));

  }
  
  ngOnDestroy() {
    this.vaccineGroups = null;
  }
 }
