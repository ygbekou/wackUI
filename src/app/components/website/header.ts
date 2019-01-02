import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from '../../services';
import { Hospital } from '../../models';

@Component({
  selector: 'app-web-header',
  template: `
            <div id="header">
                <div class="header-top clearfix">
                    <a href="#" class="logo">
                        <img src="assets/docs/Hospital/{{hospital.logo}}" alt="california-layout"/>
                    </a>
                    <ul class="header-menu">
                        <li><a href="#"><span>Home</span></a></li>
                        <li><a href="#about"><span>About</span></a></li>
                        <li><a href="#service"><span>Service</span></a></li>
                        <li><a href="#appointment"><span>Appointment</span></a></li>
                        <li><a href="#doctor"><span>Doctor</span></a></li>
                        <li><a href="#department"><span>Department</span></a></li>
                        <li><a href="#footer"><span>Contact</span></a></li>
                        <li><a routerLink="/login"><span>Login</span></a></li>
                    </ul>
                </div>

                <div class="header-content clearfix">
                    <div class="header-content-panel">
                        <h1>{{hospital.bannerContentHeader}}</h1>
                        <p>{{hospital.bannerContentParagraph}}</p>
                        <button type="button" class="ui-button landing-button ui-widget
                            ui-state-default ui-corner-all ui-button-text-only" >
                            <span class="ui-button-text ui-c">Learn More</span>
                        </button>
                    </div>
                </div>
            </div>
  `,
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class Header implements OnInit, OnDestroy {

    hospital: Hospital = new Hospital();

    constructor
    (
      private genericService: GenericService,
      private route: ActivatedRoute,
      private router: Router
    ) {

        const parameters = [];
        this.genericService.getAllByCriteria('Hospital', parameters)
          .subscribe((data: Hospital[]) => {
         if (data.length > 0) {
           this.hospital = data[0];
         } else {
           this.hospital = new Hospital();
         }
       },
       error => console.log(error),
       () => console.log('Get Hospital complete'));


  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

 }
