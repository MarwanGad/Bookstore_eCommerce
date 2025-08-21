import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: false,
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent  implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(['/']);
    },2000)
  }
}
