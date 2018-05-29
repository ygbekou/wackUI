import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Service } from '../models/service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-service-list',
  templateUrl: '../pages/serviceList.html',
  providers: [GenericService]
})
export class ServiceList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  services: Service[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
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
            { field: 'description', header: 'Description' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'rate', header: 'Rate' },
            { field: 'statusDesc', header: 'Status' }
        ];
    
    this.genericService.getAll('Service')
      .subscribe((data: Service[]) => 
      { 
        this.services = data 
      },
      error => console.log(error),
      () => console.log('Get all Services complete'));
  }
 
  
  ngOnDestroy() {
    this.services = null;
  }
  
  edit(serviceId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "serviceId": serviceId,
        }
      }
      this.router.navigate(["/admin/serviceDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(serviceId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "serviceId": serviceId,
        }
      }
      this.router.navigate(["/admin/serviceDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
