import {Component, OnInit, ViewChild} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import {GenericService} from '../services/generic.service';
import {UserService} from '../services/user.service';
import {CountryDropdown} from './dropdowns/dropdown.country';
import {FileUploader} from './fileUploader';
import {Router} from "@angular/router";
@Component({
  selector: 'admin-main',
  templateUrl: '../pages/adminMain.html',
  providers: [GenericService, Constants, UserService, CountryDropdown],
  styles: [` 
* { 
  margin: 0; 
  padding: 0;
}`]
})
export class AdminMain implements OnInit {
  public loggedInUser: User;
  public user: User = new User();
  searchText: string;
  public users: User[];
  msg: string;
  error: string;
  MALE: string = Constants.MALE;
  FEMALE: string = Constants.FEMALE;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;
  ALIVE: string = Constants.ALIVE;
  DEAD: string = Constants.DEAD;
  roles: any[] = [];
  vote= false;
  public countryDropdown: CountryDropdown;
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  @ViewChild(FileUploader) fileUploader: FileUploader;
  
  constructor(private baseService: GenericService, private userService: UserService,
    private router: Router,
    private cDropdown: CountryDropdown) {
    this.loggedInUser = JSON.parse(Cookie.get('user'));
    this.countryDropdown = cDropdown;
    this.user.firstName = '';
    this.user.lastName = '';
    this.roles = [];
    this.roles.push({label: 'Administrateur', value: 1});
    this.roles.push({label: 'Membre', value: 2});
  }
  ngOnInit() {
    this.loggedInUser = JSON.parse(Cookie.get('user'));
  }


  public search() {
    this.error = null;
    if (this.searchText != null) {
      this.userService.search(this.searchText).subscribe((data: User[]) => {
        this.users = data;
        if (this.users == null || this.users.length <= 0) {
          this.error = Constants.NO_USER_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find users with name like ' + this.searchText));
    }
  }


  public saveUser() {
    this.error = '';
    if (this.user.firstName == null ||
      this.user.lastName == null || this.user.email == null ||
      this.user.password == null ) {
      this.error = Constants.MISSING_REQUIRED_FIELD;
    } else {
      try {
        this.userService.saveUser(this.user)
          .subscribe(result => {
            //this.error = result.error;
            //if (!result.error.startsWith("Echec")) {
              this.user = result;
            //}
          })
      }
      catch (e) {
        this.error = Constants.ERROR_OCCURRED;
      }
    }
  }


  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("members", data);
  }
}
