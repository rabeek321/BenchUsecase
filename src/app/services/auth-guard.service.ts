
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageSubscriptionService } from './message-subscription.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private messageServive: MessageSubscriptionService) { }
  // tslint:disable-next-line: max-line-length
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) {
      /* send message to subscribers via observable subject */
      this.messageServive.sendMessage(user);
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }
  }
}
