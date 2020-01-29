import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../services/policy.service';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit {

  data: any;
  skillLevel: string[];
  skillCount: number[]; 
  constructor(private policyService: PolicyService, ) { }

  ngOnInit() {
    this.getResourceCount();
  }

  getResourceCount() {
    this.policyService.resourceChart('spring').subscribe(
      (response) => {
        const knowledgeLevel = response.resourseList[0].skillKnowledge;       
        this.skillLevel = knowledgeLevel.map(skill => skill.skillKowledgeLevel);
        this.skillCount = knowledgeLevel.map(skill => skill.skillKnowledgeCount);
        this.data = {
          labels:this.skillLevel,
          datasets: [
            {
              data: this.skillCount,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56", "#F3CE56"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56", "#F3CE56"
              ]
            }]
        };
      }
    );
  }

  selectData(event) {
    console.log(event);
  }

}
