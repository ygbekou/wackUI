import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from '../../services';
import { Hospital } from '../../models';

@Component({
  selector: 'app-web-footer',
  template: `
            <div id="footer" class="footer">
                <div class="ui-g">
                    <div class="ui-g-12 ui-lg-4">
                        <a href="#" class="logo">
                            <img src="assets/docs/Hospital/{{hospital.logo}}" alt=""/>
                        </a>
                        <h3 class="appname">{{hospital.name}}</h3>
                        <p><i class="fa fa-address-card"></i> {{hospital.address}}</p>
                        <p><i class="fa fa-phone"></i> {{hospital.phone}}</p>
                        <p><i class="fa fa-envelope"></i> {{hospital.email}}</p>
                    </div>
                    <div class="ui-g-12 ui-lg-2">
                        <span class="header">OVERVIEW</span>
                        <a href="#">Why PrimeFaces</a>
                        <a href="#">Who Uses PrimeFaces</a>
                        <a href="#">Testimonials</a>
                        <a href="#">License</a>
                    </div>
                    <div class="ui-g-12 ui-lg-2">
                        <a href="#">PrimeNG</a>
                    </div>
                    <div class="ui-g-12 ui-lg-2 footer-social">
                        <span class="header">SOCIAL</span>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-github"></i></a>
                    </div>
                </div>
            </div>
  `,
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class Footer implements OnInit, OnDestroy {

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
