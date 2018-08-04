import { Floor } from './floor';

export class Room {
  id: number;
  name: string;
  description: string;
  status: number;
  floor: Floor;
}