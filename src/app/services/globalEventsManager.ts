import { EventEmitter, Injectable} from '@angular/core';
import { TokenStorage } from './token.storage';
import { BehaviorSubject } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Company } from '../models';
import { GenericService } from '.';

@Injectable()
export class GlobalEventsManager {
    public showNavBar: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    public showMenu: Boolean = false;

    private moduleNameSource = new BehaviorSubject<string>('');
    private patientIdSource = new BehaviorSubject<number>(0);
    currentModuleName = this.moduleNameSource.asObservable();
    currentPatientId = this.patientIdSource.asObservable();
    currentLang = 'en';

    selectedReferenceType: string;
    selectedReferenceWithCategoryType: string;
    selectedParentId: number;
    selectedAdmissionId: number;

    companyEmitter: EventEmitter<Company> = new EventEmitter<Company>();

    constructor(
        private token: TokenStorage,
        private translate: TranslateService,
        private genericService: GenericService
        ) {

      if (this.token.getToken() != null) {
        this.showMenu = true;
      }

    }

    changeModuleName(moduleName: string) {
      this.moduleNameSource.next(moduleName);
    }

    changePatientId(patientId: number) {
      this.patientIdSource.next(patientId);
    }

    changeLanguage(selectLang: string) {
        this.currentLang = selectLang;
        this.translate.use(selectLang);
    }
}
