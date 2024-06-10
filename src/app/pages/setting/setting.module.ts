import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FilterPipe } from './pipes/filter.pipe';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingComponent } from './settings/setting.component';
import { StatisticComponent } from './statistic/statistic.component';



@NgModule({
  declarations: [
    UsersComponent,
    ChangePasswordComponent,
    FilterPipe,
    SettingComponent,
    StatisticComponent
  ], 

  imports: [
    CommonModule,
    SettingRoutingModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ],
      
  exports: [ 
    UsersComponent,
    ChangePasswordComponent],

  providers: [MessageService]
})
export class SettingModule { }
 