import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { SettingComponent } from './settings/setting.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: SettingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
