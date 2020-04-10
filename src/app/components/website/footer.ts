import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericService, GlobalEventsManager } from '../../services';

@Component({
  selector: 'app-web-footer',
  template: `
			<footer id="footer">
				<div class="container">
					<div class="footer-ribbon">
						<span>{{ 'COMMON.CONTACT_US' | translate }}</span>
					</div>
					<div class="row py-5 my-4">

						<div class="col-md-6 col-lg-3 mb-4 mb-md-0">
							<div class="contact-details">
								<h5 class="text-3 mb-3">{{ 'COMMON.CONTACT_US' | translate }}</h5>
								<ul class="list list-icons list-icons-lg">
                                    <li class="mb-1"><i class="far fa-dot-circle text-color-primary"></i>
                                        <p class="m-0">{{globalEventsManager.company.address}}</p></li>
                                    <li class="mb-1"><i class="fab fa-whatsapp text-color-primary"></i>
                                        <p class="m-0"><a href="tel:{{globalEventsManager.company.phone}}">
                                            {{globalEventsManager.company.phone}}</a></p>
                                        <p class="m-0"><a href="tel:{{globalEventsManager.company.phone2}}">
                                            {{globalEventsManager.company.phone2}}</a></p>
                                    </li>
                                    <li class="mb-1"><i class="fas fa-fax text-color-primary"></i>
                                        <p class="m-0"><a>{{globalEventsManager.company.phone}}</a></p>
                                    </li>
                                    <li class="mb-1"><i class="far fa-envelope text-color-primary"></i>
                                        <p class="m-0">
                                        <a href="mailto:{{globalEventsManager.company.email}}">{{globalEventsManager.company.email}}</a></p>
                                    </li>
								</ul>
							</div>
						</div>
						<div class="col-md-6 col-lg-2">
							<h5 class="text-3 mb-3">{{ 'COMMON.FOLLOW_US' | translate }}</h5>
							<ul class="social-icons">
                                <li class="social-icons-facebook"><a href="{{globalEventsManager.company.facebookUrl}}"
                                target="_blank" title="Facebook">
                                        <i class="fab fa-facebook-f"></i></a></li>
                                <li class="social-icons-twitter"><a href="{{globalEventsManager.company.twitterUrl}}"
                                target="_blank" title="Twitter">
                                        <i class="fab fa-twitter"></i></a></li>
                                <li class="social-icons-linkedin"><a href="{{globalEventsManager.company.linkedInUrl}}"
                                target="_blank" title="Linkedin">
                                        <i class="fab fa-linkedin-in"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="footer-copyright">
					<div class="container py-2">
						<div class="row py-4">
							<div class="col-lg-7 d-flex align-items-center justify-content-center justify-content-lg-start mb-4 mb-lg-0">
								<p>ï¿½ {{globalEventsManager.company.copyright}}</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
  `,
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class Footer implements OnInit, OnDestroy {

    constructor
    (
       public globalEventsManager: GlobalEventsManager
    ) {


  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }

 }
