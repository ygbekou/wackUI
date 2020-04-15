import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Employee, Reference } from 'src/app/models';


@Injectable()
export class PaymentTypeDropdown {

  filteredPaymentTypes: Reference[];
  paymentTypes: Reference[] = [];

  constructor(
    private genericService: GenericService) {
    this.getAllPaymentTypes();
  }

  filter(event) {
    this.filteredPaymentTypes = DropdownUtil.filter(event, this.paymentTypes);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredPaymentTypes = this.paymentTypes;
    }, 10);
  }

  private getAllPaymentTypes(): void {
    const parameters: string [] = [];
    this.genericService.getAllByCriteria('com.wack.model.stock.PaymentType', parameters)
    .subscribe((data: Reference[]) => {
        this.paymentTypes = data;
    },
    error => console.log(error),
    () => console.log('Get all PaymentType complete'));
  }
}
