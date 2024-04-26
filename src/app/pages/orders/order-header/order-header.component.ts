import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent implements OnInit {

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
  }

  
  groupOrders (ev: {checked: boolean}) : void {
    this.orderService.initGroupOrders(ev.checked)
   }

}
