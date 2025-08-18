import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private user: UserService ,private route: ActivatedRoute ,private auth: AuthService, private router: Router){}

  login(loginValues: any){
    const email = loginValues?.email;
    const password = loginValues?.password;
    const username = loginValues?.username;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.auth.login(email,password,username)
      .subscribe(response => {
        if(returnUrl)
          this.router.navigate([returnUrl]);
        else{
          this.router.navigate(['/']);
        }
      })

  }

}
