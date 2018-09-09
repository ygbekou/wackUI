import { LabTest } from './labTest';

export class InvestigationTest {
  id: number;
  labTest: LabTest;
  resultDatetime: Date;
  resultComments: string;
  dispatchDatetime: Date;
  dispatchComments: string;
  result: string;
  interpretation: string;
  impression: string;
  
  name: string;
  labTestName: string
}