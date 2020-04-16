import { Employee, Reference } from './';

export class SearchCriteria {
  id: number;
  lastName: string;
  firstName: string;
  birthDate: Date;
  doctor: Employee;
  medicalRecordNumber: string;
  visitId: number;
  admissionId: number;
  visitDate: Date;
  admissionDate: Date;
  supplier: Reference;
  requestor: Reference;
  shipTo: Reference;
  purchaseOrderDate: Date;
  topN: number;
  investigationDate: Date;
  investigationDateStart: string;
  investigationDateEnd: string;

}


export class SearchAttribute {
	parameters: string[];
	orderBy: string;
}