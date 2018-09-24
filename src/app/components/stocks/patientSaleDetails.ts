import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Constants} from '../../app.constants';
import {Admission} from '../../models/admission';
import {Visit} from '../../models/visit';
import {Patient} from '../../models/patient';
import { Product } from '../../models/product';
import {PatientSale, PatientSaleProduct} from '../../models/stocks/patientSale';
import {EditorModule} from 'primeng/editor';
import {DoctorDropdown, ProductDropdown} from './../dropdowns';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule} from 'primeng/primeng';
import {User} from '../../models/user';
import {GenericService, PurchasingService, GlobalEventsManager} from '../../services';

@Component({
  selector: 'app-patientSale-details',
  templateUrl: '../../pages/stocks/patientSaleDetails.html',
  providers: [GenericService, PurchasingService, GlobalEventsManager, ProductDropdown]
})
export class PatientSaleDetails implements OnInit, OnDestroy {

  public error: String = '';
  displayDialog: boolean;
  patientSale: PatientSale = new PatientSale();
  saleProductCols: any[];

  @Input() admission: Admission;
  @Input() visit: Visit;

  patient: Patient = new Patient();
  itemNumber: string;
  itemNumberLabel: string = 'Visit';

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
            { field: 'quantity', header: 'Quantity', type: 'amount'},
            { field: 'unitPrice', header: 'Price', type: 'amount'},
            { field: 'discountPercentage', header: 'Discount %'},
            { field: 'discountAmount', header: 'Discount Amt', type: 'amount'},
            { field: 'totalAmount', header: 'Total', type: 'amount'}
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
                  this.patientSale = result
                  if (this.patientSale.patientSaleProducts.length == 0) 
                    this.addRow();
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
    this.patientSale = null;
  }

  save() {

    try {
      this.error = '';
      this.patientSale.visit = this.visit;

      this.purchasingService.savePatientSale(this.patientSale)
        .subscribe(result => {
          if (result.id > 0) {
            this.patientSale = result
            console.info(this.patientSale);
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

  lookUpVisit() {
    let parameters: string[] = [];

    if (this.itemNumberLabel == 'Visit') 
      parameters.push('e.visitNumber = |visitNumber|' + this.itemNumber + '|String')
    if (this.itemNumberLabel == 'Admission') 
      parameters.push('e.id = |admissionId|' + this.itemNumber + '|Long')
  
      this.genericService.getAllByCriteria(this.itemNumberLabel, parameters)
        .subscribe((data: any[]) => {
          if (data) {
            if (this.itemNumberLabel == 'Visit')  {
              this.visit = data[0];
              this.patient = this.visit.patient;
              this.patientSale.visit = this.visit;
            } 
            if (this.itemNumberLabel == 'Admission') {
              this.admission = data[0];
              this.patient = this.admission.patient;
              this.patientSale.admission = this.admission;
            }
          }
        },
        error => console.log(error),
        () => console.log('Get Item complete'));
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
}
