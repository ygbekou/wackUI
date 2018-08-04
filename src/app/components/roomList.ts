import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Reference } from '../models/reference';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Floor } from '../models/floor';
import { Room } from '../models/room';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-room-list',
  templateUrl: '../pages/roomList.html',
  providers: [GenericService]
})
export class RoomList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  rooms: Room[] = [];
  cols: any[];
  
  hiddenMenu: boolean = true;
  @Output() roomIdEvent = new EventEmitter<string>();
  
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
            
          this.genericService.getAll('Room')
            .subscribe((data: Room[]) => 
            { 
              this.rooms = data 
            },
            error => console.log(error),
            () => console.log('Get all Rooms complete'));
     });
    
    
  }
 
  
  ngOnDestroy() {
    this.rooms = null;
  }
  
  edit(roomId : number) {
    try {
      if (this.hiddenMenu) {
        this.roomIdEvent.emit(roomId + '');
      } else {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "roomId": roomId
          }
        }
        this.router.navigate(["/admin/roomDetails"], navigationExtras);
      }
    }
    catch (e) {
      console.log(e);
    }
    
  }

  delete(roomId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "roomId": roomId,
        }
      }
      this.router.navigate(["/admin/roomDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
