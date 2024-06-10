import { Injectable } from '@angular/core';
import { Observable, delay, map, of, switchMap, withLatestFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { USERS } from 'src/app/shared/mocks/users';

export interface SettingsUsers {
  fio?: string,
  cittizenship?: string,
  role?: string,
  birthDate?: string
}

@Injectable({
  providedIn: 'root'
})
export class SettingUsersService {

  constructor(private userService: UserService) { }
  getUsers(): Observable<SettingsUsers[]> {
    const usersArr: SettingsUsers[] = Array.isArray(USERS) ? [...USERS] : [];
    return of(usersArr).pipe(
      withLatestFrom(this.userService.userBehSubject$),

      switchMap(([users, ownUser]) => {
        const newUser = {fio: ownUser?.login || ''}
        return of(users.concat([newUser]));
      }),

      map((arr) => arr.filter((el:SettingsUsers) => el.fio)),
      map((arr) => arr.concat(arr)),

      delay(300)
    )
  }
}
