import { User } from '../models';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import {Constants} from '../app.constants';
import {Http, Response, Headers} from '@angular/http';

@Injectable()
export class AuthenticationService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public attemptAuth = (user: User): Observable<any> => {
    let toAdd = JSON.stringify(user);
    let actionUrl = Constants.apiServer + '/service/token/generate-token';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        if (response) {
          console.info(response.json())
          return response.json();
         
        } else {
          return null;
        }
      }

      )
      .catch(
      this.handleError
      );
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }
}
