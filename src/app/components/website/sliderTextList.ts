import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SliderText } from '../../models/website';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sliderText-list',
  templateUrl: '../../pages/website/sliderTextList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class SliderTextList implements OnInit, OnDestroy {

  sliderTexts: SliderText[] = [];
  cols: any[];

  @Output() sliderTextIdEvent = new EventEmitter<string>();

  constructor
    (
    private genericService: GenericService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'language', header: 'Language', headerKey: 'COMMON.LANGUAGE' },
            { field: 'sliderName', header: 'Slider', headerKey: 'COMMON.SLIDER' },
            { field: 'text1', header: 'Text1', headerKey: 'COMMON.TEXT1' },
            { field: 'text2', header: 'Text2', headerKey: 'COMMON.TEXT2' },
            { field: 'text3', header: 'Text3', headerKey: 'COMMON.TEXT3' }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.website.SliderText', parameters)
            .subscribe((data: SliderText[]) => {
              this.sliderTexts = data ;
            },
            error => console.log(error),
            () => console.log('Get all SliderText complete'));
     });


    this.updateCols();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateCols();
    });
  }


  updateCols() {
    // tslint:disable-next-line:forin
    for (const index in this.cols) {
      const col = this.cols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }
  }


  ngOnDestroy() {
    this.sliderTexts = null;
  }

  edit(sliderTextId: number) {
      this.sliderTextIdEvent.emit(sliderTextId + '');
  }

  delete(sliderTextId: number) {
    try {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'sliderTextId': sliderTextId,
        }
      };
      // tslint:disable-next-line:quotemark
      this.router.navigate(["/admin/slierTextDetails"], navigationExtras);
    } catch (e) {
      console.log(e);
    }
  }

 }
