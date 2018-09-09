import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reference } from '../models/reference';
import { Constants } from '../app.constants';
import { Bed } from '../models/bed';
import { Floor } from '../models/floor';
import { Room } from '../models/room';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BuildingDropdown, FloorDropdown, RoomDropdown, CategoryDropdown } from './dropdowns';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-bed-details',
  templateUrl: '../pages/bedDetails.html',
  providers: [GenericService, BuildingDropdown, FloorDropdown, RoomDropdown, CategoryDropdown]
  
}) 
export class BedDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  bed: Bed = new Bed();
  
  hiddenMenu: boolean = true;
  
  buildingDropdown: BuildingDropdown;
  floorDropdown: FloorDropdown;
  roomDropdown: RoomDropdown;
  categoryDropdown: CategoryDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
      private genericService: GenericService,
      private globalEventsManager: GlobalEventsManager,
      private bdgDropdown: BuildingDropdown,
      private flrDropdown: FloorDropdown,
      private rmDropdown: RoomDropdown,
      private catDropdown: CategoryDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.buildingDropdown = bdgDropdown;
      this.floorDropdown = flrDropdown;
      this.roomDropdown = rmDropdown;
      this.categoryDropdown = catDropdown;
      this.clear();
  }

  
  ngOnInit(): void {
    this.clear();
    this.categoryDropdown.getAllCategories(Constants.CATEGORY_BED);
    let bedId = null;
    this.route
        .queryParams
        .subscribe(params => {
          bedId = params['bedId'];
          
          if (bedId != null) {
              this.genericService.getOne(bedId, 'Bed')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.bed = result
                }
                else {
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                  this.displayDialog = true;
                }
              })
          }
        });
    
  }
  
  ngOnDestroy() {
    this.bed = null;
  }

  getBed(bedId: number) {
    this.genericService.getOne(bedId, 'Bed')
        .subscribe(result => {
      if (result.id > 0) {
        this.bed = result
      }
      else {
        this.error = Constants.SAVE_UNSUCCESSFUL;
        this.displayDialog = true;
      }
    })
  }
  
  clear() {
    this.bed = new Bed();
    this.bed.room = new Room()
    this.bed.room.floor = new Floor();
  }
  
  save() {
    try {
      this.error = '';
      
      this.genericService.save(this.bed, 'Bed')
        .subscribe(result => {
          if (result.id > 0) {
            this.bed = result
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

  
  populateFloorDropdown(event) {
    this.floorDropdown.buildingId = this.bed.room.floor.building.id;
    this.floorDropdown.getAllFloors();
  }
  
   populateRoomDropdown(event) {
    this.roomDropdown.floorId = this.bed.room.floor.id;
    this.roomDropdown.getAllRooms();
  }
}