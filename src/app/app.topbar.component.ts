import { Component } from '@angular/core';
import {NgModule} from '@angular/core';
import { AppComponent} from './app.component';
import { GenericService } from './services';
import { Company } from './models';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    company: Company = new Company();

    constructor(private genericService: GenericService,
        public app: AppComponent) {

        const parameters = [];
        this.genericService.getAllByCriteria('Company', parameters)
          .subscribe((data: Company[]) => {
         if (data.length > 0) {
           this.company = data[0];
         } else {
           this.company = new Company();
         }
       },
       error => console.log(error),
       () => console.log('Get Company complete'));
    }
}
