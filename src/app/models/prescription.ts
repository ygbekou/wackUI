import { Admission } from './admission';
import { Appointment } from './appointment';
import { Patient } from './patient';
import { Diagnosis } from './diagnosis';
import { PrescriptionDiagnosis } from './prescriptionDiagnosis';
import { PrescriptionMedicine } from './prescriptionMedicine';

export class Prescription {
  id: number;
  admission: Admission;
  prescriptionType: number;
  prescriptionDatetime: Date;
  notes: string;
  status: number;
  
  prescriptionMedicines: PrescriptionMedicine[] = [];
  prescriptionDiagnoses: PrescriptionDiagnosis[] = [];
}