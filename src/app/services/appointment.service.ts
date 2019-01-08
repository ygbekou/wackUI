import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import { SearchCriteria, Appointment } from '../models';
import { ScheduleEvent } from '../models/scheduleEvent';
import { TokenStorage } from './token.storage';

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

   public getScheduleAndAppointments = (searchCriteria: SearchCriteria): Observable<ScheduleEvent[]> => {

      const toSend = JSON.stringify(searchCriteria);

      const actionUrl = Constants.apiServer + '/service/appointment/scheduleAndAppointments';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }

   public getByMonths = (): Observable<any[]> => {

        const actionUrl = Constants.apiServer + '/service/appointment/list/byMonth';
        return this.http.get(actionUrl, {headers: this.headers})
        .map((response: Response) => <any[]>response.json())
        .catch(this.handleError);
   }

   public getUpomings = (): Observable<any[]> => {

        const actionUrl = Constants.apiServer + '/service/appointment/list/upcomings';
        return this.http.get(actionUrl, {headers: this.headers})
        .map((response: Response) => <any[]>response.json())
        .catch(this.handleError);
   }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
