import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Reference } from '../models/reference';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Bed } from '../models/bed';
import { Floor } from '../models/floor';
import { Room } from '../models/room';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-bed-list',
  templateUrl: '../pages/bedList.html',
  providers: [GenericService]
})
export class BedList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  beds: Bed[] = [];
  cols: any[];
  
  hiddenMenu: boolean = true;
  @Output() bedIdEvent = new EventEmitter<string>();
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL; 
  
  constructor
    (
    private genericService: GenericService,
    private globalEventsManager: GlobalEventsManager,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'bedNumber', header: 'Number' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {
          
          let parameters: string [] = []; 
            
          this.genericService.getAll('Bed')
            .subscribe((data: Bed[]) => 
            { 
              this.beds = data 
            },
            error => console.log(error),
            () => console.log('Get all Beds complete'));
     });
    
    
  }
 
  
  ngOnDestroy() {
    this.beds = null;
  }
  
  edit(bedId : number) {
    try {
      if (this.hiddenMenu) {
        this.bedIdEvent.emit(bedId + '');
      } else {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "bedId": bedId
          }
        }
        this.router.navigate(["/admin/bedDetails"], navigationExtras);
      }
    }
    catch (e) {
      console.log(e);
    }
    
  }

  delete(bedId: number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "bedId": bedId,
        }
      }
      this.router.navigate(["/admin/bedDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
