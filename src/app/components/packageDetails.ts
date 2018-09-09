import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Package } from '../models/package';
import { Service } from '../models/service';
import { PackageService } from '../models/packageService';
import { EditorModule } from 'primeng/editor';
import { ServiceDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, BillingService } from '../services';

@Component({
  selector: 'app-package-details',
  templateUrl: '../pages/packageDetails.html',
  providers: [GenericService, BillingService, ServiceDropdown]
})
export class PackageDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  pckage: Package = new Package();
  serviceCols: any[];
  
  serviceDropdown: ServiceDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  constructor
    (
      private genericService: GenericService,
      private billingService: BillingService,
      private srvDropdown: ServiceDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.serviceDropdown = srvDropdown;
    
  }

  ngOnInit(): void {

     this.serviceCols = [
            { field: 'service', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'rate', header: 'Rate' }
        ];
     
    let packageId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.addRow();
          
          packageId = params['packageId'];
          
          if (packageId != null) {
              this.genericService.getOne(packageId, 'Package')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.pckage = result
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
    this.pckage = null;
  }
  
  addRow() {
    let ps =  new PackageService();
    ps.service = new Service();
    this.pckage.packageServices.push(ps);
  }
  
  
  save() {
    
    try {
      this.error = '';
      this.billingService.savePackage(this.pckage)
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.pckage = result
            console.info(this.pckage);
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
 }
