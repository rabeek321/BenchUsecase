import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loader = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService,
    private toastService: MessageService,
    private elementRef: ElementRef
  ) { }

  /* Registration Form creation */
  createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dob: ['', [Validators.required, this.checkDobValidation]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(50000)]],
      profession: ['', Validators.required],
      creditLimit: ['', Validators.required]
    });
  }

  /*  Get Access to all form fields */
  get register() {
    return this.registerForm.controls;
  }

  /* Sign up action */
  signUp() {
    if (this.registerForm.valid) {
      const registerFormObj = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        mobile: this.registerForm.value.mobileNumber,
        dateOfBirth: this.registerForm.value.dob,
        gender: this.registerForm.value.gender,
        customerEmail: this.registerForm.value.email,
        salary: this.registerForm.value.amount,
        profession: this.registerForm.value.profession,
        cardBalance: this.registerForm.value.creditLimit
      };
      this.policyService.postUsersData(registerFormObj).subscribe(res => {
        console.log(res);
        // this.policyService = res;
        Swal.fire({
          icon: 'success',
          // tslint:disable-next-line: max-line-length
          title: 'Your credit card application has been approved and ready to use. <br/> Your User Name: ' + this.registerForm.value.email + ' <br/> Your Password id: ' + res.password,
          showConfirmButton: false,
          timer: 3000
        });
        this.registerForm.reset();
      }, error => {
      });
    }
  }

  /* validate dob is 18years above or not */
  checkDobValidation(c: FormControl) {
    const today = new Date();
    const birthDate = new Date(c.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 23 ? null : {
      checkDobValidation: {
        valid: false
      }
    };
  }

  /*Numeric Validation */

  numericOnly(event): boolean {
    const patt = /^([0-9])$/;
    const result = patt.test(event.key);
    return result;
  }

  validateLimit(event): void {
    if (this.registerForm.value.amount !== '') {
      const limt = (event.target.value * 10 / 100);
      this.registerForm.patchValue({ creditLimit: limt });
    } else {
      this.registerForm.patchValue({ creditLimit: '' });
    }
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    // tslint:disable-next-line: max-line-length
    // this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    this.createForm();
  }

}
