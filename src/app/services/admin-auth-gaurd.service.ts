import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map, switchMap} from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService  {
    

  constructor(private auth: AuthService, private router: Router, private user: UserService){
  }
  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.currentUser
      .pipe(
        switchMap( user => this.user.getUser(user!.uid)),
        map(userDoc => {
          if(userDoc?.isAdmin)
            return true;
          this.router.navigate(['/']);
          return false;
        })
      )
      
  }
}
