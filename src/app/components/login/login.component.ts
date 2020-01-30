import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyService } from '../../services/policy.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loader: false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService,
    private toastService: MessageService,
    private elementRef: ElementRef
  ) { }

  /*
  * @param
  * Get login form controll access
  */
  get login() { return this.loginForm.controls; }

  /*
   * @param create form
   * Create form group object for login form
   */
  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*
   * @param Login Validate
   * Validate login form with credentials
   * @input sapId and password
   */
  validateLogin() {
    if (this.loginForm.valid) {
      const postObj = {
        sapId: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      // tslint:disable-next-line: deprecation
      this.policyService.checkLogin(postObj).subscribe(user => {
        console.log(user);
        if (user) {
          const userDetails = {
            name: user.name,
            sapId: user.sapId
          };
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.router.navigate(['dashboard']);
          this.loader = false;
        }
      }, error => {
        this.loader = false;
      });
    }
  }
  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    /* Check whether login/not */
    if (!this.policyService.validUser()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
    this.createForm();
  }

}
