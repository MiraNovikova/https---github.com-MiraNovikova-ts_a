import { Component } from '@angular/core';
import { ObservableExampleService } from './services/testing/observable-example.service';
import { ConfigService } from './services/config/config.service';
import { concatMap, delay, exhaustMap, filter, fromEvent, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';
  prop: string;

  constructor (private testing: ObservableExampleService,
               private config: ConfigService,
              private userService : UserService) {}

  ngOnInit() {

   /* const obsArr = of(null).pipe(
      tap((data) => {
        console.log('tap data', data)
      }),
      filter((data: null) => Array.isArray(data)),
      map((data: any) => {
        console.log('call')
        return data.filter((el: any) => el > 10)
      }) 
    ).subscribe((data) => {
      console.log('data xs', data)
    })

    const clicksEv = fromEvent<MouseEvent>(document, 'click');
    clicksEv.pipe(
      tap((data) => {
        console.log('tap data', data)
      }),
      filter((el) => {
        return (el.target as HTMLElement).nodeName === 'INPUT'
      }),
      map((data) => {
        return data.clientX;
      }),

      //switchMap((data) => {
      // return of(data).pipe(delay(2000))
      //}),

      //mergeMap((data) => {
      //  return of(data).pipe(delay(2000))
      //}),

      //concatMap((data) => {
      //  return of(data).pipe(delay(2000))
      //}),

      //exhaustMap((data) => {
      //  return of(data).pipe(delay(2000))
      //}),

      withLatestFrom(this.userService.userBehSubject$, of('newData')),

      mergeMap(([clientX, user, newData]) => {
        //return of({clientX, user})
        return of({myProp1:clientX, myProp2: user, newData: newData}).pipe(delay(2000))
      })

    ).subscribe((data) => {
      console.log('data from subscribe', data);
    })

    */



    this.config.configLoad()


    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data: string) => {
      //console.log('first myObservable data', data)
    });
    myObservable.subscribe((data: string) => {
     // console.log('second myObservable data', data)
    });

    const mySubject = this.testing.getSubject();
    
    mySubject.next('subject value');

    //mySubject.subscribe((data) => {
      
     // console.log('first data subject', data)
    //});
    //mySubject.subscribe((data) => {
     // console.log('second data subject', data)
    //});

    mySubject.next('subject value1');

    const myBehaviorSubject = this.testing.getBehaviorSubject();
    

    myBehaviorSubject.subscribe((data) => {
      //console.log('first data behaviorSubject', data)
    });
    myBehaviorSubject.subscribe((data) => {
     //console.log('second data behaviorSubject', data)
    });

    myBehaviorSubject.next('new data from behaviorSubject');
    myBehaviorSubject.next('new data1 from behaviorSubject');
  }
}

