import { UserInterface } from '../models/user.interface';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isShrunk = false;
  currentUser: UserInterface | null = null;
  shoppingCartQuantity: number = 0;
  constructor(private auth: AuthService,private router: Router, private cartService: ShoppingCartService){}

  ngOnInit(): void {
     this.auth.appUser
      .subscribe(userDoc => {
        this.currentUser = userDoc;
      })
  }

  logout(){
    this.auth.logout()
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      })
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 200 && !this.isShrunk) {
      this.isShrunk = true;
    } else if (scrollY <= 50 && this.isShrunk) {
      this.isShrunk = false;
    }
  }
}
