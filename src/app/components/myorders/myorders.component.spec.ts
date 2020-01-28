import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyordersComponent } from './myorders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { PolicyService } from '../../services/policy.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'myorders',
    component: MyordersComponent
  }
];
describe('MyordersComponent', () => {
  let component: MyordersComponent;
  let fixture: ComponentFixture<MyordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyordersComponent],
      imports: [RouterTestingModule.withRoutes(routes), SharedModule, PrimengModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [PolicyService, MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
