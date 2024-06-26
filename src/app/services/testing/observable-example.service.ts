import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private myBehaviorSubject = new BehaviorSubject<string>(' some data of Behavior subject');
  private mySubject = new Subject<string>();
  private myObservable = new Observable<string>((subscriber => {
    subscriber.next('async someValue')
    setTimeout(() => {
      subscriber.next('someValue')
    }, 3000)
  }));

  constructor() { }

  initObservable() : void {
    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() => {
        subscriber.next('asynncData');
        subscriber.error('some error')
      }, 3000)
    }
    )
    )
   const sub = observable.subscribe((data) => {
      console.log('observable data', data);
    }, (error => {
      console.log('error', error)
    }))
    sub.unsubscribe()
  }

  getObservable(): Observable<string> {
    return this.myObservable
  }

  getSubject(): Subject<string> {
    return this.mySubject
  }

  getBehaviorSubject(): BehaviorSubject<string> {
    return this.myBehaviorSubject
  }
}
