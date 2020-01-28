import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PolicyService } from '../services/policy.service';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AlertComponent, LoaderComponent],
  imports: [
    CommonModule,
    PrimengModule
  ],
  providers: [PolicyService, AuthGuardService],
  exports: [HeaderComponent, FooterComponent,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, AlertComponent, LoaderComponent]
})
export class SharedModule { }
