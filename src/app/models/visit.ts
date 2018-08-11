import { Employee } from './Employee';
import { GivenVaccine } from './givenVaccine';
import { Patient } from './patient';
import { Reference } from './reference';
import { VitalSign } from './vitalSign';

export class Visit {
  id: number;
  visitNumber: string;
  chiefOfComplain: string;
  patient: Patient;
  visitDatetime: Date = new Date();
  status: number;
  
  vitalSign: VitalSign;
  selectedAllergies: Reference[];
  selectedSymptoms: Reference[];
  selectedMedicalHistories: Reference[];
  selectedSocialHistories: Reference[];
  givenVaccines: GivenVaccine[] = [];
  
  constructor() {
    this.vitalSign = new VitalSign(); 
    this.selectedAllergies = [];
    this.selectedSymptoms = [];
    this.selectedMedicalHistories = [];
    this.selectedSocialHistories = [];
    this.givenVaccines = [];
  }
  
}