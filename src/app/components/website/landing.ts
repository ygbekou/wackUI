import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../../services';

@Component({
  selector: 'app-landing',
  templateUrl: '../../pages/website/landing.html',
  providers: [GenericService]
})
export class Landing implements OnInit, OnDestroy {
  
    aboutUsItems: SectionItem[] = [];
    serviceItems: SectionItem[] = [];

    constructor
    (
      private genericService: GenericService,
      private globalEventsManager: GlobalEventsManager,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.globalEventsManager.showMenu = false;
      
      this.route
          .queryParams
          .subscribe(params => {

          let parameters: string [] = []; 
          parameters.push('e.section.name = |name|about_us|String')
                    
          this.genericService.getAllByCriteria('com.qkcare.model.website.SectionItem', parameters)
              .subscribe((data: SectionItem[]) => 
          { 
            this.aboutUsItems = data 
          },
          error => console.log(error),
          () => console.log('Get all SectionItem complete'));
       });
      
      
      this.route
          .queryParams
          .subscribe(params => {
    
          let parameters: string [] = []; 
          parameters.push('e.section.name = |name|service|String')
                    
          this.genericService.getAllByCriteria('com.qkcare.model.website.SectionItem', parameters)
              .subscribe((data: SectionItem[]) => 
          { 
            this.serviceItems = data 
          },
          error => console.log(error),
          () => console.log('Get all SectionItem complete'));
       });
      
      
  }

  ngOnInit(): void {
    
  }
  
  ngOnDestroy() {
  }

 }
