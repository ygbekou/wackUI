import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { SearchCriteria, User } from '../../models';
import { PurchaseOrder, PurchaseOrderProduct } from '../../models/stocks/purchaseOrder';
import { EmployeeDropdown, SupplierDropdown, ProductDropdown } from '../dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, PurchasingService } from '../../services';

@Component({
  selector: 'app-purchaseOrder-list',
  templateUrl: '../../pages/stocks/purchaseOrderList.html',
  providers: [GenericService, PurchasingService, EmployeeDropdown, SupplierDropdown, ProductDropdown]
})
export class PurchaseOrderList implements OnInit, OnDestroy {
  
  purchaseOrders: PurchaseOrder[] = [];
  cols: any[];
  
  searchCriteria: SearchCriteria = new SearchCriteria();
  
  constructor
    (
    private genericService: GenericService,
    private purchasingService: PurchasingService,
    private supplierDropdown: SupplierDropdown,
    private productDropdown: ProductDropdown,
    private employeeDropdown: EmployeeDropdown,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'purchaseOrderDate', header: 'Date', type:'date' },
            { field: 'supplierName', header: 'Supplier' },
            { field: 'requestorName', header: 'Requestor' },
            { field: 'receiverName', header: 'Receiver' },
            { field: 'subTotal', header: 'Sub Total' },
            { field: 'taxes', header: 'Taxes' },
            { field: 'discount', header: 'Discount' },
            { field: 'grandTotal', header: 'Grand Total' },
            { field: 'due', header: 'Due' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('com.qkcare.model.stocks.PurchaseOrder', parameters)
              .subscribe((data: PurchaseOrder[]) => 
              { 
                this.purchaseOrders = data 
              },
              error => console.log(error),
              () => console.log('Get all PurchaseOrders complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.purchaseOrders = null;
  }
  
  edit(purchaseOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "purchaseOrderId": purchaseOrderId,
        }
      }
      this.router.navigate(["/admin/purchaseOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(purchaseOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "purchaseOrderId": purchaseOrderId,
        }
      }
      this.router.navigate(["/admin/purchaseOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  search() {
   
    let parameters: string [] = []; 
        
    if (this.searchCriteria.requestor && this.searchCriteria.requestor.id > 0)  {
      parameters.push('e.requestor.id = |requestorId|' + this.searchCriteria.requestor.id + '|Long');
    }
    if (this.searchCriteria.shipTo && this.searchCriteria.shipTo.id > 0)  {
      parameters.push('e.shipTo.id = |shipToId|' + this.searchCriteria.shipTo.id + '|Long');
    } 
    if (this.searchCriteria.supplier && this.searchCriteria.supplier.id > 0)  {
      parameters.push('e.supplier.id = |supplierId|' + this.searchCriteria.supplier.id + '|Long');
    }  
    if (this.searchCriteria.purchaseOrderDate != null)  {
      parameters.push('e.purchaseOrderDate = |purchaseOrderDate|' + this.searchCriteria.purchaseOrderDate.toLocaleDateString() + '|Date')
    }  
    
    this.genericService.getAllByCriteria('PurchaseOrder', parameters)
      .subscribe((data: PurchaseOrder[]) => 
      { 
        this.purchaseOrders = data 
      },
      error => console.log(error),
      () => console.log('Get all Purchase Orders complete'));
    }
  
 }
