import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string | null = null;
  defaultProfilePic: string = 'https://media.istockphoto.com/id/2212478710/vector/faceless-male-avatar-in-hoodie-illustration.jpg?s=612x612&w=0&k=20&c=Wlwpp5BUnzbzXxaCT0a7WqP_JvknA-JtOhBoKDpQMHE=';


  constructor(private router: Router,private auth: AuthService){}

  onSubmit(registerValues: any){
    const email = registerValues?.email;
    const username = registerValues?.username;
    const password = registerValues?.password;

    const profilePic = !(registerValues?.profilePic) || (registerValues.profilePic.trim() === '') ?
                        this.defaultProfilePic :
                        registerValues.profilePic;                       

    this.auth.register(email,username,password,profilePic)
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
