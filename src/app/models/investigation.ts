import { Admission } from './admission';
import { InvestigationTest } from './investigationTest';
import { Patient } from './patient';
import { LabTest } from './labTest';
import { Visit } from './visit';

export class Investigation {
  id: number;
  admission: Admission;
  visit: Visit;
  investigationDatetime: Date;
  labTest: LabTest;
  name: string;
  description: string;
  status: number;
  private _statusDesc: string;
  collectionDatetime: Date;
  collectionComments: string;
  rejectionDatetime: Date;
  rejectionComments: string;
  finalizationDatetime: Date;
  finalizationComments: string;
  
  investigationTests: InvestigationTest[] = [];
  
}