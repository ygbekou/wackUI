import { Component, OnInit, OnDestroy, SimpleChanges, Input, ChangeDetectorRef } from '@angular/core';
import { GenericService, GlobalEventsManager } from '../services';
import { Testimony } from '../models/website';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: '../pages/testimonials.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class Testimonials implements OnInit, OnDestroy {

  @Input()
  data: Testimony [] = [];
  @Input()
  testimonials: Testimony [] = [];

  @Input()
  testimonial0: Testimony;

  constructor (
      private genericService: GenericService,
      public globalEventsManager: GlobalEventsManager,
      public translate: TranslateService,
      private cdr: ChangeDetectorRef
    ) {

      this.loadData();

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.loadData();
    });

  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  loadData(): void {
    //this.getTestimonials();
  }


  getTestimonials() {
    const parameters: string [] = [];
    parameters.push('e.language = |language|' + this.translate.currentLang + '|String');
    parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.website.Testimony', parameters)
        .subscribe((data: Testimony[]) => {
        if (data.length > 0) {
          this.testimonials = data;
        }
      },
      error => console.log(error),
      () => console.log('Get Testimonials complete'));
  }

  ngOnDestroy() {
  }

 }
