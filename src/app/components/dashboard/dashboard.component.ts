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

  dashboarddata: any;
  data: any;
  skillChartData: any;
  loader = false;
  display = false;
  overallChart = false;

  empList;
  trendAnalysisList;
  skillsList;
  skillLevel: string[];
  skillCount: number[];
  skillId: number;
  skillStatistics: string[] = [];
  selectedSapId: number;
  skillData;
  skillDetailsChart = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private policyService: PolicyService,
    private toastService: MessageService,
    private elementRef: ElementRef,

  ) { }
/*
   * @param list out bench resources
   * Get all bench resources under logged in managers
   * @input sapId
   * @response Employee list
   */
  getBenchResources() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    const customerId = user ? user.sapId : null;
    this.policyService.showAlert = {};
    this.loader = true;
    const postObj = {
      sapId: customerId
    };
    this.policyService.showBenchEmployees(postObj).subscribe(res => {
      this.loader = false;
      this.empList = res;
    },
      error => {
        this.loader = false;
      });
  }

  /*
   * @param list of skills
   * Get all dynamic skills
   * @response Skills list
   */
  getAllSkills() {
    this.loader = true;
    this.policyService.getAllSkills().subscribe(res => {
      this.loader = false;
      this.skillsList = res;
    },
      error => {
        this.loader = false;
      });
  }

   /*
   * @param View emplolyee statistics
   * display employee skills on chart
   * @response list of skills belongs to particular employee
   */
  viewEmpStatistics(sapId: number) {
    this.display = true;
    this.skillDetailsChart = false;
    this.selectedSapId = sapId;
    this.policyService.getEmployeeSkills(sapId).subscribe(res => {
      console.log(res);
      this.trendAnalysisList = res.skillDto;
      const percentage: any[] = [];
      const label: any[] = [];
      this.trendAnalysisList.forEach(element => {
        percentage.push(element.skillRating);
        label.push(element.skillName);
        this.skillStatistics.push(element.skillId);
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

  selectData(event) {
    const selectedSkillId = this.skillStatistics[event.element._index];
    this.showSkillChartData(selectedSkillId);
  }
  showSkillChartData(selectedSkillId) {
    const PostObj = {
     sapId: this.selectedSapId,
     skillId: selectedSkillId
   };
    this.loader = true;
    this.policyService.getSelectedSkillRecords(PostObj).subscribe(res => {
     console.log(res);
     this.loader = false;
     this.skillDetailsChart = true;
     this.skillData = res;
     this.skillChartData = {
       // tslint:disable-next-line: max-line-length
      labels:  Object.keys(res),
      datasets: [
        {
            label: 'Skill Score',
            backgroundColor: '#fd7e14',
            borderColor: '#6610f2',
            data: Object.values(res)
        }
    ]
      };
   },
     error => {
       this.loader = false;
     });

 }
  skillSubmit(value) {
    if (value.value !== '') {
      this.overallChart = true;
      this.skillId = value.value;
      this.policyService.resourceChart(value.value).subscribe(
        (response) => {
          const knowledgeLevel = response.resourseList[0].skillKnowledge;
          this.skillLevel = knowledgeLevel.map(skill => skill.skillKowledgeLevel + '(' + skill.skillKnowledgeCount + ')');
          this.skillCount = knowledgeLevel.map(skill => skill.skillKnowledgeCount);
          this.dashboarddata = {
            labels: this.skillLevel,
            datasets: [
              {
                data: this.skillCount,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56', '#fd7e14'
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56', '#fd7e14'
                ]
              }]
          };
          this.filterBySkills(this.skillId);
        }, error => {
          this.loader = false;
        });
    } else {
      this.overallChart = false;
    }
  }

  filterBySkills(skill) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    const customerId = user ? user.sapId : null;
    this.policyService.showAlert = {};
    this.loader = true;
    const postObj = {
      sapId: customerId,
      skillId: skill
    };
    // const user = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
    this.policyService.showBenchEmployees(postObj).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.empList = res;
    },
      error => {
        this.loader = false;
      });
  }


  ngOnInit() {
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

    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    /* Check whether login/not */
    if (!this.policyService.validUser()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
    this.getBenchResources();
    this.getAllSkills();
  }

}
