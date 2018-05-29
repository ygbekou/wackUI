import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Account } from '../../models/account';
 
@Injectable()
export class AccountDropdown {
  
  filteredAccounts : Account[];
  accounts : Account[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllAccounts();
  }
  
  filter(event) {
    this.filteredAccounts = DropdownUtil.filter(event, this.accounts);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredAccounts = this.accounts;
    }, 10)
  }
  
  private getAllAccounts(): void {
    this.genericService.getAll('Account')
      .subscribe((data: any[]) => {
        this.accounts = data
      },
        
      error => console.log(error),
      () => console.log('Get All Accounts Complete'));
  }
  
}