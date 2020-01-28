import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  searchForm: FormGroup;
  loader = false;
  searchList;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService,
    private toastService: MessageService,
    private elementRef: ElementRef
  ) { }
  /*  Access to Login form fields */
  get search() { return this.searchForm.controls; }

  createForm() {
    this.searchForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  searchTransaction() {
    if (this.searchForm.valid) {
      const cretidCardId = JSON.parse(sessionStorage.getItem('currentUser'));
      const month = this.searchForm.value.month;
      const year = this.searchForm.value.year;
      this.policyService.postsearchData(cretidCardId.creditCardId, month, year).subscribe(res => {
        console.log(res);
        if (res.transactionList.length) {
          this.searchForm.reset();
          this.searchList = res;
        } else {
          this.searchList = {};
          Swal.fire({
            icon: 'error',
            // tslint:disable-next-line: max-line-length
            title: 'No Transaction Found',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }, error => {
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
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      if (user.loginType === 'shopping') {
        this.router.navigate(['/search']);
      } else {
        this.router.navigate(['/transaction']);
      }
    }
    this.createForm();
  }

}
