import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, fromEvent } from 'rxjs';
import { ICustomTicketData } from 'src/app/modales/custom';
import { INearestTour, ITour, ITourLocation } from 'src/app/modales/tours';
import { IUser } from 'src/app/modales/users';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;

  ticketSearchValue: string;
  similarTours: INearestTour[];
  nearestTours: ICustomTicketData[];
  toursLocation: ITourLocation[];

 @ViewChild('ticketSearch') ticketSearch: ElementRef;
 searchTicketSub: Subscription;
 ticketRestSub: Subscription;
 searchTypes = [1, 2, 3];


  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()

    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(''),
      birthDay: new FormControl(''),
      age: new FormControl(),
      citizen: new FormControl('')
    })

    forkJoin([this.ticketService.getNearestTour(), this.ticketService.getToursLocation()]).subscribe( (data) =>{
      this.toursLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0], data[1])
    })

    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el : ITour) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }

  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

  const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true} )
    this.searchTicketSub = fromEventObserver.subscribe((ev:any) => {
      this.initSearchTour();
    })

  }

  onSubmit(): void {

  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe()
  }

  selectDate(ev:Event): void {
  }

  initSearchTour(): void {
    const type = Math.floor(Math.random() * this.searchTypes.length);
    if(this.ticketRestSub && !this.searchTicketSub.closed){
      this.ticketRestSub.unsubscribe()
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data : INearestTour) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    })
  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    console.log('postData', postData);
    console.log('  this.userForm.getRawValue()',   this.userForm.getRawValue());

    this.ticketService.sendTourData(postData).subscribe()
  }

  
}
