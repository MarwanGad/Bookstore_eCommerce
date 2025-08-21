import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderId: string | null = '';
  order: any;
  orderTotalPrice: number | null = 0;
  subscription: Subscription | null = null;
  constructor(private orderService: OrderService, private route: ActivatedRoute ){}


  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    if(this.orderId)
      this.subscription = this.orderService.getOrder(this.orderId)
        .subscribe( (order) => {
          this.order = order;
        });
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
