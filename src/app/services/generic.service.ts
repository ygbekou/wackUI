import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import { TokenStorage } from './token.storage';
import {SelectItem} from 'primeng/api';
import { Reference, Payment, Material, ContractLabor } from '../models';
import { GenericResponse } from '../models/genericResponse';
import { Router } from '@angular/router';
import { ContactUsMessage, SectionItem, Testimony } from '../models/website';
import { SearchAttribute } from '../models/searchCriteria';

@Injectable()
export class GenericService {

  private actionUrl: string;
  private headers: Headers;
  public languages: SelectItem[];
  public testimonials: Testimony[];

  constructor(
        private http: Http,
        private router: Router,
        private token: TokenStorage
    ) {
    this.headers = new Headers();
    if (this.token.hasToken()) {
      this.headers.append('Authorization', 'Bearer ' + this.token.getToken());
    }
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    this.languages = [
            {label: 'English', value: 'en'},
            {label: 'French', value: 'fr'}
        ];

        
  }


  public getAll = (entityClass: string): Observable<any[]> => {
    const actionUrl = Constants.apiServer + '/service/' + entityClass + '/all';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  public getAllByCriteria = (entityClass: string, parameters: string[], orderBy = ''): Observable<any[]> => {

    const searchAttribute = new SearchAttribute();
    searchAttribute.parameters = parameters;
    searchAttribute.orderBy = orderBy;
    const toAdd = JSON.stringify(searchAttribute);

    const actionUrl = Constants.apiServer + '/service/' + entityClass + '/allByCriteriaAndOrderBy';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  public save = (entity: any, entityClass: string): Observable<any> => {

      let toAdd = JSON.stringify(entity);
      toAdd = toAdd.replace(/'/g, '&#039;');
      const re = /\"/gi;
      const toSend = '{"json":"' + toAdd.replace(re, '\'') + '"}';

      const actionUrl = Constants.apiServer + '/service/' + entityClass + '/save';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            if (response && response.json()) {
              const error = response.json() && response.json().error;
              if (error == null) {

              }
            }
            return response.json();
        })
        .catch(this.handleError);
   }

   public saveWithUrl = (url: string, genericObject: any): Observable<any> => {

      let toAdd = JSON.stringify(genericObject);
      toAdd = toAdd.replace(/'/g, '&#039;');
      const re = /\"/gi;
      const toSend = '{"json":"' + toAdd.replace(re, '\'') + '"}';

      const actionUrl = Constants.apiServer + url;
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }


   public saveWithFile = (entity: any, entityClass: string, formData: FormData, method: string): Observable<any> => {

      const head = new Headers();
      if (this.token.hasToken()) {
         head.append('Authorization', 'Bearer ' + this.token.getToken());
      }

      let toAdd = JSON.stringify(entity);
      toAdd = toAdd.replace(/'/g, '&#039;');
      const re = /\"/gi;
      const toSend = '{"json":"' + toAdd.replace(re, '\'') + '"}';

      formData.append('dto', new Blob([toSend],
      {
          type: 'application/json'
      }));

      const actionUrl = Constants.apiServer + '/service/' + entityClass + '/' + method;
      return this.http.post(actionUrl, formData, { headers: head })
        .map((response: Response) => {
            if (response && response.json()) {
              const error = response.json() && response.json().error;
              if (error == null) {

              }
            }
            return response.json();
        })
        .catch(this.handleError);
   }

   public getOne = (id: number, entityClass: string): Observable<any> => {

      const actionUrl = Constants.apiServer + '/service/' + entityClass + '/' + id;
      return this.http.get(actionUrl, { headers: this.headers })
        .map((response: Response) => {
            if (response && response.json()) {
              const error = response.json() && response.json().error;
              if (error == null) {

              }
            }
            return response.json();
        })
        .catch(this.handleError);
   }

  public getOneWithFiles = (id: number, entityClass: string): Observable<any> => {

    const actionUrl = Constants.apiServer + '/service/' + entityClass + '/withfiles/' + id;
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => {
          if (response && response.json()) {
            const error = response.json() && response.json().error;
            if (error == null) {

            }
          }
          return response.json();
      })
      .catch(this.handleError);
   }


   public getNewObject = (url: string, id: number): Observable<any> => {

      const actionUrl = Constants.apiServer + url + (id !== 0 ? id : '');
      return this.http.get(actionUrl, { headers: this.headers })
        .map((response: Response) => {
            if (response && response.json()) {
              const error = response.json() && response.json().error;
              if (error == null) {

              }
            }
            return response.json();
        })
        .catch(this.handleError);
   }

  public delete = (id: number, entityClass: string): Observable<GenericResponse> => {

    const actionUrl = Constants.apiServer + '/service/' + entityClass + '/delete/' + id;
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => {

          return response.json();
      })
      .catch(this.handleError);
  }

  public deleteFile = (entityClass: string, vo: Reference): Observable<GenericResponse> => {
    const head = new Headers();
      if (this.token.hasToken()) {
         head.append('Authorization', 'Bearer ' + this.token.getToken());
      }
    const toAdd = JSON.stringify(vo);
    const actionUrl = Constants.apiServer + '/service/' + entityClass + '/deletefile';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getActiveElements = (elementType: string): Observable<Reference[]> => {

      const actionUrl = Constants.apiServer + '/service/reference/' + elementType + '/all/active';
      return this.http.get(actionUrl, { headers: this.headers })
        .map((response: Response) => {
            if (response && response.json()) {
              const error = response.json() && response.json().error;
              if (error == null) {

              }
            }
            return response.json();
        })
        .catch(this.handleError);
   }


  public saveContactUsMessage = (contactUsMessage: ContactUsMessage): Observable<ContactUsMessage> => {
    const toAdd = JSON.stringify(contactUsMessage);
    const actionUrl = Constants.apiServer + '/service/ContactUsMessage/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public savePayment = (payment: Payment): Observable<Payment> => {
    const toAdd = JSON.stringify(payment);
    const actionUrl = Constants.apiServer + '/service/Payment/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveMaterial = (material: Material): Observable<Material> => {
    const toAdd = JSON.stringify(material);
    const actionUrl = Constants.apiServer + '/service/Quote/material/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveContractLabor = (contractLabor: ContractLabor, formData: FormData): Observable<ContractLabor> => {
    const head = new Headers();
    if (this.token.hasToken()) {
        head.append('Authorization', 'Bearer ' + this.token.getToken());
    }
    const toAdd = JSON.stringify(contractLabor);
    formData.append('contractLabor', new Blob([toAdd],
      {
          type: 'application/json'
      }));
    const actionUrl = Constants.apiServer + '/service/Quote/contractlabor/save';
    return this.http.post(actionUrl, formData, {headers: head})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteWithUrl = (url: string, id: number): Observable<GenericResponse> => {

    const actionUrl = Constants.apiServer + url + id;
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => {
          return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
