import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import { BedAssignment } from '../models/bedAssignment';
import { Bill } from '../models/bill';
import { DoctorAssignment } from '../models/doctorAssignment';
import { Package } from '../models/package';
import { Admission } from '../models/admission';
import { AdmissionDiagnosis } from '../models/admissionDiagnosis';
import { Prescription } from '../models/prescription';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AdmissionService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public saveAdmission = (patientAdmission : Admission): Observable<Admission> => {
    
      let toAdd = JSON.stringify(patientAdmission);
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      let actionUrl = Constants.apiServer + '/service/admission/admission/save';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }
  
   public getAdmission = (id: number): Observable<any> => {
   
      let actionUrl = Constants.apiServer + '/service/admission/admission/get/' + id;
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
  
   public getDiagnoses = (parentId: number, entity: string): Observable<AdmissionDiagnosis[]> => {
   
      let actionUrl = Constants.apiServer + '/service/' + entity + '/diagnosis/' + parentId + '/all';
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
  
  public getPrescriptions = (parentId: number, entity: string): Observable<Prescription[]> => {
   
      let actionUrl = Constants.apiServer + '/service/' + entity + '/prescription/' + parentId + '/all';
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
  
   public transferDoctor = (doctorAssignment : DoctorAssignment): Observable<DoctorAssignment> => {
    
      let toAdd = JSON.stringify(doctorAssignment);
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      let actionUrl = Constants.apiServer + '/service/admission/DOCTOR/transfer';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }
  
   public transferBed = (bedAssignment : BedAssignment): Observable<BedAssignment> => {
    
      let toAdd = JSON.stringify(bedAssignment);
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      let actionUrl = Constants.apiServer + '/service/admission/BED/transfer';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }
  
  
   public savePrescription = (prescription : Prescription): Observable<Prescription> => {
    
      let toAdd = JSON.stringify(prescription);
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      let actionUrl = Constants.apiServer + '/service/appointment/prescription/save';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }
  
   public getPrescription = (id: number): Observable<any> => {
   
      let actionUrl = Constants.apiServer + '/service/admission/prescription/get/' + id;
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
