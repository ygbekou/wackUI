import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { UserGroup } from '../../models/userGroup';

@Injectable()
export class UserGroupDropdown {

  filteredUserGroups: UserGroup[];
  userGroups: UserGroup[] = [];

  constructor(
    private genericService: GenericService) {
    this.getAllUserGroups();
  }

  filter(event) {
    this.filteredUserGroups = DropdownUtil.filter(event, this.userGroups);
  }

  handleDropdownClick(event) {
    // this.filteredDepartments = [];
    setTimeout(() => {
      this.filteredUserGroups = this.userGroups;
    }, 10);
  }

  private getAllUserGroups(): void {
    this.genericService.getAll('UserGroup')
      .subscribe((data: any[]) => this.userGroups = data,
      error => console.log(error),
      () => console.log('Get All UserGroups Complete'));
  }

}
