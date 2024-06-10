import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { IUser} from 'src/app/modales/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserSettingsService } from '../services/user-settings.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  private subjectScore: Subject<string>;

  private subjectUnsubscribe: Subscription;

  constructor(private testing: ObservableExampleService) { }

  ngOnInit(): void {
    this.subjectScore = this.testing.getSubject();

    const myObservable = this.testing.getObservable();
    const unsubscribe = myObservable.subscribe((data) => {
      console.log('observable data', data);
      
    })

    this.subjectUnsubscribe =  this.subjectScore.subscribe((data) => {
      console.log('data', data)
    });
    this.subjectScore.next('subData');
  }

  ngOnDestroy() {
    this.subjectUnsubscribe.unsubscribe();
  }
}
/*
  private subjectForUnsubscribe = new Subject();

  currentPsw: string;
  newPsw: string;
  newPswRepeat: string;
  login: string;



  constructor(private testing: ObservableExampleService,
    private settingsService: SettingsService,
    private authService: AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

    //this.login = this.userService.getUser().login

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data)
    })

    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
        console.log('settings data from subject', data)
      })

  }


  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();

  }



  changePsw(ev: Event): void | boolean {
    const saveUser: IUser = {
      login: this.login,
      psw: this.newPsw,
      newPsw: this.newPsw,
      newPswRepeat: this.newPswRepeat
    }

    if (this.authService.checkUser(saveUser)) {
      this.userService.setUser(saveUser);

      this.userService.setToken('user-private-token');

      this.router.navigate(['tickets/tickets-list']);

    }
    else if(this.newPsw !==  this.newPswRepeat) {
      this.messageService.add({ severity: 'error', summary: 'Проверьте введеные данные' }); 
    } else {
      this.messageService.add({ severity: 'success', summary: 'Пароль успешно изменен' });
    }

  }

}
*/