import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.currentUser
      .pipe(
        map(user => {
          if(user) return true;

          this.router.navigate(['/login'],{queryParams: { returnUrl: state.url }});
          return false;
        })
    )
  }
}
