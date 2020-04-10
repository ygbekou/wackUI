import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { GenericService, TokenStorage } from '../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Employee } from '../models/employee';
import { BaseComponent } from './website/baseComponent';

@Component({
  selector: 'app-employee-list',
  templateUrl: '../pages/employeeList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class EmployeeList extends BaseComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  cols: any[];
  @Output() employeeIdEvent = new EventEmitter<string>();

  constructor
    (
    public genericService: GenericService,
		public confirmationService: ConfirmationService,
		public translate: TranslateService,
		public tokenStorage: TokenStorage,
    ) {

      super(genericService, translate, confirmationService, tokenStorage);
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
