import { UserInterface } from './../models/user.interface';
import { Component, inject, Injector, OnDestroy, OnInit, runInInjectionContext } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {  Subscription, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUserId: any;
  currentUser: any;
  subscription: Subscription | null = null;
  private injector = inject(Injector);

  constructor(private auth: Auth,private userService: UserService ){}
  
  ngOnInit(): void {
    this.subscription = runInInjectionContext(this.injector, () =>
      user(this.auth)
      .pipe(
        switchMap( user => {
          this.currentUserId = user;
          return this.userService.getUser(this.currentUserId?.uid);
        })
      ).subscribe( user =>{
        this.currentUser = user;
        console.log('from profile ts from getUser ' , this.currentUser);
      }))
    
    }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
