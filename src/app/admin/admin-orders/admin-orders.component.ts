import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Subscription, take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-admin-orders',
  standalone: false,
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit, OnDestroy{
  orders: any;
  ordersSubscription: Subscription | null = null;
  userSubscription: Subscription | null = null;
  showOrderDetails: boolean = false;
  constructor(private orderService: OrderService,private userService: UserService){}

  ngOnInit(): void {
    this.ordersSubscription = this.orderService.getAllOrders()
      .subscribe(orders => {
        this.orders = orders
      });  

  }



  ngOnDestroy(): void {
    if(this.ordersSubscription)
      this.ordersSubscription.unsubscribe();
  }
}
