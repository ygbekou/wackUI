import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Patient, SearchCriteria, User } from '../models';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GenericService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-patient-list',
  templateUrl: '../pages/patientList.html',
  providers: [GenericService]
})
export class PatientList implements OnInit, OnDestroy {
  
  patients: Patient[] = [];
  cols: any[];
  searchCriteria: SearchCriteria = new SearchCriteria();
  
  constructor
    (
    private genericService: GenericService,
    private globalEventsManager: GlobalEventsManager,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'lastName', header: 'Last Name', type:'user' },
            { field: 'firstName', header: 'First Name', type:'user' },
            { field: 'birthDate', header: 'Birth Date', type:'date' },
            { field: 'email', header: 'Email Address', type:'user' },
            { field: 'phone', header: 'Phone', type:'user' },
            { field: 'address', header: 'Address', type:'user' },
            { field: 'sex', header: 'Sex', type:'user' }
        ];
    
  }
 
  
  ngOnDestroy() {
    this.patients = null;
  }
  
  edit(patientId: number) {
    
    this.globalEventsManager.changePatientId(patientId);
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientId": patientId,
        }
      }
      this.router.navigate(["/admin/adminPatient"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(patientId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientId": patientId,
        }
      }
      this.router.navigate(["/admin/patientDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }
  
  search() {
   
        let parameters: string [] = []; 
            
        parameters.push('e.status = |status|0|Integer')
        if (this.searchCriteria.lastName != null && this.searchCriteria.lastName.length > 0)  {
          parameters.push('e.user.lastName like |lastName|' + '%' + this.searchCriteria.lastName + '%' + '|String')
        }
        if (this.searchCriteria.firstName != null && this.searchCriteria.firstName.length > 0)  {
          parameters.push('e.user.firstName like |firstName|' + '%' + this.searchCriteria.firstName + '%' + '|String')
        } 
        if (this.searchCriteria.birthDate != null)  {
          parameters.push('e.user.birthDate = |birthDate|' + this.searchCriteria.birthDate.toLocaleDateString() + '|Date')
        }  
        
        
        this.genericService.getAllByCriteria('Patient', parameters)
          .subscribe((data: Patient[]) => 
          { 
            this.patients = data 
          },
          error => console.log(error),
          () => console.log('Get all Patients complete'));
      }

 }
