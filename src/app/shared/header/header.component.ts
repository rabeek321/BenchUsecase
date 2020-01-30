import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageSubscriptionService } from '../../services/message-subscription.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  userDetails: any;
  constructor(
    private router: Router,
    private messageService: MessageSubscriptionService) { }

  /* Get loggged user details from subject subscription */
  getLoginUser(): void {
    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(userData => {
      if (userData) {
        console.log(userData);
        this.userDetails = userData;
      } else {
        // clear messages when empty message received
        this.userDetails = {};
      }
    });
  }
  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  /* logout */
  logout(): void {
    sessionStorage.clear();
    this.messageService.clearMessages();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.getLoginUser();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
