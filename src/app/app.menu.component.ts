import {Component, Input, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';

@Component({
  selector: 'app-menu',
  template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu"
            [reset]="reset" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

  @Input() reset: boolean;

  model: any[];

  constructor(public app: AppComponent) {}

  ngOnInit() {
    this.model = [
      {label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/']},
      {
        label: 'Patients', icon: '  fa fa-wheelchair',
        items: [
          {label: 'Ajouter un patient', icon: 'fa fa-plus', routerLink: ['/admin/patientDetails']},
          {label: 'Liste des patients', icon: 'fa fa-search', routerLink: ['/admin/patientList']}
        ]
      },
      {
        label: 'Personnel', icon: 'fa fa-user-md',
        items: [
          {label: 'Ajouter un personnel', icon: 'fa fa-plus', routerLink: ['/admin/employeeDetails']},
          {label: 'Liste du personnel', icon: 'fa fa-search', routerLink: ['/admin/employeeList']}
        ]
      },
      {
        label: 'Admission', icon: 'fa fa-ambulance',
        items: [
          {label: 'Admettre un patient', icon: 'fa fa-plus', routerLink: ['/admin/admissionDetails']},
          {label: 'Liste des admissions', icon: 'fa fa-search', routerLink: ['/admin/admissionList']},
          {label: 'Changer de lit', icon: 'fa fa-edit', routerLink: ['/admin/bedTransfer']},
          {label: 'Changer de medecin', icon: 'fa fa-edit', routerLink: ['/admin/doctorTransfer']}
        ]
      },
      {
        label: 'Rendez-vous', icon: 'fa fa-calendar',
        items: [
          {label: 'Ajouter un horaire', icon: 'fa fa-plus', routerLink: ['/admin/scheduleDetails']},
          {label: 'Liste des horaires', icon: 'fa fa-search', routerLink: ['/admin/scheduleList']},
          {label: 'Les Rendez-vous', icon: 'fa fa-calendar-check-o', routerLink: ['/admin/appointmentScheduler']} 
        ]
      },
      {
        label: 'Visites', icon: ' fa fa-user-md',
        items: [
          {label: 'Ajouter une visite', icon: 'fa fa-plus', routerLink: ['/admin/visitDetails']},
          {label: 'Liste des visites', icon: 'fa fa-search', routerLink: ['/admin/visitList']} 
        ]
      },
      {
        label: 'Laboratoire', icon: 'fa fa-stethoscope',
        items: [
          {label: 'Ajouter un test', icon: 'fa fa-plus', routerLink: ['/admin/investigationDetails']},
          {label: 'Liste des tests', icon: 'fa fa-search', routerLink: ['/admin/investigationList']} 
        ]
      },
      {
        label: 'Facturation', icon: 'fa fa-money',
        items: [
          {label: 'Nouvelle facture', icon: 'fa fa-plus', routerLink: ['/admin/billDetails']},
          {label: 'Anciennes Factures', icon: 'fa fa-search', routerLink: ['/admin/billList']},
          {label: 'Ajouter un tarif', icon: 'fa fa-plus', routerLink: ['/admin/serviceDetails']},
          {label: 'Liste des tarifs', icon: 'fa fa-search', routerLink: ['/admin/serviceList']},
          {label: 'Ajouter un paquet', icon: 'fa fa-plus', routerLink: ['/admin/packageDetails']},
          {label: 'Liste des paquets', icon: 'fa fa-search', routerLink: ['/admin/packageList']}
        ]
      },
      {
        label: 'Configuration', icon: 'fa fa-cogs',
        items: [
          {label: 'Chambres et lits', icon: 'fa fa-bed', routerLink: ['/admin/adminBedStatus']},
          {label: 'config. des References', icon: 'fa fa-search', routerLink: ['/admin/adminReference']} 
        ]
      },
      {
        label: 'Reglage Affichage', icon: 'fa fa-fw fa-paint-brush',
        items: [
          {
            label: 'Couleurs',
            icon: 'fa fa-fw fa-paint-brush',
            items: [
              {
                label: 'Blue', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('blue', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('blue', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('blue', 'gradient')
                  }
                ]
              },
              {
                label: 'Cyan', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('cyan', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('cyan', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('cyan', 'gradient')
                  }
                ]
              },
              {
                label: 'Green', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('green', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('green', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('green', 'gradient')
                  }
                ]
              },
              {
                label: 'Yellow', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('yellow', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('yellow', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('yellow', 'gradient')
                  }
                ]
              },
              {
                label: 'Purple', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('purple', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('purple', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('purple', 'gradient')
                  }
                ]
              },
              {
                label: 'Pink', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('pink', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('pink', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('pink', 'gradient')
                  }
                ]
              },
              {
                label: 'Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('bluegrey', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('bluegrey', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('bluegrey', 'gradient')
                  }
                ]
              },
              {
                label: 'Teal', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('teal', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('teal', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('teal', 'gradient')
                  }
                ]
              },
              {
                label: 'Orange', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('orange', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('orange', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('orange', 'gradient')
                  }
                ]
              },
              {
                label: 'Grey', icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('grey', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('grey', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('grey', 'gradient')
                  }
                ]
              }
            ]
          },
          {
            label: 'Special',
            icon: 'fa fa-fw fa-paint-brush',
            items: [
              {
                label: 'Cappuccino', icon: 'fa fa-fw fa-picture-o',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('cappuccino', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('cappuccino', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('cappuccino', 'gradient')
                  }
                ]
              },
              {
                label: 'Montreal', icon: 'fa fa-fw fa-picture-o',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('montreal', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('montreal', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('montreal', 'gradient')
                  }
                ]
              },
              {
                label: 'Hollywood', icon: 'fa fa-fw fa-picture-o',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('hollywood', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('hollywood', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('hollywood', 'gradient')
                  }
                ]
              },
              {
                label: 'Peak', icon: 'fa fa-fw fa-picture-o',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('peak', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('peak', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('peak', 'gradient')
                  }
                ]
              },
              {
                label: 'Alive', icon: 'fa fa-fw fa-certificate',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('alive', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('alive', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('alive', 'gradient')
                  }
                ]
              },
              {
                label: 'Emerald', icon: 'fa fa-fw fa-certificate',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('emerald', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('emerald', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('emerald', 'gradient')
                  }
                ]
              },
              {
                label: 'Ash', icon: 'fa fa-fw fa-certificate',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('ash', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('ash', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('ash', 'gradient')
                  }
                ]
              },
              {
                label: 'Noir', icon: 'fa fa-fw fa-certificate',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('noir', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('noir', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('noir', 'gradient')
                  }
                ]
              },
              {
                label: 'Mantle', icon: 'fa fa-fw fa-certificate',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('mantle', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('mantle', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('mantle', 'gradient')
                  }
                ]
              },
              {
                label: 'Predawn', icon: 'fa fa-fw fa-certificate',
                items: [
                  {
                    label: 'Light', icon: 'fa fa-fw fa-square-o',
                    command: (event) => this.changeTheme('predawn', 'light')
                  },
                  {
                    label: 'Dark', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('predawn', 'dark')
                  },
                  {
                    label: 'Gradient', icon: 'fa fa-fw fa-square',
                    command: (event) => this.changeTheme('predawn', 'gradient')
                  }
                ]
              },
            ]
          },
          {
            label: 'Position Menu', icon: 'fa fa-fw fa-bars',
            items: [
              {label: 'Afficher Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.layoutMode = 'static'},
              {label: 'Cacher Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.layoutMode = 'overlay'}
            ]
          },
          {
            label: 'Prosition Profile', icon: 'fa fa-fw fa-user',
            items: [
              {label: 'Profile a gauche', icon: 'fa fa-sun-o fa-fw', command: () => this.app.profileMode = 'inline'},
              {label: 'Profile en haut', icon: 'fa fa-moon-o fa-fw', command: () => this.app.profileMode = 'top'}
            ]
          }
        ]
      },

      /*
      {
        label: 'Mega Menu', icon: 'fa fa-fw fa-bars', badgeStyleClass: 'text-badge', badge: 'New',
        items: [
          {label: 'Light Menu', icon: 'fa fa-sun-o fa-fw', command: () => this.app.megaMenuMode = 'light'},
          {label: 'Dark Menu', icon: 'fa fa-moon-o fa-fw', command: () => this.app.megaMenuMode = 'dark'},
          {label: 'Gradient Menu', icon: 'fa fa-moon-o fa-fw', command: () => this.app.megaMenuMode = 'gradient'}
        ]
      },
      {
        label: 'Components', icon: 'fa fa-fw fa-sitemap',
        items: [
          {label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample']},
          {label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms']},
          {label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data']},
          {label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels']},
          {label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays']},
          {label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus']},
          {label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages']},
          {label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts']},
          {label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file']},
          {label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc']}
        ]
      },
      {label: 'Landing', icon: 'fa fa-fw fa-certificate', url: 'assets/pages/landing.html', target: '_blank'},
      {
        label: 'Template Pages', icon: 'fa fa-fw fa-life-saver',
        items: [
          {label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty']},
          {label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank'},
          {label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank'},
          {label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank'},
          {
            label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',
            url: 'assets/pages/access.html', target: '_blank'
          }
        ]
      },
      {
        label: 'Menu Hierarchy', icon: 'fa fa-fw fa-gg',
        items: [
          {
            label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
            items: [
              {
                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                items: [
                  {label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in'},
                  {label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in'},
                  {label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in'},
                ]
              },
              {
                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                items: [
                  {label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in'},
                  {label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in'}
                ]
              },
            ]
          },
          {
            label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
            items: [
              {
                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                items: [
                  {label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in'},
                  {label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in'},
                  {label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in'},
                ]
              },
              {
                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                items: [
                  {label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in'},
                  {label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in'}
                ]
              },
            ]
          }
        ]
      },**/
      {label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: ['/documentation']}
    ];
  }

  changeTheme(theme: string, scheme: string) {
    const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');
    layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';

    const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
    themeLink.href = 'assets/theme/theme-' + theme + '.css';

    this.app.menuMode = scheme;
  }
}

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-submenu]',
  /* tslint:enable:component-selector */
  template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)"
                   class="ripplelink" *ngIf="!child.routerLink"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="fa fa-fw fa-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
                </a>

                <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="child.routerLink"
                   [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="fa fa-fw fa-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
                </a>
                <div class="submenu-arrow" *ngIf="child.items"></div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]=" isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
  animations: [
    trigger('children', [
      state('hiddenAnimated', style({
        height: '0px',
        opacity: 0
      })),
      state('visibleAnimated', style({
        height: '*',
        opacity: 1
      })),
      transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppSubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _reset: boolean;

  _parentActive: boolean;

  activeIndex: number;

  constructor(public app: AppComponent) {}

  itemClick(event: Event, item: MenuItem, index: number) {

    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    // activate current item and deactivate active sibling if any
    this.activeIndex = (this.activeIndex === index) ? null : index;

    // execute command
    if (item.command) {
      item.command({originalEvent: event, item: item});
    }

    // prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      setTimeout(() => {
        this.app.layoutMenuScrollerViewChild.moveBar();
      }, 450);
      event.preventDefault();
    }

    // hide menu
    if (!item.items) {
      this.app.overlayMenuActive = false;
      this.app.staticMenuMobileActive = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  @Input() get reset(): boolean {
    return this._reset;
  }

  set reset(val: boolean) {
    this._reset = val;

    if (this._reset) {
      this.activeIndex = null;
    }
  }

  @Input() get parentActive(): boolean {
    return this._parentActive;
  }

  set parentActive(val: boolean) {
    this._parentActive = val;

    if (!this._parentActive) {
      this.activeIndex = null;
    }
  }
}