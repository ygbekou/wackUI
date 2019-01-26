import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {  } from 'primeng/primeng';
import { GenericService } from '../services';
import { User } from '../models';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: '../pages/employeeList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class EmployeeList implements OnInit, OnDestroy {

  employees: Employee[] = [];
  cols: any[];
  @Output() employeeIdEvent = new EventEmitter<string>();

  constructor
    (
    private genericService: GenericService,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

      const parameters: string [] = [];
      this.genericService.getAllByCriteria('Employee', parameters)
          .subscribe((data: Employee[]) => {
        this.employees = data;
      },
      error => console.log(error),
      () => console.log('Get all Employee complete'));

  }

  updateCols() {
    // tslint:disable-next-line:forin
    for (const index in this.cols) {
      const col = this.cols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'lastName', header: 'Last Name', headerKey: 'COMMON.LAST_NAME', type: 'user' },
            { field: 'firstName', header: 'First Name', headerKey: 'COMMON.FIRST_NAME', type: 'user' },
            { field: 'groupName', header: 'Role', headerKey: 'COMMON.ROLE' },
            { field: 'email', header: 'Email', headerKey: 'COMMON.E_MAIL', type: 'user' },
            { field: 'phone', header: 'Phone', headerKey: 'COMMON.PHONE', type: 'user' },
            { field: 'sex', header: 'Gender', headerKey: 'COMMON.GENDER', type: 'user' },
            { field: 'status', header: 'Status', headerKey: 'COMMON.STATUS', type: 'string' }
        ];

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.updateCols();
    });
  }


  ngOnDestroy() {
    this.employees = null;
  }

  edit(employeeId: number) {
      this.employeeIdEvent.emit(employeeId + '');
  }

  delete(employeeId: number) {
    try {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'employeeId': employeeId,
        }
      };
      this.router.navigate(['/admin/employeeDetails'], navigationExtras);
    } catch (e) {
      console.log(e);
    }
  }

  getStatusDesc(employee: Employee): string {
    let statusDesc = '';
    if (employee.status === 0) {
      statusDesc = 'Actif';
    } else if (employee.status === 1) {
      statusDesc = 'Inactif';
    }
    return statusDesc;
  }
 }
