import { Injectable } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IUser, TOKEN_NAME } from 'src/app/modales/users';
import { USER_STORE_NAME } from 'src/app/modales/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private user: IUser;
private token: string | undefined;
private userBehSubject = new BehaviorSubject<IUser | null>(null);
readonly userBehSubject$ = this.userBehSubject.asObservable()


  constructor() { }
  

  getUser() : IUser { 
    if (this.user || this.getFormStorage()) {
      return this.user
    } else {
      const userFromStore = JSON.parse(localStorage.getItem(USER_STORE_NAME) || '')
      return userFromStore
    }
    //return this.user || this.getFormStorage();

  }
    
   setUser(user: IUser) {
    this.user = user;
    this.setToStorage(this.user)
    this.userBehSubject.next(this.user)
   }

  setToken(token: string): void {
  this.token = token;
  localStorage.setItem(TOKEN_NAME, token)
}

   getToken(): string | undefined {
    const tokenStorage: string | null = localStorage.getItem(TOKEN_NAME);
    const rToken: string | null = this.token || tokenStorage;

    if (rToken) { 
      return rToken
    } else {
      console.log('Error token')
      return 
    }
  }

    clearInfo() {
    this.token = undefined;
    //this.user = undefined
    }

    public setToStorage(user: IUser): void {
      if(localStorage.getItem(USER_STORE_NAME)) {                         //UserStorageName
        localStorage.setItem(USER_STORE_NAME, JSON.stringify(user))
      }
    }

    public getFormStorage(): IUser | null {
      const userFromStore = localStorage.getItem(USER_STORE_NAME);
      if(userFromStore) {
        return JSON.parse(userFromStore)
      }
      return null
    }

}