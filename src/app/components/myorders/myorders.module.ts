import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyordersRoutingModule } from './myorders-routing.module';
import { MyordersComponent } from './myorders.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [MyordersComponent],
  imports: [
    CommonModule,
    MyordersRoutingModule,
    SharedModule,
    PrimengModule
  ],
  providers: [MessageService]
})
export class MyordersModule { }
