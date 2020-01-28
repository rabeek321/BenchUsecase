import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  showAlert = {};
  registrationAPI = 'http://10.117.189.62:8087/bank/cards';
  loginAPI = 'http://10.117.189.62:8087/bank/customers/login';
  searchAPI = 'http://10.117.189.62:8065/ecommerce/products';
  myOrdersAPI = 'http://10.117.189.62:8065/ecommerce/customerorders';
  buyProductAPI = 'http://10.117.189.62:8065/ecommerce/products';
  searchTransactionAPI = 'http://10.117.189.62:8087/bank/transactions';
  sendOTPAPI = 'http://10.117.189.62:8065/ecommerce/otp';
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
  * Registration API
  * POST Method
  * Type Object
  */
  postUsersData(data): Observable<any> {
    this.showAlert = {};
    return this.http.post(this.registrationAPI, data, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

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
  showProducts(productName: string): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.searchAPI + '?productName=' + productName).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
    * @param customerId
    * Show My Order History
    * GET Method
    * Type Number
    */
  showMyOrders(customerId: number): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.myOrdersAPI + '/' + customerId).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
    * @param data
    * Product BUY NOW Api call
    * POST Method
    * Type Object
    */
  buyProducts(data): Observable<any> {
    this.showAlert = {};
    return this.http.post(this.buyProductAPI, data, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
    * @param creditId,month,year
    * Search Transactions based on month and year
    * GET Method
    */
  postsearchData(creditId: number, month: number, year: number): Observable<any> {
    this.showAlert = {};
    return this.http.get(this.searchTransactionAPI + '?creditCardId=' + creditId + '&month=' + month + '&year=' + year).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
   * @param data:object
   * Send OTP API Call
   * POST Method
   */
  sendOTP(data): Observable<any> {
    this.showAlert = {};
    return this.http.post(this.sendOTPAPI, data, this.httpOptions).pipe(
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
