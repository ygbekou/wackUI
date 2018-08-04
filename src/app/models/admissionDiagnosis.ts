import { Admission } from './admission';
import { Diagnosis } from './diagnosis';

export class AdmissionDiagnosis {
  admission: Admission;
  diagnosis: Diagnosis;
  instructions: string;
  
  constructor() {
    this.diagnosis = new Diagnosis();
  }
}