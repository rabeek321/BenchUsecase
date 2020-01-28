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

  /*  Access to Login form fields */
  get login() { return this.loginForm.controls; }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  validateLogin() {
    if (this.loginForm.valid) {
      const postObj = {
        customerEmail: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      // tslint:disable-next-line: deprecation
      this.policyService.checkLogin(postObj).subscribe(user => {
        console.log(user);
        if (user) {
          const userDetails = {
            username: this.loginForm.value.customerEmail,
            customerName: user.customerName,
            userId: user.customerID,
            loginType: 'shopping'
          };
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.router.navigate(['search']);
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
