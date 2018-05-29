import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Package } from '../models/package';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-invoice-list',
  templateUrl: '../pages/packageList.html',
  providers: [GenericService]
})
export class PackageList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  packages: Package[] = [];
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
            { field: 'name', header: 'Package Name' },
            { field: 'description', header: 'Description' },
            { field: 'discount', header: 'Discount' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Package', parameters)
              .subscribe((data: Package[]) => 
              { 
                this.packages = data 
              },
              error => console.log(error),
              () => console.log('Get all Packages complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.packages = null;
  }
  
  edit(packageId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "packageId": packageId,
        }
      }
      this.router.navigate(["/admin/packageDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(packageId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "packageId": packageId,
        }
      }
      this.router.navigate(["/admin/packageDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
