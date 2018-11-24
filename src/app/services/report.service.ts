import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Report, Parameter, ReportView, ReportCategory } from '../models';
import { Constants } from '../app.constants';
import { TokenStorage } from './token.storage';
import { TreeModule, TreeNode } from 'primeng/primeng';

@Injectable()
export class ReportService { 
  
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
  
   public getById = (id : number): Observable<Report> => {    
    this.actionUrl = Constants.apiServer + '/service/report/report/' + id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Report>response.json())
      .catch(this.handleError);
  }
  
  public runReport = (reportView : ReportView): Observable<ReportView> => {
      let toAdd = JSON.stringify(reportView);

    let actionUrl = Constants.apiServer + '/service/report/printReport';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
    
   }
  
  public getActiveReports = (): Observable<Report[]> => {    
    this.actionUrl = Constants.apiServer + '/service/report/getActiveReports';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Report[]> response.json())
      .catch(this.handleError);
  }
  
   public getActiveReportsWithCategory = (): Observable<TreeNode[]> => {    
    this.actionUrl = Constants.apiServer + '/service/report/getActiveReportsWithCategory';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <TreeNode[]> response.json())
      .catch(this.handleError);
    
  }
  
  public getParametersByReport = (report : Report): Observable<Parameter[]> => {    
    this.actionUrl = Constants.apiServer + '/service/report/getParameters/' + report.id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Parameter[]>response.json())
      .catch(this.handleError);
  }
  
   public getParameterNamesByReport = (report : Report): Observable<Parameter[]> => {    
    this.actionUrl = Constants.apiServer + '/service/report/getParameters/' + report.id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Parameter[]>response.json())
      .catch(this.handleError);
  }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
