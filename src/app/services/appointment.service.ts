import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import { SearchCriteria } from '../models';
import { Prescription } from '../models/prescription';
import { ScheduleEvent } from '../models/scheduleEvent';
import { TokenStorage } from './token.storage';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AppointmentService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http, private token: TokenStorage) {
    this.headers = new Headers();
    if (this.token.hasToken()) {
      this.headers.append('Authorization', 'Bearer ' + this.token.getToken());
    }
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

   public getScheduleAndAppointments = (searchCriteria : SearchCriteria): Observable<ScheduleEvent[]> => {
    
      let toSend = JSON.stringify(searchCriteria);
      
      let actionUrl = Constants.apiServer + '/service/appointment/scheduleAndAppointments';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
