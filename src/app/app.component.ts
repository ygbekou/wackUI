import {Constants} from './app.constants';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from './models/user';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {GlobalEventsManager} from "./services/globalEventsManager";
import {GenericService} from "./services/generic.service"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalEventsManager, GenericService, Constants]
})
export class AppComponent implements OnInit {
  user: User;
  toggleValue: string="collapse";
  constructor(
    private router: Router,
    private baseService: GenericService,
    private globalEventsManager: GlobalEventsManager) {
  }
  ngOnInit() {
    console.log('in AppComponent init');

    if (this.user == null) {
      // console.log('User = '+Cookie.get('user'));
      if (Cookie.get('user')){
        this.user = JSON.parse(Cookie.get('user'));
      }

      if (this.user == null) {
                  alert(this.user)
        // console.log('User1= '+this.user);
        this.user = new User();
        this.user.id = 0;
      }
    }
    this.globalEventsManager.showNavBar.subscribe((data: boolean) => {
      console.log('globalEventsManager reached');
      this.user = JSON.parse(Cookie.get('user'));
    }, error => console.log(error));
  }

 
  public logout() {
    Cookie.deleteAll();
    this.user = new User();
    this.user.id = 0;
    this.router.navigate(["/"]);
    window.location.reload();
  }

  public updateUser(aUser) {
    this.user = aUser;
  }
  
  public refreshUser() {
    this.user = JSON.parse(Cookie.get('user'));
    if (this.user == null) {
      this.user = new User();
    }
  }
}
