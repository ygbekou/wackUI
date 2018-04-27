import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import { ScheduleEvent } from '../models/scheduleEvent';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AppointmentService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getAppointments = (departmentId: number, doctorId: number): Observable<ScheduleEvent[]> => {
    this.actionUrl = Constants.apiServer + '/service/appointment/department/' + departmentId + '/doctor/' + doctorId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ScheduleEvent>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
