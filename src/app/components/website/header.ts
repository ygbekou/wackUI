import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService, TokenStorage, GlobalEventsManager } from '../../services';
import { Company } from '../../models';

@Component({
  selector: 'app-web-header',
  template: `
            <header id="header" class="header-effect-shrink" data-plugin-options="{'stickyEnabled': true,
                        'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyChangeLogo': true,
                        'stickyStartAt': 120, 'stickyHeaderContainerHeight': 70}">
				<div class="header-body border-color-primary header-body-bottom-border">
					<div class="header-top header-top-default border-bottom-0">
						<div class="container">
							<div class="header-row py-2">
								<div class="header-column justify-content-start">
									<div class="header-row">
										<nav class="header-nav-top">
											<ul class="nav nav-pills text-uppercase text-2">
												<li class="nav-item nav-item-anim-icon d-none d-md-block">
													<a class="nav-link pl-0" href="about-us.html"><i class="fas fa-angle-right"></i> About Us</a>
												</li>
												<li class="nav-item nav-item-anim-icon d-none d-md-block">
													<a class="nav-link" href="contact-us.html"><i class="fas fa-angle-right"></i> Contact Us</a>
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
                                                    <a href="mailto:alltrustconsulting@yahoo.com"><i class="far fa-envelope text-4
                                                    text-color-primary" style="top: 1px;"></i> {{company.email}}</a>
												</li>
												<li class="nav-item">
													<a href="tel:240-351-6077"><i class="fab fa-whatsapp text-4 text-color-primary" style="top: 0;"></i> {{company.phone}}</a>
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
										<a href="index.html">
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
														<a class="dropdown-item dropdown-toggle active" href="index.html">
															Home
														</a>
													</li>
													<li class="dropdown">
														<a class="dropdown-item dropdown-toggle" (click)="navigate('/services')">
															Services
														</a>
													</li>
													<li class="dropdown">
														<a class="dropdown-item dropdown-toggle" (click)="navigate('/industries')">
															Industries
														</a>
													</li>
													<li class="dropdown">
														<a class="dropdown-item dropdown-toggle" (click)="navigate('/about')">
															About Us
														</a>
													</li>
													<li class="dropdown">
														<a class="dropdown-item dropdown-toggle" (click)="navigate('/contact')">
															Contact Us
														</a>
                                                    </li>
                                                    <li *ngIf="!tokenStorage.hasToken()"><a class="dropdown-item dropdown-toggle"
                                                        (click)="goToLoginPage()"><span>Login</span></a></li>
                                                    <li *ngIf="tokenStorage.hasToken()"><a class="dropdown-item dropdown-toggle"
                                                        (click)="logOut()"><span>Logout</span></a></li>
                                                    <li *ngIf="tokenStorage.hasToken()"><a class="dropdown-item dropdown-toggle"
                                                        (click)="goToAdminPage()"><span>Admin Page</span></a></li>
												</ul>
											</nav>
										</div>
										<ul class="header-social-icons social-icons d-none d-sm-block">
                                            <li class="social-icons-facebook"><a href="http://www.facebook.com/" target="_blank"
                                            title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                            <li class="social-icons-twitter"><a href="http://www.twitter.com/" target="_blank"
                                            title="Twitter"><i class="fab fa-twitter"></i></a></li>
                                            <li class="social-icons-linkedin"><a href="http://www.linkedin.com/" target="_blank"
                                            title="Linkedin"><i class="fab fa-linkedin-in"></i></a></li>
										</ul>
										<button class="btn header-btn-collapse-nav" data-toggle="collapse" data-target=".header-nav-main nav">
											<i class="fas fa-bars"></i>
										</button>
									</div>
									<div class="header-nav-features header-nav-features-no-border header-nav-features-lg-show-border order-1 order-lg-2">
										<div class="header-nav-feature header-nav-features-search d-inline-flex">
											<a href="#" class="header-nav-features-toggle" data-focus="headerSearch"><i class="fas fa-search header-nav-top-icon"></i></a>
											<div class="header-nav-features-dropdown" id="headerTopSearchDropdown">
												<form role="search" action="page-search-results.html" method="get">
													<div class="simple-search input-group">
														<input class="form-control text-1" id="headerSearch" name="q" type="search" value="" placeholder="Search...">
														<span class="input-group-append">
															<button class="btn" type="submit">
																<i class="fa fa-search header-nav-top-icon"></i>
															</button>
														</span>
													</div>
												</form>
											</div>
										</div>
										<div class="header-nav-feature header-nav-features-cart d-inline-flex ml-2">
											<a href="#" class="header-nav-features-toggle">
												<img src="img/icons/icon-cart.svg" width="14" alt="" class="header-nav-top-icon-img">
												<span class="cart-info d-none">
													<span class="cart-qty">1</span>
												</span>
											</a>
											<div class="header-nav-features-dropdown" id="headerTopCartDropdown">
												<ol class="mini-products-list">
													<li class="item">
														<a href="#" title="Camera X1000" class="product-image"><img src="img/products/product-1.jpg" alt="Camera X1000"></a>
														<div class="product-details">
															<p class="product-name">
																<a href="#">Camera X1000 </a>
															</p>
															<p class="qty-price">
																 1X <span class="price">$890</span>
															</p>
															<a href="#" title="Remove This Item" class="btn-remove"><i class="fas fa-times"></i></a>
														</div>
													</li>
												</ol>
												<div class="totals">
													<span class="label">Total:</span>
													<span class="price-total"><span class="price">$890</span></span>
												</div>
												<div class="actions">
													<a class="btn btn-dark" href="#">View Cart</a>
													<a class="btn btn-primary" href="#">Checkout</a>
												</div>
											</div>
										</div>
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
export class Header implements OnInit, OnDestroy {

    company: Company = new Company();

    constructor
    (
      private genericService: GenericService,
      public tokenStorage: TokenStorage,
      private globalEventManager: GlobalEventsManager,
      private route: ActivatedRoute,
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

    goToLoginPage() {
        this.globalEventManager.showMenu = false;
        this.router.navigate(['login']);
        // window.location.reload();
    }

    goToAdminPage() {
        this.globalEventManager.showMenu = true;
        this.router.navigate(['/adminWebsite']);
    }


    navigate(url: string) {
        this.router.navigate([url]);
    }

    logOut() {
        this.tokenStorage.signOut();
        this.goToLoginPage();
    }

 }
