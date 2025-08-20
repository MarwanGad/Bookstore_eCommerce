import { Auth, updateProfile, user } from '@angular/fire/auth';
import { Component, inject, Injector, runInInjectionContext } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from '../models/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  currentUser: any;
  subscription: Subscription | null = null;
  private injector = inject(Injector);

  constructor(private auth: Auth , 
              private router: Router, 
              private userService: UserService){}
  
  ngOnInit(): void {
    this.subscription = runInInjectionContext(this.injector, () =>
      user(this.auth).subscribe(user => {
        this.currentUser = user;
        console.log('from profile ts' , this.currentUser);
      })
    );
  }


  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }


  updateProfile(userToEdit: UserInterface){
    this.userService.updateUser(userToEdit, this.currentUser.uid );
    this.router.navigate([`/account/profile/${this.currentUser.uid}`]);

  }
}
