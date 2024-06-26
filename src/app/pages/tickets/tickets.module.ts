import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import {MenubarModule} from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { BlocksStyleDirective } from 'src/app/derective/blocks-style.directive';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from  'primeng/toast';





@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlocksStyleDirective,


  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ToastModule

  ]
})
export class TicketsModule { }
