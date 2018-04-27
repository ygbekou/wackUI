import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Weekday } from '../../models/weekday';
 
@Injectable()
export class WeekdayDropdown {
  
  filteredWeekdays : Weekday[];
  weekdays : Weekday[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllWeekdays();
  }
  
  filter(event) {
    this.filteredWeekdays = DropdownUtil.filter(event, this.weekdays);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredWeekdays = this.weekdays;
    }, 10)
  }
  
  private getAllWeekdays(): void {
    this.genericService.getAll('Weekday')
      .subscribe((data: any[]) => {
        this.weekdays = data
      },
        
      error => console.log(error),
      () => console.log('Get All Weekdays Complete'));
  }
  
}