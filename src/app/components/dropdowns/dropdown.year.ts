import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from 'src/app/models';


@Injectable()
export class YearDropdown {

  filteredYears: number[];
  years: number[] = [];

  parameters: string [] = [];

  constructor(
    private genericService: GenericService) {
  }

  filter(event) {
    this.filteredYears = DropdownUtil.filter(event, this.years);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredYears = this.years;
    }, 10);
  }

}
