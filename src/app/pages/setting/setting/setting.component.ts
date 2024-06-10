import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
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
