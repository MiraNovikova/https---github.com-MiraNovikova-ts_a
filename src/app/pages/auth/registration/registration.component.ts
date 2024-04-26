import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { IUser } from 'src/app/modales/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { USER_STORE_NAME } from 'src/app/modales/users';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  saveValue: boolean

  constructor(private messageService : MessageService,
              private authService : AuthService){ }

  ngOnInit(): void {
  }

  
  saveSelected() : void {
  }

  onAuth(ev: Event) : void{
    const authUser : IUser = {
      psw: this.psw,
      login: this.login
    }
    if (this.authService.checkUser(authUser)) {
      console.log('auth true');
    }
    else {
      console.log('auth false');
    }
    
  }


  registration(ev: Event) : void | boolean {
    if (this.psw !==  this.pswRepeat) {
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
    return false
    }

    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email

    }
    
    if (!this.authService. isUserExsist(userObj)) {
      this.authService.setUser(userObj);
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
    } else {
      this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
    }

    if (this.saveValue) {
      localStorage.setItem(USER_STORE_NAME, JSON.stringify(userObj))
    }
  }
  

  showCardNumber() :void {}
}


//.http.post('http://localhost:3000/users/', userObj).subscribe((data) => {})