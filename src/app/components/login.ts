import {Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService, TokenStorage, UserService} from '../services';
import {Constants} from '../app.constants';
import {User} from '../models/user';
import {GlobalEventsManager} from '../services/globalEventsManager';
import { Message } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-login-form',
  templateUrl: '../pages/login.html',
  providers: [Constants]
})

// tslint:disable-next-line:component-class-suffix
export class Login implements OnInit {
  messages: Message[] = [];
  passwordSent = '';
  button = '';
  user: User;
  action: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenStorage: TokenStorage,
    public translate: TranslateService,
    private authenticationService: AuthenticationService,
    private globalEventsManager: GlobalEventsManager,
    private route: ActivatedRoute) {
    this.user = new User();
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      console.log('action =' + this.action);
    });

    this.globalEventsManager.showMenu = false;

  }

  ngOnInit() {
    this.user = new User();
    // this.setDefaults();
  }

  setDefaults() {
  }

  public login() {
    try {
      this.passwordSent = '';
      console.log(this.button);
      if (this.button === 'password') {
        console.log('Send password called');
        this.sendPassword();
      } else {
        this.authenticationService.attemptAuth(this.user)
          .subscribe(data => {
            if (this.tokenStorage.getToken() !== '' && this.tokenStorage.getToken() !== null) {
                this.router.navigate(['adminWebsite']);
            } else {
                this.translate.get(['MESSAGE.INVALID_USER_PASS', 'COMMON.LOGIN']).subscribe(res => {
                    this.messages.push({severity: Constants.ERROR, summary: res['COMMON.LOGIN'], detail: res['MESSAGE.INVALID_USER_PASS']});
                });
            }
          });
      }
    } catch (e) {
        this.translate.get(['MESSAGE.INVALID_USER_PASS', 'COMMON.LOGIN']).subscribe(res => {
            this.messages.push({severity: Constants.ERROR, summary: res['COMMON.LOGIN'], detail: res['MESSAGE.INVALID_USER_PASS']});
        });
    }


  }

  public sendPassword() {
    try {
      this.button = '';
      this.userService.sendPassword(this.user)
        .subscribe(result => {
          if (result === true) {
            this.translate.get(['MESSAGE.PASSWORD_SENT', 'COMMON.READ']).subscribe(res => {
                this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.READ'],
                    detail: res['MESSAGE.PASSWORD_SENT'] + this.user.email});
            });
          } else {
           this.translate.get(['MESSAGE.PASSWORD_NOT_SENT', 'COMMON.READ']).subscribe(res => {
                this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.READ'],
                    detail: res['MESSAGE.PASSWORD_NOT_SENT']});
            });
          }
        });
    } catch (e) {
      this.translate.get(['MESSAGE.ERROR_OCCURRED', 'COMMON.READ']).subscribe(res => {
            this.messages.push({severity: Constants.ERROR, summary: res['COMMON.READ'],
                detail: res['MESSAGE.ERROR_OCCURRED']});
        });
    }

  }

}
