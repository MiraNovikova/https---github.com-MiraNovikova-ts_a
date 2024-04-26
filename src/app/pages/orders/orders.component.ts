import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { OrderType } from 'src/app/shared/mocks/orders';
import { ITour } from 'src/app/modales/tours';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  tableData$: Observable<TreeNode<OrderType[]>[]>;
  tableData: TreeNode<OrderType[]>[] = []
  private _destroyer: Subscription;
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {

    this.initOrders();

    this.ordersService.getOrders().subscribe((data) => {
    this.tableData = data
    });

    this._destroyer = this.ordersService.groupOrders$.subscribe((data: boolean) => {
      this.initOrders()
    })
  }

  ngOnDestroy(): void {
    this._destroyer.unsubscribe()
  }

  initOrders(): void {
    this.tableData$ = this.ordersService.getOrders()
  }

}
