import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User, Schedule, Employee, HospitalLocation } from '../models';  
import { GenericService } from '../services';

@Component({
  selector: 'app-hospitalLocation-list',
  templateUrl: '../pages/hospitalLocationList.html',
  providers: [GenericService]
})
export class HospitalLocationList implements OnInit, OnDestroy {
  
  hospitalLocations: HospitalLocation[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  @Output() hospitalLocationIdEvent = new EventEmitter<string>();
  
  constructor
    (
    private genericService: GenericService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'address', header: 'Address' },
            { field: 'city', header: 'City' },
            { field: 'countryName', header: 'Country' },
            { field: 'status', header: 'Status' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('HospitalLocation', parameters)
              .subscribe((data: HospitalLocation[]) => 
              { 
                this.hospitalLocations = data 
                console.info(this.hospitalLocations)
              },
              error => console.log(error),
              () => console.log('Get all hospitalLocations complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.hospitalLocations = null;
  }
  
  edit(labTestId: number) {
      this.hospitalLocationIdEvent.emit(labTestId + '');
  }

  delete(hospitalLocationId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "hospitalLocationId": hospitalLocationId,
        }
      }
      this.router.navigate(["/admin/hospitalLocationDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  getAllHospitalLocations() {
    this.genericService.getAll('HospitalLocation')
      .subscribe((data: HospitalLocation[]) => 
      { 
        this.hospitalLocations = data 
        console.info(this.hospitalLocations)
      },
      error => console.log(error),
      () => console.log('Get all HL complete'));
  }
  
 }
