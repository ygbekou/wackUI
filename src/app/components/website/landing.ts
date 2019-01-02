import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../../services';
import { SectionItem, Section } from '../../models/website';
import { Employee, Hospital } from '../../models';
import { DepartmentDropdown, DoctorDropdown } from './../dropdowns';

@Component({
  selector: 'app-landing',
  templateUrl: '../../pages/website/landing.html',
  providers: [GenericService, DepartmentDropdown, DoctorDropdown]
})
export class Landing implements OnInit, OnDestroy {
  
    aboutUsSection: Section = new Section();
    serviceSection: Section = new Section();
    aboutUsItems: SectionItem[] = [];
    serviceItems: SectionItem[] = [];
    hospital: Hospital = new Hospital();

    constructor
    (
      private genericService: GenericService,
      private globalEventsManager: GlobalEventsManager,
      public  doctorDropdown: DoctorDropdown,
      public  departmentDropdown: DepartmentDropdown,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.globalEventsManager.showMenu = false;
      

      let parameters: string [] = []; 
      parameters.push('e.section.name = |name|about_us|String')
                
      this.genericService.getAllByCriteria('com.qkcare.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => 
      { 
        this.aboutUsItems = data 
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));
      

      parameters = [];
      parameters.push('e.section.name = |name|service|String');
      this.genericService.getAllByCriteria('com.qkcare.model.website.SectionItem', parameters)
          .subscribe((data: SectionItem[]) => 
      { 
        this.serviceItems = data 
      },
      error => console.log(error),
      () => console.log('Get all SectionItem complete'));
    
      parameters = [];
      this.genericService.getAllByCriteria('Hospital', parameters)
          .subscribe((data: Hospital[]) => 
       { 
         if (data.length > 0) {
           this.hospital = data[0]
         } else {
           this.hospital = new Hospital();
         }
       },
       error => console.log(error),
       () => console.log('Get Hospital complete'));
      
      
      parameters = [];
      parameters.push('e.name = |name|about_us|String');
      this.genericService.getAllByCriteria('com.qkcare.model.website.Section', parameters)
          .subscribe((data: Section[]) => 
       { 
         if (data.length > 0) {
           this.aboutUsSection = data[0]
         } else {
           this.aboutUsSection = new Section();
         }
       },
       error => console.log(error),
       () => console.log('Get AboutUS Section complete'));
      
      
      parameters = [];
      parameters.push('e.name = |name|service|String');
      this.genericService.getAllByCriteria('com.qkcare.model.website.Section', parameters)
          .subscribe((data: Section[]) => 
       { 
         if (data.length > 0) {
           this.serviceSection = data[0]
         } else {
           this.serviceSection = new Section();
         }
       },
       error => console.log(error),
       () => console.log('Get SERVICE Section complete'));
      
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy() {
  }

 }
