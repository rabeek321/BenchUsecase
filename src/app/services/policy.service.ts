import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  showAlert = {};
  loginAPI = 'http://10.117.189.28:8087/benchresources/managers/login';
  benchEmployeeListAPI = 'http://10.117.189.28:8087/benchresources/managers';
  constructor(private http: HttpClient) {
  }

  /* Http Headers */
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  /*
  * @param data
  * Validate Login API
  * POST Method
  * Type Object
  */
  checkLogin(data): Observable<any> {
    this.showAlert = {};
    return this.http.post(this.loginAPI, data, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
   * @param productName
   * Search E-Commerce Products
   * GET Method
   * Type String
   */
  showBenchEmployees(sapId: number): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.benchEmployeeListAPI + '/' + sapId + '/employees').pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
   * @param productName
   * Search E-Commerce Products
   * GET Method
   * Type String
   */
  skillList(sapId: number): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.benchEmployeeListAPI + '/' + sapId + '/employees').pipe(
      catchError(this.errorHandler.bind(this))
    );
  }


  
  /*
   * @param productName
   * Search E-Commerce Products
   * GET Method
   * Type String
   */
  resourceChart(skill:string): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.benchEmployeeListAPI + '?' + 'skillName=' + skill).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
   * @param error
   * Error Handling
   */
  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      /* Get client-side error */
      errorMessage = error.error.message;
    } else {
      /* Get server-side error */
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(error.error.message);
    this.showAlert = this.modalConfig(error.error.message ? error.error.message : 'Network Error', true);
    return throwError(errorMessage);
  }

  /*
   * @param No Param
   * Check user is valid or not
   * Type boolean
   */
  public validUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * @param message, modal
   * Set Modal Properties
   */
  public modalConfig(mesg, modal) {
    return {
      // header: head,
      message: mesg,
      modalShow: modal
    };
  }
}
