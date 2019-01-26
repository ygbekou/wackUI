import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import {User} from '../models/user';
import {Constants} from '../app.constants';
import { UserGroup } from '../models/userGroup';
import { TokenStorage } from './token.storage';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class UserService {

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

  public getById = (user: User): Observable<User> => {
    this.actionUrl = Constants.apiServer + '/service/user/user/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<User[]> => {
    this.actionUrl = Constants.apiServer + '/service/user/getUsers';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <User[]>response.json())
      .catch(this.handleError);
  }

  public search = (searchText: string): Observable<User[]> => {
    const toAdd = JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + '/service/user/findPeople';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  }

  public getUsersForRole = (role: number): Observable<User[]> => {
    const toAdd = JSON.stringify(role);
    const actionUrl = Constants.apiServer + '/service/user/getUsersForRole';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  }

  public login = (user: User): Observable<Boolean> => {
    const toAdd = JSON.stringify(user);
    // let actionUrl = Constants.apiServer + '/service/user/login/login';
    const actionUrl = Constants.apiServer + '/service/token/generate-token';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        if (response && response.json()) {
          // tslint:disable-next-line:no-console
          console.info(response.json());
          user = response.json();
          if (user.id > 0) {
            Cookie.set('user', JSON.stringify(response.json()));
            return true;
          }
        } else {
          return false;
        }
      }

      )
      .catch(
      this.handleError
      );
  }

  public saveUser = (user: User): Observable<User> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + '/service/user/saveUser';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveUserWithoutPicture = (entityClass: string, entity: any): Observable<any> => {
    const toAdd = JSON.stringify(entity);
    const re = /\"/gi;
    const toSend = '{"json":"' + toAdd.replace(re, '\'') + '"}';

    const actionUrl = Constants.apiServer + '/service/user/' + entityClass + '/saveWithoutPicture';
    return this.http.post(actionUrl, toSend, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public saveUserWithPicture = (entityClass: string, entity: any, formData: FormData): Observable<any> => {

      const head = new Headers();
      if (this.token.hasToken()) {
        head.append('Authorization', 'Bearer ' + this.token.getToken());
      }
      const toAdd = JSON.stringify(entity);
      const re = /\"/gi;
      const toSend = '{"json":"' + toAdd.replace(re, '\'') + '"}';

      formData.append('dto', new Blob([toSend],
      {
          type: 'application/json'
      }));

      const actionUrl = Constants.apiServer + '/service/user/' + entityClass + '/save';
      return this.http.post(actionUrl, formData, { headers: head })
        .map((response: Response) => {
            if (response && response.json()) {
              const error = response.json() && response.json().error;
              if (error == null) {
                // Cookie.set('user', JSON.stringify(response.json()));
              }
            }
            return response.json();
        })
        .catch(this.handleError);
   }

  public sendPassword = (user: User): Observable<Boolean> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + '/service/user/forgot/sendPassword';

    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {

        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
