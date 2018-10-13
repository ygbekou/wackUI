import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Constants} from '../../app.constants';
import {Admission, Visit, Patient, Product, User} from '../../models';
import {PatientSale, PatientSaleProduct} from '../../models/stocks/patientSale';
import {EditorModule} from 'primeng/editor';
import {DoctorDropdown, ProductDropdown} from './../dropdowns';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule} from 'primeng/primeng';
import {GenericService, PurchasingService, GlobalEventsManager} from '../../services';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-patientSale-details',
  templateUrl: '../../pages/stocks/patientSaleDetails.html',
  providers: [GenericService, PurchasingService, GlobalEventsManager, ProductDropdown]
})
export class PatientSaleDetails implements OnInit, OnDestroy {

  patientSale: PatientSale = new PatientSale();
  saleProductCols: any[];

  messages: Message[] = [];
  @Input() admission: Admission;
  @Input() visit: Visit;

  patient: Patient = new Patient();
  itemNumber: string;
  itemNumberLabel: string = 'Visit';
  
  isVisitOrAdmPage: boolean = false;

  constructor
    (
    private globalEventsManager: GlobalEventsManager,
    private genericService: GenericService,
    private purchasingService: PurchasingService,
    private productDropdown: ProductDropdown,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {

     this.saleProductCols = [
            { field: 'product', header: 'Name' },
            { field: 'productDescription', header: 'Description' },
            { field: 'quantity', header: 'Quantity', type: 'amount', inputType: 'number'},
            { field: 'unitPrice', header: 'Price', type: 'amount', inputType: 'text'},
            { field: 'discountPercentage', header: 'Discount %'},
            { field: 'discountAmount', header: 'Discount Amt', type: 'amount', inputType: 'text'},
            { field: 'totalAmount', header: 'Total', type: 'amount', inputType: 'text'}
        ]; 
    

    let patientSaleId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          this.itemNumberLabel = params['itemNumberLabel'];
          patientSaleId = params['patientSaleId'];
          
          if (patientSaleId != null) {
              this.purchasingService.getPatientSale(patientSaleId)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.patientSale = result;
                  this.visit = this.patientSale.visit;
                  if (this.patientSale.patientSaleProducts.length == 0) 
                    this.addRow();
                }
              })
          } else {
              
          }
     });

  }

  ngOnDestroy() {
    this.patientSale = null;
  }

  clear() {
    this.patientSale = new PatientSale();
  }
  
  validate() {
    let noProductFound: boolean = true;
    
    for (let i in this.patientSale.patientSaleProducts) {
      let pp = this.patientSale.patientSaleProducts[i];
      if (pp.product && pp.product.id > 0) {
        noProductFound = false;
        if (pp.quantity == null)
          this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'Quantity is required.'});
        if (pp.unitPrice == null)
          this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'Price is required.'});
        
      }
    }
    
    if (noProductFound) {
      this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'At least 1 medication is required.'});
    }
    
    return this.messages.length == 0;
  }
  
  save() {

    try {
      this.messages = [];
       if (!this.validate()) {
        return;
      }
    
      this.patientSale.visit = this.visit;

      this.purchasingService.savePatientSale(this.patientSale)
        .subscribe(result => {
          if (result.id > 0) {
            this.patientSale = result
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
  
  getPatientSale(patientSaleId: number) {
    this.messages = [];
    this.purchasingService.getPatientSale(patientSaleId)
        .subscribe(result => {
      if (result.id > 0) {
        this.patientSale = result
        this.patientSale.saleDatetime = new Date(this.patientSale.saleDatetime);
      }
    })
  }
  
  addRow() {
    let psp =  new PatientSaleProduct();
    psp.product = new Product();
    this.patientSale.patientSaleProducts.push(psp);
  }
  
  calculateGrandTotal() {
    this.patientSale.grandTotal = +this.getNumber(this.patientSale.subTotal) + +this.getNumber(this.patientSale.taxes)
                    - +this.getNumber(this.patientSale.discount);
  }
  
  
  calculateTotal() {
    this.patientSale.subTotal = 0;
    for (let i in this.patientSale.patientSaleProducts) {
       this.patientSale.subTotal += this.calculateRowTotal(this.patientSale.patientSaleProducts[i]);
    }
  }
  
  calculateRowTotal(rowData) {
    rowData.totalAmount = (+this.getNumber(rowData.quantity) * +this.getNumber(rowData.unitPrice));
    return rowData.totalAmount;
    
  }
  
  private getNumber(value: number): number {
    return value != undefined ? value : 0;
  } 
  

  populateDefaultProductValues(rowData: PatientSaleProduct) {
    rowData.unitPrice = rowData.product.price;
  }
  
  lookUpVisitAdm(event) {
    this.visit = event;
    
  }
  
  isVisitOrAdmissionPage() {
    return this.isVisitOrAdmPage;
  }
}
