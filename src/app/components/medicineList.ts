import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Product } from '../models/product';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService } from '../services';

@Component({
  selector: 'app-medicine-list',
  templateUrl: '../pages/medicineList.html',
  providers: [GenericService]
})
export class MedicineList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  medicines: Product[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  @Output() medicineIdEvent = new EventEmitter<string>();
  
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
            { field: 'categoryName', header: 'Category' },
            { field: 'manufacturerName', header: 'Manufacturer' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'price', header: 'Price' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Medicine', parameters)
              .subscribe((data: Product[]) => 
              { 
                this.medicines = data 
                console.info(this.medicines)
              },
              error => console.log(error),
              () => console.log('Get all Medicine complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.medicines = null;
  }
  
  edit(medicineId: number) {
      this.medicineIdEvent.emit(medicineId + '');
  }

  delete(medicineId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "medicineId": medicineId,
        }
      }
      this.router.navigate(["/admin/medicineDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
