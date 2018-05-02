import { Routes, RouterModule} from '@angular/router';
import { NgModule} from '@angular/core';
import { AdminMain} from '../components/adminMain';
import { DepartmentDetails } from '../components/departmentDetails';
import { DepartmentList } from '../components/departmentList';
import { DocumentDetails } from '../components/documentDetails';
import { DocumentList } from '../components/documentList';
import { ScheduleDetails } from '../components/scheduleDetails';
import { ScheduleList } from '../components/scheduleList';
import { AppointmentDetails } from '../components/appointmentDetails';
import { EmployeeDetails } from '../components/employeeDetails';
import { EmployeeList } from '../components/employeeList';
import { AdminMenu} from '../components/menu/adminMenu';
import { CommonSharedModule} from './common.shared.module';
import { FileUploader} from '../components/fileUploader';
import { PatientDetails } from '../components/patientDetails';
import { PatientList } from '../components/patientList';
import { CaseStudyDetails } from '../components/caseStudyDetails';
import { CaseStudyList } from '../components/caseStudyList';
import { ReferenceDetails } from '../components/referenceDetails';
import { ReferenceList } from '../components/referenceList';
import { MedicineDetails } from '../components/medicineDetails';
import { MedicineList } from '../components/medicineList';
import { PrescriptionDetails } from '../components/prescriptionDetails';
import { PrescriptionList } from '../components/prescriptionList';
 
const routes: Routes = [
  {path: 'adminMain', component: AdminMain},
  {path: 'departmentDetails', component: DepartmentDetails},
  {path: 'departmentList', component: DepartmentList},
  {path: 'employeeDetails', component: EmployeeDetails},
  {path: 'employeeList', component: EmployeeList},
  {path: 'patientDetails', component: PatientDetails},
  {path: 'patientList', component: PatientList},
  {path: 'documentDetails', component: DocumentDetails},
  {path: 'documentList', component: DocumentList},
  {path: 'scheduleDetails', component: ScheduleDetails},
  {path: 'scheduleList', component: ScheduleList},
  {path: 'appointmentDetails', component: AppointmentDetails},
  {path: 'caseStudyDetails', component: CaseStudyDetails},
  {path: 'caseStudyList', component: CaseStudyList},
  {path: 'referenceDetails', component: ReferenceDetails},
  {path: 'referenceList', component: ReferenceList},
  {path: 'medicineDetails', component: MedicineDetails},
  {path: 'medicineList', component: MedicineList},
  {path: 'prescriptionDetails', component: PrescriptionDetails},
  {path: 'prescriptionList', component: PrescriptionList}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), CommonSharedModule
  ],

  exports: [CommonSharedModule],

  declarations: [FileUploader, AdminMenu, AdminMain, DepartmentDetails, DepartmentList, 
              DocumentDetails, DocumentList, EmployeeDetails, EmployeeList, PatientDetails, PatientList,
            ScheduleDetails, ScheduleList, AppointmentDetails, CaseStudyDetails, CaseStudyList, 
            ReferenceDetails, ReferenceList, MedicineDetails, MedicineList, PrescriptionDetails, PrescriptionList],

  providers: [DepartmentDetails]
})

export class AdminModule {}