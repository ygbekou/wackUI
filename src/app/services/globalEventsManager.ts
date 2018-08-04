import { EventEmitter, Injectable} 	from "@angular/core";
import { User } 					from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class GlobalEventsManager {
    public showNavBar: EventEmitter<User> = new EventEmitter<User>();

    private moduleNameSource = new BehaviorSubject<string>("");
    private patientIdSource = new BehaviorSubject<number>(0);
    currentModuleName = this.moduleNameSource.asObservable();
    currentPatientId = this.patientIdSource.asObservable();
  
    selectedReferenceType: string;
    selectedReferenceWithCategoryType: string;
    selectedParentId: number;
    selectedAdmissionId: number;
  
    constructor() {

    }
  
    changeModuleName(moduleName: string) {
      this.moduleNameSource.next(moduleName)
    }
  
    changePatientId(patientId: number) {
      this.patientIdSource.next(patientId)
    }
}