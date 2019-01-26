import {Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GenericService} from '../services';
import {Constants} from '../app.constants';
import {User} from '../models/user';
import {GlobalEventsManager} from '../services/globalEventsManager';
import {Message } from 'primeng/primeng';
import { SectionItem } from '../models/website';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-industries-form',
  templateUrl: '../pages/industries.html',
  providers: [Constants, GenericService]
})

// tslint:disable-next-line:component-class-suffix
export class Industries implements OnInit {

    industryItems: SectionItem [] = [];

  constructor(
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
    private genericService: GenericService,
    private route: ActivatedRoute) {
        this.globalEventsManager.showMenu = false;

  }

  ngOnInit() {
    const parameters = [];
    parameters.push('e.section.name = |name|INDUSTRIES|String');
    this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
         .subscribe((data: SectionItem[]) => {
        this.industryItems = data;
        // tslint:disable-next-line:no-console
        console.info(this.industryItems);
    },
    error => console.log(error),
    () => console.log('Get all SectionItem complete'));
  }

  setDefaults() {

  }
}
