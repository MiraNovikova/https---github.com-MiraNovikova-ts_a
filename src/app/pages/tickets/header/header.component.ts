import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { IMenuType } from 'src/app/modales/menuType';
import { IUser } from 'src/app/modales/users';
import { UserService } from 'src/app/services/user/user.service';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  items: MenuItem[];

  @Input() test: string = 'initialValue';
  time: Date;

  private  settingsActive = false;
  private timerInterval: number;
  user: IUser | null;



  constructor( private userService : UserService) { }

  
  ngOnInit(): void {
    this.items = this.initMenuItems();

    this.items = [
      {
          label: 'Билеты',
          routerLink:['tickets-list']
     
      },
      {
        label: 'Выйти',
        routerLink:['/auth']
   
    },
  ];
  this.timerInterval = window.setInterval(() => {
    this.time = new Date();
  }, 1000);

  this.user = this.userService.getUser();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
    if(this.items) {
      window.localStorage.clear()
    }
  }
  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems(); 
 }

 initMenuItems(): MenuItem[] {
  return [
    {
      label: 'Билеты',
      routerLink:['tickets-list']
    },
    {
      label: 'Настройки',
      routerLink:['setting'],
    },
    {
      label: 'Заказы',
      routerLink:['orders'],
    },
    {
      label: 'Выйти',
      routerLink:['/auth'],
      //command: () => {
       // this.userService.removeUser()
      //}
    },

  ];
}

}
