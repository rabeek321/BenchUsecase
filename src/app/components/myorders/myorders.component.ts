import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  loader = false;
  myOrdersList;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService,
    private toastService: MessageService,
    private elementRef: ElementRef
  ) { }

  showMyOrders() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    const customerId = user ? user.userId : null;
    this.policyService.showAlert = {};
    this.loader = true;
    // const user = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
    this.policyService.showMyOrders(customerId).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.myOrdersList = res;
    },
      error => {
        this.loader = false;
      });
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
        this.router.navigate(['/myorders']);
      } else {
        this.router.navigate(['/transaction']);
      }
    }
    this.showMyOrders();
  }

}
