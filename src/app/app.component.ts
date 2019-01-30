import { GlobalEventsManager } from './services';
import { TokenStorage } from './services/token.storage';
import {Component, AfterViewInit, ElementRef, Renderer2, ViewChild, OnDestroy, Input} from '@angular/core';
import {Location} from '@angular/common';
import {ScrollPanel} from 'primeng/primeng';
import { TranslateService} from '@ngx-translate/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  layoutMode = 'static';

  megaMenuMode = 'dark';

  menuMode = 'light';

  profileMode = 'inline';

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  layoutMenuScroller: HTMLDivElement;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  resetMenu: boolean;

  rightPanelActive: boolean;

  rightPanelClick: boolean;

  megaMenuActive: boolean;

  megaMenuClick: boolean;

  @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ScrollPanel;

  constructor(public globalEventsManager: GlobalEventsManager,
              private location: Location,
              public translate: TranslateService,
              private token: TokenStorage,
              public renderer: Renderer2) {

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.currentLang = 'en';

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }

//  ngOnInit() {
//    this.location.subscribe(
//      x => {
//      }
//    );
//  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.layoutMenuScrollerViewChild) {
        this.layoutMenuScrollerViewChild.moveBar();
      }
    }, 100);
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

      if (!this.rightPanelClick) {
          this.rightPanelActive = false;
      }

      if (!this.megaMenuClick) {
          this.megaMenuActive = false;
      }

    if (!this.menuClick) {
      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }
    }

    this.topbarItemClick = false;
    this.menuClick = false;
      this.rightPanelClick = false;
      this.megaMenuClick = false;
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.layoutMode === 'overlay') {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive; } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive; }
    }

    event.preventDefault();
  }

  onMenuClick($event) {
    this.menuClick = true;
    this.resetMenu = false;
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null; } else {
      this.activeTopbarItem = item; }

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    onMegaMenuButtonClick(event) {
        this.megaMenuClick = true;
        this.megaMenuActive = !this.megaMenuActive;
        event.preventDefault();
    }

    onMegaMenuClick() {
        this.megaMenuClick = true;
    }

  hideOverlayMenu() {
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isOverlay() {
    return this.layoutMode === 'overlay';
  }
}
