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
  benchEmployeeListAPI = 'http://10.117.189.28:8087/benchresources/managers/employees';
  resourceList = 'http://10.117.189.28:8087/benchresources/managers';
  getEmployeeSkillsAPI = 'http://10.117.189.28:8087/benchresources/managers/getSkillBySapId';
  getAllSkillsAPI = 'http://10.117.189.28:8087/benchresources/skills';
  getSelectedSkill = 'http://10.117.189.28:8087/benchresources/managers/getData';

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
   * @param sapId
   * Show list of bench employees under specific resource manager
   * Post Method
   * Type object
   */
  showBenchEmployees(data): Observable<any> {
    this.showAlert = {};
    return this.http.post(this.benchEmployeeListAPI, data, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
 * @param sapId
 * Get Employee skills for specific employee
 * GET Method
 * Type Number
 */
  getEmployeeSkills(sapId: number): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.getEmployeeSkillsAPI + '/' + sapId).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
   * @param Skill Id
   * Get Skill list displaying in chart
   * GET Method
   * Type Number
   */
  resourceChart(skill: number): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.resourceList + '?' + 'skillId=' + skill).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }
  /*
   * @param no param
   * Get all dynamic skills
   * GET Method
   * Type array of objects
   */
  getAllSkills(): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.getAllSkillsAPI).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
  * @param Skill id and Sap id
  * Get skill details for specific employee
  * GET Method
  * Type Object
  */
  getSelectedSkillRecords(data): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.getSelectedSkill + '/' + data.skillId + '/' + data.sapId, this.httpOptions).pipe(
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
