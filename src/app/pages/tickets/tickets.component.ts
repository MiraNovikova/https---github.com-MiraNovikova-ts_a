import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { IMenuType } from 'src/app/modales/menuType';



@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  selectedType: IMenuType = {label:'xz', type:'ss'};
  showAside = true;
  destroyer = new Subject();
  

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showAside = !this.recursFindPreportyInData(this.route.snapshot, 'asideHidden');

    this.router.events.pipe(
      tap((data) => {
        console.log('data', data)
      }),
      filter((ev) => ev instanceof ActivationStart),
      takeUntil(this.destroyer)
    ).subscribe((data) => {
       if (data instanceof ActivationStart) {
        this.showAside = !this.recursFindPreportyInData(this.route.snapshot, 'asideHidden')
       } } )
  }


  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

  ngOnDestroy(): void {
    this.destroyer.next(true);
    this.destroyer.complete()
  }

  recursFindPreportyInData(currentSnapshot: ActivatedRouteSnapshot, searchPop: string) : boolean {
  console.log('currentSnapshot', currentSnapshot)
  if(currentSnapshot?.data[searchPop]) {
    return true;
  } else {
    if (Array.isArray(currentSnapshot.children)) {
      let result = false;

      currentSnapshot.children.every((el: ActivatedRouteSnapshot , i: number) => {
        result = this.recursFindPreportyInData(el, searchPop);
        if (result) {
          return false;
        } else {
          return true;
        }
      });
      return result;
    } else {
      return false
    }
  }
  }

}
