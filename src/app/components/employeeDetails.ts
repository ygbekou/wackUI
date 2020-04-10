import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Employee } from '../models/employee';
import { UserGroup } from '../models/userGroup';
import { UserGroupDropdown } from './dropdowns';
import { User } from '../models/user';
import { GenericService, UserService, TokenStorage } from '../services';
import { TranslateService} from '@ngx-translate/core';
import { Message, ConfirmationService } from 'primeng/api';
import { BaseComponent } from './website/baseComponent';

@Component({
  selector: 'app-employee-details',
  templateUrl: '../pages/employeeDetails.html',
  providers: [GenericService, UserService, UserGroupDropdown]
})
// tslint:disable-next-line:component-class-suffix
export class EmployeeDetails extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('picture') picture: ElementRef;
  formData = new FormData();

  employee: Employee = new Employee();
  messages: Message[] = [];
  pictureUrl: any = '';

  constructor
    (
      public genericService: GenericService,
      public confirmationService: ConfirmationService,
      public translate: TranslateService,
      public tokenStorage: TokenStorage,
      public userService: UserService,
      public userGroupDropdown: UserGroupDropdown,
      private route: ActivatedRoute,
    ) {
      super(genericService, translate, confirmationService, tokenStorage);
        this.employee.user = new User();
  }

  ngOnInit(): void {

    let employeeId = null;
    this.route
        .queryParams
        .subscribe(params => {

          this.employee.user = new User();
          this.employee.user.userGroup = new UserGroup();
          employeeId = params['employeeId'];

          if (employeeId != null) {
              this.genericService.getOne(employeeId, 'Employee')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.employee = result;
                  if (this.employee.user.birthDate != null) {
                    this.employee.user.birthDate = new Date(this.employee.user.birthDate);
                  }
                } 
              });
          } else {
          }
        });

  }

  ngOnDestroy() {
    this.employee = null;
  }

  save() {
    this.messages = [];
    this.formData = new FormData();
        let inputEl;
        if (this.picture) {
            inputEl = this.picture.nativeElement;

            if (inputEl && inputEl.files && (inputEl.files.length > 0)) {
            const files: FileList = inputEl.files;
            for (let i = 0; i < files.length; i++) {
                this.formData.append('file', files[i], files[i].name);
            }
            } else {
                //this.formData.append('file', null, null);
            }
        }

    try {
      if (inputEl && inputEl.files && (inputEl.files.length > 0)) {
        this.userService.saveUserWithPicture('Employee', this.employee, this.formData)
          .subscribe(result => {
            this.processResult(result, this.employee, this.messages, this.pictureUrl);
          });
      } else {
        this.userService.saveUserWithoutPicture('Employee', this.employee)
          .subscribe(result => {
            this.processResult(result, this.employee, this.messages, this.pictureUrl);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }

  clear() {
    this.employee = new Employee();
  }


   getEmployee(employeeId: number) {
    this.messages = [];
    this.genericService.getOne(employeeId, 'Employee')
        .subscribe(result => {
      if (result.id > 0) {
        this.employee = result;
      } else {
        this.translate.get(['COMMON.READ', 'MESSAGE.READ_FAILED']).subscribe(res => {
          this.messages.push({severity:
            Constants.ERROR, summary:
            res['COMMON.READ'], detail:
            res['MESSAGE.READ_FAILED']});
        });
      }
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: ProgressEvent) => {
        this.pictureUrl = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearPicture() {
    this.pictureUrl = '';
    this.picture.nativeElement.value = '';
  }

 }
