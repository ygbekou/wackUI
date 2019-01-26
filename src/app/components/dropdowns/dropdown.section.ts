import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Section } from '../../models/website';

@Injectable()
export class SectionDropdown {

  filteredSections: Section[];
  sections: Section[] = [];

  constructor(
    private genericService: GenericService) {
    this.getAllSections();
  }

  filter(event) {
    this.filteredSections = DropdownUtil.filter(event, this.sections);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredSections = this.sections;
    }, 10);
  }

  private getAllSections(): void {
    const parameters: string [] = [];
    parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.website.Section', parameters)
    .subscribe((data: Section[]) => {
        this.sections = data;
    },
    error => console.log(error),
    () => console.log('Get all Section complete'));
  }
}
