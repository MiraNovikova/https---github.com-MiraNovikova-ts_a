import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from 'src/app/modales/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  loginText = "Логин";
  pswText = "Пароль";
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  user: IUser



  constructor(private authService : AuthService,
              private messageService : MessageService,
              private router : Router,
              private route: ActivatedRoute,
              private userService: UserService
              ) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизация";
  }

  ngOnDestroy(): void {
    console.log('auth')
  }

  vipStatusSelected() : void {

  }

  onAuth(ev: Event) : void{
    const authUser : IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }
    if (this.authService.checkUser(authUser)) {
      this.userService.setUser(authUser);

      this.userService.setToken('user-private-token');
      
      this.router.navigate(['tickets/tickets-list']);
  
    }
    else {
      this.messageService.add({severity:'error', summary:'Проверьте введеные данные'});
    }
    
    if (this.selectedValue) {
      localStorage.setItem(`${authUser.login}`, JSON.stringify(authUser))
    }
  }

}
