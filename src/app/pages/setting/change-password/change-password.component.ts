import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/modales/users';
import { UserService } from 'src/app/services/user/user.service';
import { createPasswordStrengthValidator } from '../validators/password';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private user: IUser | null;

  constructor(private userService: UserService,
    private messageService: MessageService) { }

  changePasswordForm: FormGroup

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]),
      newPasswordRepeat: new FormControl('', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()])
    })
  }

  onSubmitChangePassword(): void | boolean {
    console.log('click')
    const currentPsw = this.changePasswordForm.get('currentPassword')?.value;
    const newPsw = this.changePasswordForm.get('newPassword')?.value;
    const repeatNewPas = this.changePasswordForm.get('newPasswordRepeat')?.value;

    if(!this.user) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Что-то не так'
      });
      return false
    }
    if(!this.user.psw !== currentPsw) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Текущий пароль не верный'
      });
      return false
    }

    if(newPsw !== repeatNewPas) {
      console.log('пароли не совпадают');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Пароли не совпадают'
      });
      return false
    }

    //альтернатив способ получения данных
    this.user.psw = this.changePasswordForm.value.newPassword;
    this.userService.setUser(this.user);

    this.messageService.add({
      severity: 'success',
      summary: 'Пароль обновлен'
    });
  }
}
