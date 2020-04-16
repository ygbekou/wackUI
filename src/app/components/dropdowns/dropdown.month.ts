import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from 'src/app/models';


@Injectable()
export class MonthDropdown {

  filteredMonths: Reference[];
  months: Reference[] = [];

  parameters: string [] = [];

  constructor(
    private genericService: GenericService) {
      this.getAllMonths();
  }

  filter(event) {
    this.filteredMonths = DropdownUtil.filter(event, this.months);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredMonths = this.months;
    }, 10);
  }

  private getAllMonths(): void {
    const parameters: string [] = [];
    this.genericService.getAllByCriteria('com.wack.model.stock.Month', parameters)
    .subscribe((data: Reference[]) => {
        this.months = data;
    },
    error => console.log(error),
    () => console.log('Get all Month complete'));
  }

}
