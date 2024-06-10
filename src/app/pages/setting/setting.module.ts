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
import { SettingComponent } from './settings/setting.component';
import { StatisticComponent } from './statistic/statistic.component';
import { PasswordChangeComponent } from './password-change/password-change.component';



@NgModule({
  declarations: [
    UsersComponent,
    FilterPipe,
    SettingComponent,
    StatisticComponent,
    PasswordChangeComponent
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
    PasswordChangeComponent],

  providers: [MessageService]
})
export class SettingModule { }
 