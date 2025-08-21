import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  subscription: Subscription | null = null;
  currentUserOrders: any;

  constructor(private orderService: OrderService, private auth: Auth){}

  ngOnInit(): void {
    this.subscription = this.orderService.getAllOrders()
      .subscribe( (orders: any[]) => {
        this.currentUserOrders = orders.filter( order => order.userId === this.auth.currentUser?.uid )
      })
  }


  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
