import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string | null = null;


  constructor(private router: Router,private auth: AuthService, private user: UserService){}

  onSubmit(registerValues: any){
    const email = registerValues?.email;
    const username = registerValues?.username;
    const password = registerValues?.password;

    this.auth.register(email,username,password)
      .subscribe({
        next: () => {
          console.log('success');
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.errorMessage = err.message.replace(/^Firebase:\s*/i, '');
        }
      })

  }
}
