import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Supplier } from '../models/supplier';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService } from '../services';

@Component({
  selector: 'app-supplier-list',
  templateUrl: '../pages/supplierList.html',
  providers: [GenericService]
})
export class SupplierList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  suppliers: Supplier[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  @Output() supplierIdEvent = new EventEmitter<string>();
  
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
            { field: 'contactName', header: 'Contact' },
            { field: 'address', header: 'Address' },
            { field: 'city', header: 'City' },
            { field: 'country', header: 'Country' },
            { field: 'email', header: 'Email' },
            { field: 'homePhone', header: 'Home Phone' },
            { field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'fax', header: 'Fax' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Supplier', parameters)
              .subscribe((data: Supplier[]) => 
              { 
                this.suppliers = data 
                console.info(this.suppliers)
              },
              error => console.log(error),
              () => console.log('Get all Supplier complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.suppliers = null;
  }
  
  edit(supplierId: number) {
      this.supplierIdEvent.emit(supplierId + '');
  }

  delete(supplierId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "supplierId": supplierId,
        }
      }
      this.router.navigate(["/admin/supplierDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }
  
  getAllSuppliers() {
    this.genericService.getAll('com.qkcare.model.stocks.Supplier')
      .subscribe((data: Supplier[]) => 
      { 
        this.suppliers = data 
        console.info(this.suppliers)
      },
      error => console.log(error),
      () => console.log('Get all Suppliers complete'));
  }

 }
