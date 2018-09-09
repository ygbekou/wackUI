import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import {Country} from '../models/country';
import { Reference } from '../models/reference';
import {User} from '../models/user';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {SelectItem} from 'primeng/api';

@Injectable()
export class GenericService {

  private actionUrl: string;
  private headers: Headers;
  
  public bloodGroups: SelectItem[];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    
    this.bloodGroups = [
            {label: 'A+', value: 'A+'},
            {label: 'A-', value: 'A-'},
            {label: 'B+', value: 'B+'},
            {label: 'B-', value: 'B-'},
            {label: 'O+', value: 'O+'},
            {label: 'O-', value: 'O-'},
            {label: 'AB+', value: 'AB+'},
            {label: 'AB-', value: 'AB-'}
        ];
  }

  public getAllCountries = (): Observable<Country[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllCountries';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Country[]>response.json())
      .catch(this.handleError);
  }
  
  public getAll = (entityClass: string): Observable<any[]> => {
    let actionUrl = Constants.apiServer + '/service/' + entityClass + '/all';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }
  
  public getAllByCriteria = (entityClass: string, parameters: string []): Observable<any[]> => {
    let toAdd = JSON.stringify(parameters);
    
    let actionUrl = Constants.apiServer + '/service/' + entityClass + '/allByCriteria';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }
  
  
  public save = (entity: any, entityClass: string): Observable<any> => {
   
      let toAdd = JSON.stringify(entity);
      alert(toAdd)
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      let actionUrl = Constants.apiServer + '/service/' + entityClass + '/save';
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
  
  public saveDoctorOrder = (entity: any): Observable<any> => {
   
      let toAdd = JSON.stringify(entity);
      alert(toAdd)
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      let actionUrl = Constants.apiServer + '/service/DoctorOrder/saveDoctorOrder';
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
  
  
   public saveWithFile = (entity: any, entityClass: string, formData: FormData): Observable<any> => {
   
      let head = new Headers();
     
      let toAdd = JSON.stringify(entity);
      alert(toAdd)
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      formData.append('dto', new Blob([toSend],
      {
          type: "application/json"
      }));
     
      let actionUrl = Constants.apiServer + '/service/' + entityClass + '/saveWithFile';
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
   
      let actionUrl = Constants.apiServer + '/service/' + entityClass + '/' + id;
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
  
    public delete = (id: number, entityClass: string): Observable<any> => {
     
        let toDelete = JSON.stringify(id);
        let re = /\"/gi;
        let toSend = '{"json":"' + toDelete.replace(re, "'") + '"}';
        
        let actionUrl = Constants.apiServer + '/service/' + entityClass + '/delete';
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

  
  public uploadFileWithFormData = (formData: FormData): Observable<any> => {
      
      let head = new Headers();
   ///head.append('Content-Type', 'multipart/form-data' );
   //head.append('Accept', 'application/json');
    
      let actionUrl = Constants.apiServer + '/service/fileUploader/uploadFile';
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
  
  public getActiveElements = (elementType: string): Observable<Reference[]> => {
   
      let actionUrl = Constants.apiServer + '/service/reference/' + elementType + '/all/active';
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
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
