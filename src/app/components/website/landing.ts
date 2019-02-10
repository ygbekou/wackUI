import { Component, OnInit, OnDestroy } from '@angular/core';
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
    sliderItems: SectionItem[] = [];
    serviceItems: SectionItem[] = [];
    industryItems: SectionItem [] = [];
    managers: Employee [] = [];
    company: Company = new Company();

    changeCarrousel = true;

    constructor
    (
      private genericService: GenericService,
      public globalEventsManager: GlobalEventsManager,
      public translate: TranslateService
    ) {
      this.sliderItems[0] = new SectionItem();
      this.sliderItems[1] = new SectionItem();
      this.sliderItems[2] = new SectionItem();
      this.sliderItems[3] = new SectionItem();

      this.loadData();

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.loadData();
    });


  }

  ngOnInit(): void {
  }

  loadData(): void {
      this.serviceItems = [];
      this.industryItems = [];

      let parameters: string [] = [];
      parameters.push('e.section.name IN |names|SLIDERS,SERVICES,INDUSTRIES|List<String>');
      parameters.push('e.status = |status|0|Integer');
      parameters.push('e.section.language = |language|' + this.translate.currentLang + '|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => {
              if (this.changeCarrousel) {
                  this.sliderItems = [];
              }
              for (const item of data) {
                if (this.changeCarrousel && item.section.name === 'SLIDERS') {
                    this.sliderItems.push(item);
                } else if (item.section.name === 'SERVICES') {
                    this.serviceItems.push(item);
                    this.serviceSection = item.section;
                } else if (item.section.name === 'INDUSTRIES') {
                    this.industryItems.push(item);
                    this.industrySection = item.section;
                }
              }

              this.changeCarrousel = false;

      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));

      parameters = [];
    parameters.push('e.status = |status|0|Integer');
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
      parameters.push('e.managing = |managing|0|Integer');
      parameters.push('e.status = |status|0|Integer');
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
        this.aboutUsSection = null;
        this.serviceSection = null;
        this.industrySection = null;
        this.sliderItems = null;
        this.serviceItems = null;
        this.industryItems = null;
        this.managers = null;
  }

 }
