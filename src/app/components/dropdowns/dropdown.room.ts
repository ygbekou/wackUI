import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Room } from '../../models/room';
 
@Injectable()
export class RoomDropdown {
  
  filteredRooms : Room[];
  rooms : Room[] = [];
  floorId: number; 
  
  constructor(
    private genericService: GenericService) {
  }
  
  filter(event) {
    this.filteredRooms = DropdownUtil.filter(event, this.rooms);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredRooms = this.rooms;
    }, 10)
  }
  
  public getAllRooms(): void {
    let parameters: string [] = []; 
            
    parameters.push('e.floor.id = |floorId|' + this.floorId + '|Long')
    
    this.genericService.getAllByCriteria('Room', parameters)
      .subscribe((data: any[]) => {
        this.rooms = data
        
      },
        
      error => console.log(error),
      () => console.log('Get All Rooms Complete'));
  }
  
}