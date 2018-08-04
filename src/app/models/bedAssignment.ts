import { Bed } from './bed';
import { Floor } from './floor';
import { Reference } from './reference';
import { Room } from './room';

export class BedAssignment {
  id: number;
  bed: Bed;
  startDate: Date;
  endDate: Date;
  
  transferBed: Bed;
  transferDate: Date;
}