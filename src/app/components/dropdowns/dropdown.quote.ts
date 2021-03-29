import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Supplier, Quote } from 'src/app/models';


@Injectable()
export class QuoteDropdown {

  filteredQuotes: Quote[];
  quotes: Quote[] = [];
  parameters: string [] = [];
    

  constructor(
    private genericService: GenericService) {
    this.getAllQuotes();
  }

  filter(event) {
    this.filteredQuotes = DropdownUtil.filter(event, this.quotes);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredQuotes = this.quotes;
    }, 10);
  }

  public getAllQuotes(): void {
    this.parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.stock.Quote', this.parameters)
    .subscribe((data: Quote[]) => {
        this.quotes = data;
    },
    error => console.log(error),
    () => console.log('Get all Quote complete'));
  }
}
