import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Reference } from '../models/reference';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Floor } from '../models/floor';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-floor-list',
  templateUrl: '../pages/floorList.html',
  providers: [GenericService]
})
export class FloorList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  floors: Floor[] = [];
  cols: any[];
  
  hiddenMenu: boolean = true;
  @Output() floorIdEvent = new EventEmitter<string>();
  
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
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {
          
          let parameters: string [] = []; 
            
          this.genericService.getAll('Floor')
            .subscribe((data: Floor[]) => 
            { 
              this.floors = data 
            },
            error => console.log(error),
            () => console.log('Get all Floors complete'));
     });
    
    
  }
 
  
  ngOnDestroy() {
    this.floors = null;
  }
  
  edit(floorId : number) {
    try {
      if (this.hiddenMenu) {
        this.floorIdEvent.emit(floorId + '');
      } else {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "floorId": floorId
          }
        }
        this.router.navigate(["/admin/floorDetails"], navigationExtras);
      }
    }
    catch (e) {
      console.log(e);
    }
    
  }

  delete(floorId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "floorId": floorId,
        }
      }
      this.router.navigate(["/admin/floorDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
