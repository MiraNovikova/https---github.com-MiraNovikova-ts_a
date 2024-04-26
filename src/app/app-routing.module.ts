import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";



const routes: Routes = [
  
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'tickets',
    loadChildren: ()  => import('./pages/tickets/tickets.module').then(m => m.TicketsModule),
    
  },

  /* 
  как отдельная страница
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule)
  },
*/
  { path: '**',
    redirectTo: 'auth'
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
