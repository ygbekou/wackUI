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
        let date = new Date(Date.now() + 86400000000e3);
        document.cookie = "lang=" + selectLang + "; expires=" + date.toUTCString();
        //Cookie.set('lang', selectLang, (20 * 365 * 24 * 60 * 60));
        console.log('setting the language to: ' + selectLang);
        console.log('language in cookie=' + Cookie.get('lang'));
        //window.location.reload();
    }
}
