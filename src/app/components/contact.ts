import {Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GenericService} from '../services';
import {Constants} from '../app.constants';
import {User} from '../models/user';
import {GlobalEventsManager} from '../services/globalEventsManager';
import {Message } from 'primeng/primeng';
import { SectionItem } from '../models/website';
import { Employee } from '../models/employee';
import { Company } from '../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-contact-form',
  templateUrl: '../pages/contact.html',
  providers: [Constants, GenericService]
})

// tslint:disable-next-line:component-class-suffix
export class Contact implements OnInit {

    company: Company = new Company;

  constructor(
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
    private genericService: GenericService,
    private route: ActivatedRoute) {
        this.globalEventsManager.showMenu = false;
  }

  ngOnInit() {
    const parameters = [];
    this.genericService.getAllByCriteria('Company', parameters)
         .subscribe((data: Company[]) => {

            this.company = data[0];
    },
    error => console.log(error),
    () => console.log('Get Company complete'));
  }

  setDefaults() {

  }
}
