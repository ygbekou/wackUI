import {Constants} from '../app.constants';
import {User} from '../models/user';
import {GenericService} from '../services/generic.service';
import {UserService} from "../services/user.service";
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
@Component({
  moduleId: 'module.id',
  selector: 'app-home',
  templateUrl: '../pages/home.html',
  providers: [GenericService, Constants, UserService]
})

export class Home implements OnInit {
  user: User;
  leadership: User[];
  theUser: User = new User();
  displayVideo = false;
  PROJECT: string = Constants.PROJECT;
  SELECT_PROJECT: string = Constants.SELECT_PROJECT;
  payAmount: number;
  @ViewChild('videoPlayer') videoplayer: any;
  error: string = "";
  index = 0;
  firstNewsId: number = 1;
  currencyCode: string = "USD";
  displayDialog = false;
  constructor(
    private baseService: GenericService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('in AppComponent init');
    this.error = "";
    if (this.user == null) {
      //console.log('User = '+Cookie.get('user'));
      if (Cookie.get('user'))
        this.user = JSON.parse(Cookie.get('user'));
      if (this.user == null) {
        //console.log('User1= '+this.user);
        this.user = new User();
        this.user.id = 0;
      }
    }
  }
  

  setCurrentNews(aNews) {
    Cookie.set('newsId', aNews.id);
  }

  showUser(leader: User) {
    this.theUser = leader;
    //this.getUserTree(leader)
    this.displayDialog = true;
  }

  playVideo() {
    this.displayVideo = true;
    this.videoplayer.nativeElement.play();
  }

  stopVideo() {
    this.videoplayer.nativeElement.pause();
  }

  getNextUser() {
    if (this.index == this.leadership.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
    this.theUser = this.leadership[this.index];
    //this.getUserTree(this.theUser);
  }

  getPreviousUser() {
    if (this.index == 0) {
      this.index = this.leadership.length - 1;
    } else {
      this.index--;
    }
    this.theUser = this.leadership[this.index];
    //this.getUserTree(this.theUser);
  }
  

  public gotToCandidat() {
    this.router.navigate(['/candidats']);
    setTimeout(() => {
      console.log('waiting a bit before reload');
      window.location.reload();
    }, 100)
    
  }


}
