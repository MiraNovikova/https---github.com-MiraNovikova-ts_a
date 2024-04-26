import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { OrdersComponent } from './orders.component';
import { OrderHeaderComponent } from './order-header/order-header.component';
import { ToastModule } from 'primeng/toast';




@NgModule({
  declarations: [
    OrdersComponent,
    OrderHeaderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TreeTableModule,
    CheckboxModule,
    CommonModule,
    ToastModule
  
  ]
})
export class OrdersModule { }
