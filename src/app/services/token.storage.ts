import { AuthToken } from '../models/authToken';
import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const USER_GROUP_ID = 'user_group_id';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveAuthData(authData: AuthToken) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  authData.token);
    
    // user data
    window.sessionStorage.removeItem(USER_GROUP_ID);
    window.sessionStorage.setItem(USER_GROUP_ID,  authData.authorities[0] + '');
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  
  public getRole(): string {
    return window.sessionStorage.getItem(USER_GROUP_ID);
  }
  
}