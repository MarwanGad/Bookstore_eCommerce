import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  subscription: Subscription | null = null;
  users: UserInterface[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.subscription = this.userService.getAllUsers()
      .subscribe(users => {
        if(users)
          this.users = users;
      })
  }


  changeAdmin(user: UserInterface){
    this.userService.changeAdminRole(user);
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
