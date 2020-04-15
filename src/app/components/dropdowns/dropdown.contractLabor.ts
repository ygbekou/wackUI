import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { ContractLabor } from 'src/app/models';


@Injectable()
export class ContractLaborDropdown {

  filteredContractLabors: ContractLabor[];
  contractLabors: ContractLabor[] = [];

  constructor(
    private genericService: GenericService) {
    this.getAllContractLabors();
  }

  filter(event) {
    this.filteredContractLabors = DropdownUtil.filter(event, this.contractLabors);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredContractLabors = this.contractLabors;
    }, 10);
  }

  private getAllContractLabors(): void {
    const parameters: string [] = [];
    parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.stock.ContractLabor', parameters)
    .subscribe((data: ContractLabor[]) => {
        this.contractLabors = data;
    },
    error => console.log(error),
    () => console.log('Get all ContractLabor complete'));
  }
}
