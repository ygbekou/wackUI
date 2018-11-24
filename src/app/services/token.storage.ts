import { AuthToken } from '../models/authToken';
import { Injectable } from '@angular/core';


@Injectable()
export class TokenStorage {

  public static TOKEN_KEY = 'AuthToken';
  public static USER_GROUP_ID = 'user_group_id';

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TokenStorage.TOKEN_KEY);
    //window.sessionStorage.clear();
  }

  public saveAuthData(authData: AuthToken) {
   
    window.sessionStorage.removeItem(TokenStorage.TOKEN_KEY);
    window.sessionStorage.setItem(TokenStorage.TOKEN_KEY,  authData.token);
    
    // user data
    window.sessionStorage.removeItem(TokenStorage.USER_GROUP_ID);
    window.sessionStorage.setItem(TokenStorage.USER_GROUP_ID,  authData.authorities[0] + '');
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TokenStorage.TOKEN_KEY);
  }
  
  public hasToken(): boolean {
    return this.getToken() != '' && this.getToken() != null;
  }
  
  public getRole(): string {
    return window.sessionStorage.getItem(TokenStorage.USER_GROUP_ID);
  }
  
}