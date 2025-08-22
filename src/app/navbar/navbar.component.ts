import { UserInterface } from '../models/user.interface';
import { Component, HostListener, OnDestroy, OnInit, Pipe } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { cartItemInterface } from '../models/cartItem.interface';
import { combineLatest, startWith, Subscription, take } from 'rxjs';
import { user } from '@angular/fire/auth';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  isShrunk = false;
  currentUser: UserInterface | null = null;
  cartItems: cartItemInterface[] | null = null;
  subscription: Subscription | null = null;
  cartQuantity: number = 0;
  favQuantity: number =0;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 200 && !this.isShrunk) {
      this.isShrunk = true;
    } else if (scrollY <= 50 && this.isShrunk) {
      this.isShrunk = false;
    }
  }

  constructor(private auth: AuthService,
              private router: Router,
              private cartService: ShoppingCartService,
              private favourtieService: FavouriteService){}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.auth.appUser.pipe(startWith(null)),
      this.cartService.getCart().pipe(startWith([])),
      this.favourtieService.getFav().pipe(startWith([]))
    ]).
    subscribe(([ userDoc, cartItems, fav ]) => {
      this.currentUser = userDoc;
      this.cartQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
      this.favQuantity = fav.length;
    })

  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();

  }


  logout(){
    this.auth.logout()
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      })
  }


}
