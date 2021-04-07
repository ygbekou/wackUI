import { EventEmitter, Injectable} from '@angular/core';
import { TokenStorage } from './token.storage';
import { BehaviorSubject } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Company } from '../models';
import { GenericService } from '.';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class GlobalEventsManager {
    public showNavBar: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    public showMenu: Boolean = false;

    private moduleNameSource = new BehaviorSubject<string>('');
    private patientIdSource = new BehaviorSubject<number>(0);
    currentModuleName = this.moduleNameSource.asObservable();
    currentPatientId = this.patientIdSource.asObservable();
    currentLang = 'en';

    public DATE_FORMAT = 'MM/dd/yyyy';
    public DATE_TIME_FORMAT = 'MM/dd/yyyy HH:mm';
    public CAL_DATE_FORMAT = 'mm/dd/yy';
    public LOCALE = 'en-US';

    selectedReferenceType: string;
    selectedReferenceWithCategoryType: string;
    selectedParentId: number;
    selectedAdmissionId: number;

    company: Company = new Company();

    constructor(
        private token: TokenStorage,
        private translate: TranslateService,
        private genericService: GenericService
        ) {

      if (this.token.getToken() != null) {
        this.showMenu = true;
      }


      if (Cookie.get('lang')) {
        this.currentLang = Cookie.get('lang');
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
        this.translate.currentLang = selectLang;
        let date = new Date(Date.now() + 86400000000e3);
        document.cookie = "lang=" + selectLang + "; expires=" + date.toUTCString();
    }
}
