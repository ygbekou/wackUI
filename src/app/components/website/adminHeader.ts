import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService, TokenStorage, GlobalEventsManager } from '../../services';
import { Company } from '../../models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-header',
  template: `
            <header id="header" class="header-effect-shrink" data-plugin-options="{'stickyEnabled': true,
                        'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyChangeLogo': true,
                        'stickyStartAt': 120, 'stickyHeaderContainerHeight': 70}">
				<div class="header-body border-color-primary header-body-bottom-border">
					<div class="header-top header-top-default border-bottom-0">
						<div class="container">
							<div class="header-row py-2">
								<div>
                                    <div class="header-row">
                                        <nav class="header-nav-top">
                                            {{'COMMON.LANGUAGE' | translate}} &nbsp; &nbsp;
                                            <ul class="nav nav-pills text-uppercase text-2">
                                                <li class="nav-item nav-item-anim-icon d-none d-md-block">
                                                    <p-radioButton name="language" value="en" label="EN" [(ngModel)]="currentLang"
                                                        #langSelect="ngModel" (click)="translate.use(langSelect.value)">
                                                    </p-radioButton>&nbsp;&nbsp;&nbsp;&nbsp;
                                                </li>
                                                <li class="nav-item nav-item-anim-icon d-none d-md-block">
                                                    <p-radioButton name="language" value="fr" label="FR" [(ngModel)]="currentLang"
                                                        #langSelect="ngModel" (click)="translate.use(langSelect.value)">
                                                    </p-radioButton>
                                                </li>
											</ul>
										</nav>
                                    </div>
                                </div>
								<div class="header-column justify-content-end">
									<div class="header-row">
										<nav class="header-nav-top">
											<ul class="nav nav-pills">
												<li class="nav-item">
                                                    <a href="mailto:{{company.email}}"><i class="far fa-envelope text-4
                                                    text-color-primary" style="top: 1px;"></i> {{company.email}}</a>
												</li>
												<li class="nav-item">
													<a href="tel:{{company.phone}}"><i class="fab fa-whatsapp text-4 text-color-primary" style="top: 0;"></i> {{company.phone}}</a>
												</li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="header-container container">
						<div class="header-row">
							<div class="header-column">
								<div class="header-row">
									<div class="header-logo">
										<a href="/">
											<img alt="ATC" width="200" height="96" src="assets/docs/Company/{{company.logo}}">
										</a>
									</div>
								</div>
							</div>
							<div class="header-column justify-content-end">
								<div class="header-row">
									<div class="header-nav header-nav-links order-2 order-lg-1">
										<div class="header-nav-main header-nav-main-square header-nav-main-effect-2 header-nav-main-sub-effect-1">
											<nav class="collapse">
												<ul class="nav nav-pills" id="mainNav">
													<li class="dropdown">
														<a class="dropdown-item dropdown-toggle active" (click)="navigate('')">
															{{ 'COMMON.HOME' | translate }}
														</a>
                                                    </li>
                                                    <li class="dropdown">
														<a class="dropdown-item dropdown-toggle active" (click)="navigate('/adminWeb')">
															{{ 'COMMON.WEB_MENU' | translate }}
														</a>
                                                    </li>
                                                    <li *ngIf="tokenStorage.hasToken()">
                                                        <a class="dropdown-item dropdown-toggle" (click)="logOut()">
                                                            {{ 'COMMON.LOGOUT' | translate }}
                                                        </a>
                                                    </li>
												</ul>
											</nav>
										</div>
										<ul class="header-social-icons social-icons d-none d-sm-block">
                                            <li class="social-icons-facebook"><a href="{{company.facebookUrl}}" target="_blank"
                                            title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                            <li class="social-icons-twitter"><a href="{{company.twitterUrl}}" target="_blank"
                                            title="Twitter"><i class="fab fa-twitter"></i></a></li>
                                            <li class="social-icons-linkedin"><a href="{{company.linkedInUrl}}" target="_blank"
                                            title="Linkedin"><i class="fab fa-linkedin-in"></i></a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

  `,
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class AdminHeader implements OnInit, OnDestroy {

    company: Company = new Company();
    currentLang = 'en';

    constructor
    (
      private genericService: GenericService,
      public tokenStorage: TokenStorage,
      public translate: TranslateService,
      private router: Router
    ) {

        const parameters = [];
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

    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
    }

    navigate(url: string) {
        this.router.navigate([url]);
    }

    logOut() {
        this.tokenStorage.signOut();
        this.navigate('login');
    }

 }
