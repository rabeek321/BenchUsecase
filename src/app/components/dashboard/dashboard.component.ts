import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyService } from '../../services/policy.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loader:boolean = false;
  display:boolean = false;
  empAnalysisList;
  empList;
  data: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService,
    private toastService: MessageService,
    private elementRef: ElementRef
  ) { 
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };
  }
  getOverAllTrends(sapId, skillId) {
    this.policyService.getEmployeeStatistics(sapId,skillId).subscribe(res => {
      console.log(res);
      this.empAnalysisList = res.policyTrendList;
      const percentage: any[] = [];
      const label: any[] = [];
      const count: any[] = [];
      this.empAnalysisList.forEach(element => {
        percentage.push(element.percentage);
        label.push(element.policyName + '(' + element.count + ')');
        count.push(element.count);
      });
      // console.log(this.trendAnalysisList)
      this.data = {
        labels: label,
        datasets: [
          {
            data: percentage,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ]
          }]
      };
    },
      error => {
        this.loader = false;
      });
  }

  getBenchResources() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    const customerId = user ? user.sapId : null;
    this.policyService.showAlert = {};
    this.loader = true;
    // const user = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
    this.policyService.showBenchEmployees(customerId).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.empList = res;
    },
      error => {
        this.loader = false;
      });
  }

  viewEmpStatistics(sapID:number) {
    this.display = true;
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
    this.getBenchResources();
  }

}
