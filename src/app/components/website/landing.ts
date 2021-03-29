import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GenericService, GlobalEventsManager } from '../../services';
import { SectionItem, Section, SliderText, Testimony, CompanyHistory } from '../../models/website';
import { Company } from '../../models';
import { Employee } from '../../models/employee';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Testimonials } from '../testimonials';

@Component({
  selector: 'app-landing',
  templateUrl: '../../pages/website/landing.html',
  styleUrls: ['./landing.css'],
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class Landing implements OnInit, OnDestroy {

    aboutUsSection: Section = new Section();
    serviceSection: Section = new Section();
    industrySection: Section = new Section();
    sliderTexts: SliderText[] = [];
    sectionMap: Map<string, SectionItem[]> = new Map();
    managers: Employee [] = [];
    company: Company = new Company();
    testimonials: Testimony [] = [];
    companyHistories: CompanyHistory [] = [];

    changeCarrousel = true;
    showTestimonials = false;

    constructor
    (
      public genericService: GenericService,
      public globalEventsManager: GlobalEventsManager,
      public translate: TranslateService
    ) {

      this.loadData();

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.loadData();
    });


  }

  ngOnInit(): void {
  }

  loadData(): void {

      this.sectionMap = new Map();
      this.sliderTexts[0] = new SliderText();
      this.sliderTexts[1] = new SliderText();
      this.sliderTexts[2] = new SliderText();
      this.sliderTexts[3] = new SliderText();

      let parameters: string [] = [];
      parameters.push('e.language = |language|' + this.translate.currentLang + '|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SliderText', parameters)
          .subscribe((data: SliderText[]) => {
              let i = 0;

              for (const item of data) {
                 this.sliderTexts[i] = item;
                 i = i + 1;
              }
      },
      error => console.log(error),
      () => console.log('Get all SliderText complete'));

      parameters = [];
      parameters.push('e.status = |status|0|Integer');
      parameters.push('e.section.language = |language|' + this.translate.currentLang + '|String');
      this.genericService.getAllByCriteria('com.wack.model.website.SectionItem', parameters, ' ORDER BY e.section.rank, e.rank DESC ')
          .subscribe((data: SectionItem[]) => {
              console.info(data);
              for (const item of data) {
                if (!this.sectionMap.has(item.section.title)) {
                    this.sectionMap.set(item.section.title, new Array());
                }
                this.sectionMap.get(item.section.title).push(item);
              }

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


      this.getTestimonials();
      this.getCompanyHistories();

  }

  changeClass(newId) {
    for (const companyHistory of this.companyHistories) {
      if (Number(newId) === companyHistory.year) {
        document.getElementById(newId).className = 'tab-pane tab-pane-navigation custom-tab-pane-navigation-1 active';
      } else {
        document.getElementById(companyHistory.year + '').className = 'tab-pane tab-pane-navigation';
      }
    }
  }

  getTestimonials() {
    const parameters: string [] = [];
    parameters.push('e.language = |language|' + this.translate.currentLang + '|String');
    parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.website.Testimony', parameters)
        .subscribe((data: Testimony[]) => {
          this.testimonials = data;
      },
      error => console.log(error),
      () => console.log('Get Testimonials complete'));
  }

  getCompanyHistories() {
    const parameters: string [] = [];
    parameters.push('e.language = |language|' + this.translate.currentLang + '|String');
    parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.website.CompanyHistory', parameters, ' ORDER BY e.year DESC ')
        .subscribe((data: CompanyHistory[]) => {
          this.companyHistories = data;
      },
      error => console.log(error),
      () => console.log('Get CompanyHistory complete'));
  }

  ngOnDestroy() {
        this.aboutUsSection = null;
        this.serviceSection = null;
        this.industrySection = null;
        this.sliderTexts = null;
        this.sectionMap = null;
        this.managers = null;
  }

 }
