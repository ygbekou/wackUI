import { Appointment } from './appointment';
import { Patient } from './patient';
import { PrescriptionDiagnosis } from './prescriptionDiagnosis';
import { PrescriptionMedicine } from './prescriptionMedicine';

export class Prescription {
  id: number;
  patient: Patient;
  appointment: Appointment;
  weight: number;
  bloodPressure: string;
  reference: string;
  prescriptionType: number;
  prescriptionDate: Date;
  chiefComplain: string;
  visitingFees: number;
  patientNotes: string;
  status: number;
  
  prescriptionMedicines: PrescriptionMedicine[] = [];
  prescriptionDiagnoses: PrescriptionDiagnosis[] = [];
}