import { Injectable } from '@angular/core';
import { IUser } from 'src/app/modales/users';
import { USER_STORE_NAME } from 'src/app/modales/users';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usersStorage: IUser[] = [];

  constructor() { }


  checkUser(user: IUser): boolean {

    console.log('user', user);

    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    let isUserSavedInStore = window.localStorage.getItem(USER_STORE_NAME);
    let userInStore = <IUser>{};

    if (isUserSavedInStore) {
      userInStore = JSON.parse(isUserSavedInStore);
      console.log('userInStore', userInStore);
    }
    if (isUserExists) {
      return isUserExists.psw === user.psw;
    } else if (userInStore?.login) {
      return userInStore.psw === user.psw;
    }
    return false;
  }

  setUser(user: IUser): void {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login) {
      this.usersStorage.push(user)
    }
    // тест
    else (isUserExists && isUserExists.psw === user.psw); {
      return
    }

  }



  isUserExsist(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    return !!isUserExists
  }

  logout() {
    localStorage.removeItem('isUserSavedInStore');
  }

}

/*
checkPassword(user: IUser): boolean {
const userInStore: string | null = localStorage.getItem('user')
if (userInStore !== null) {
  const userLocalStorage = JSON.parse(userInStore)
  if (userLocalStorage && userLocalStorage.psw === user.psw) {
    return true
  }
}
}

setPassword (user: IUser) : void {
  let userInStore: string | null = localStorage.getItem('user');
  let userLocalStoragen = JSON.parse(userInStore);
  if (userLocalStoragen && userLocalStoragen.login === user.login) {
    userLocalStoragen.psw === user.psw;
    localStorage.setItem('user', JSON.stringify(userLocalStoragen));
    return
  }

}*/




