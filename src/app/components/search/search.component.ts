import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  buyProductForm: FormGroup;
  loader = false;
  buyProduct = false;
  productID: number;
  productList;
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
      product: ['', Validators.required]
    });
  }
  /*  Access to Login form fields */
  get product() { return this.buyProductForm.controls; }

  createProductForm() {
    this.buyProductForm = this.fb.group({
      quantity: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }
  searchProducts() {
    this.policyService.showAlert = {};
    this.loader = true;
    const productName = this.searchForm.value.product;
    // const user = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
    this.policyService.showProducts(productName).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.productList = res;
    },
      error => {
        this.loader = false;
      });
  }

  buyNow(productId: number) {
    this.productID = productId;
    this.buyProductForm.reset();
    this.buyProduct = true;
  }

  sendOTP() {
    this.loader = true;
    const otpDetails = {
      customerId: JSON.parse(sessionStorage.getItem('currentUser')).userId
    };
    this.policyService.sendOTP(otpDetails).subscribe(res => {
      console.log(res);
      this.loader = false;
      Swal.fire({
        icon: 'success',
        title: 'OTP has been send to your mail id',
        showConfirmButton: false,
        timer: 3000
      });
    },
      error => {
        this.loader = false;
      });
  }

  submitProduct() {
    this.loader = true;
    const user = JSON.parse(sessionStorage.getItem('currentUser')).userId;
    const buyDetails = {
      productQuantity: this.buyProductForm.value.quantity,
      cardNumber: this.buyProductForm.value.cardNumber,
      cvv: this.buyProductForm.value.cvv,
      otp: this.buyProductForm.value.otp,
      productId: this.productID,
      customerId: user
    };
    this.policyService.buyProducts(buyDetails).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.buyProductForm.reset();
      this.buyProduct = false;
      Swal.fire({
        icon: 'success',
        title: 'Order placed successfully',
        showConfirmButton: false,
        timer: 3000
      });
      this.searchProducts();
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
        this.router.navigate(['/search']);
      } else {
        this.router.navigate(['/transaction']);
      }
    }
    this.createForm();
    this.createProductForm();
  }

}
