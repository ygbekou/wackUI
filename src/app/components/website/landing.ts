import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService, GlobalEventsManager } from '../../services';
import { SectionItem, Section } from '../../models/website';
import { Company } from '../../models';
import { Employee } from '../../models/employee';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

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
      public translate: TranslateService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.globalEventsManager.showMenu = false;

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.ngOnInit();
    });


  }

  ngOnInit(): void {
      let parameters: string [] = [];
      parameters.push('e.section.name = |name|about_us|String');
      parameters.push('e.section.language = |language|' + this.translate.currentLang + '|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => {
        this.aboutUsItems = data;
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));


      parameters = [];
      parameters.push('e.section.name = |name|SERVICES|String');
      parameters.push('e.section.language = |language|' + this.translate.currentLang + '|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => {
        this.serviceItems = data;
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));

      parameters = [];
      parameters.push('e.section.name = |name|INDUSTRIES|String');
      parameters.push('e.section.language = |language|' + this.translate.currentLang + '|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => {
        this.industryItems = data;
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));

      parameters = [];
      parameters.push('e.language = |language|' + this.translate.currentLang + '|String');
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
      parameters.push('e.name = |name|SERVICES|String');
      parameters.push('e.language = |language|' + this.translate.currentLang + '|String');
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
      parameters.push('e.language = |language|' + this.translate.currentLang + '|String');
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

  ngOnDestroy() {
  }

 }
