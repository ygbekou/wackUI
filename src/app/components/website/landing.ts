import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../../services';
import { SectionItem, Section } from '../../models/website';
import { Company } from '../../models';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-landing',
  templateUrl: '../../pages/website/landing.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class Landing implements OnInit, OnDestroy {

    aboutUsSection: Section = new Section();
    serviceSection: Section = new Section();
    industrySection: Section = new Section();
    aboutUsItems: SectionItem[] = [];
    serviceItems: SectionItem[] = [];
    company: Company = new Company();
    industryItems: SectionItem [] = [];
    managers: Employee [] = [];

    constructor
    (
      private genericService: GenericService,
      private globalEventsManager: GlobalEventsManager,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.globalEventsManager.showMenu = false;


      let parameters: string [] = [];
      parameters.push('e.section.name = |name|about_us|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => {
        this.aboutUsItems = data;
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));


      parameters = [];
      parameters.push('e.section.name = |name|SERVICES|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => {
        this.serviceItems = data;
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));

      parameters = [];
      parameters.push('e.section.name = |name|INDUSTRIES|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => {
        this.industryItems = data;
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));

      parameters = [];
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


      parameters = [];
      parameters.push('e.name = |name|about_us|String');
      this.genericService.getAllByCriteria('com.wack.model.website.Section', parameters)
          .subscribe((data: Section[]) => {
         if (data.length > 0) {
           this.aboutUsSection = data[0];
         } else {
           this.aboutUsSection = new Section();
         }
       },
       error => console.log(error),
       () => console.log('Get AboutUS Section complete'));


      parameters = [];
      parameters.push('e.name = |name|SERVICES|String');
      this.genericService.getAllByCriteria('com.wack.model.website.Section', parameters)
          .subscribe((data: Section[]) => {
         if (data.length > 0) {
           this.serviceSection = data[0];
         } else {
           this.serviceSection = new Section();
         }
       },
       error => console.log(error),
       () => console.log('Get SERVICE Section complete'));

      parameters = [];
      parameters.push('e.name = |name|INDUSTRIES|String');
      this.genericService.getAllByCriteria('com.wack.model.website.Section', parameters)
          .subscribe((data: Section[]) => {
         if (data.length > 0) {
           this.industrySection = data[0];
         } else {
           this.industrySection = new Section();
         }
       },
       error => console.log(error),
       () => console.log('Get INDUSTRIES Section complete'));

      parameters = [];
      parameters.push('e.managing = |managing|0|Integer');
      this.genericService.getAllByCriteria('Employee', parameters)
          .subscribe((data: Employee[]) => {
         if (data.length > 0) {
           this.managers = data;
         }
       },
       error => console.log(error),
       () => console.log('Get Managers complete'));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

 }
