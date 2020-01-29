import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

@NgModule({
  declarations: [DashboardComponent, DashboardChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PrimengModule
  ],
  providers: [MessageService]
})
export class DashboardModule { }
