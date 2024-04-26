import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
//import {TicketInfoModule} from '../ticket-info/ticket-info.module'
 
const routes: Routes = [
  {path: '', 
  component: TicketsComponent,
  children: [
    {
      path: 'tickets-list',
      component: TicketListComponent
    },
    {
      path: 'ticket',
      loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
    },
    {
      path: 'setting',
      loadChildren: () => import('../../pages/setting/setting.module').then(m => m.SettingModule)
    },
    /*{
      path: 'setting',
      component: SettingComponent,
      data: {asideHidden: true}
    },*/
    {
      path: 'orders',
      loadChildren: () => import('../../pages/orders/orders.module').then(m => m.OrdersModule)
    }

  ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
