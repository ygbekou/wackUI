import { Admission } from './admission';
import { Visit } from './visit';
import { Employee } from './employee';
import { Reference } from './reference';

export class Discharge {
  
  id: number;
  admission: Admission;
  visit: Visit;
  doctor: Employee;
  dischargeReason: Reference;
  dischargeDatetime: Date;
  admittanceReason: string;
  treatmentSummary: string;
  physicianApproved: string;
  furtherTreatmentPlan: string;
  nextCheckupDate: Date;
  clientConsentApproval: string;
  notes: string;
  
  constructor() {
    this.dischargeReason = new Reference();
  }
  
}