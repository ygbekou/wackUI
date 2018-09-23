import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Product } from '../models/product';
import { Reference } from '../models/reference';
import { Supplier } from '../models/supplier';
import { FileUploader } from './fileUploader';
import { EditorModule } from 'primeng/editor';
import { CountryDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-supplier-details',
  templateUrl: '../pages/supplierDetails.html',
  providers: [GenericService, CountryDropdown]
})
export class SupplierDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  supplier: Supplier = new Supplier();
  countryDropdown:  CountryDropdown;
  
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
      private globalEventsManager: GlobalEventsManager,
      private cntryDropdown: CountryDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.countryDropdown = cntryDropdown;
  }

  ngOnInit(): void {

    let supplierId = null;
    this.route
        .queryParams
        .subscribe(params => {         
          
          supplierId = params['supplierId'];
          
          if (supplierId != null) {
              this.genericService.getOne(supplierId, 'com.qkcare.model.stocks.Supplier')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.supplier = result
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
    this.supplier = null;
  }

  getSupplier(supplierId: number) {
    this.genericService.getOne(supplierId, 'com.qkcare.model.stocks.Supplier')
        .subscribe(result => {
      if (result.id > 0) {
        this.supplier = result
      }
      else {
        this.error = Constants.SAVE_UNSUCCESSFUL;
        this.displayDialog = true;
      }
    })
  }
  
  save() {
    try {
      this.error = '';
      this.genericService.save(this.supplier, "com.qkcare.model.stocks.Supplier")
        .subscribe(result => {
          if (result.id > 0) {
            this.supplier = result
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
