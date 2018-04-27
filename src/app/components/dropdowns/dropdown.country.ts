import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Country } from '../../models/country';
 
@Injectable()
export class CountryDropdown {
  
  filteredCountries : Country[];
  countries : Country[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllCountries();
  }
  
  filter(event) {
    this.filteredCountries = DropdownUtil.filter(event, this.countries);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredCountries = this.countries;
    }, 10)
  }
  
  private getAllCountries(): void {
    this.genericService.getAll('Country')
      .subscribe((data: any[]) => {
        this.countries = data
      },
        
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }
  
}