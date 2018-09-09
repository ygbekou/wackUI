import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import { Investigation } from '../models/investigation';
import { InvestigationTest } from '../models/investigationTest';
import { Package } from '../models/package';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class InvestigationService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public saveInvestigaton = (investigation : Investigation): Observable<Investigation> => {
    
      let toAdd = JSON.stringify(investigation);
      let re = /\"/gi;
      let toSend = '{"json":"' + toAdd.replace(re, "'") + '"}';
      
      let actionUrl = Constants.apiServer + '/service/laboratory/investigation/save';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
   }
  
   public saveInvestigatonTests = (investigationTests : InvestigationTest[]): Observable<string> => {
    
      let toSend = JSON.stringify(investigationTests);
      
      let actionUrl = Constants.apiServer + '/service/laboratory/investigationTest/list/save';
      return this.http.post(actionUrl, toSend, { headers: this.headers })
        .map((response: Response) => {
            return response.json().response;
        })
        .catch(this.handleError);
   }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
