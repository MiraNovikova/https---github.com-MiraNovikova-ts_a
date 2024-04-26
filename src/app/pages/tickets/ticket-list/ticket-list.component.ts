import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, fromEvent } from 'rxjs';
import { BlocksStyleDirective } from 'src/app/derective/blocks-style.directive';
import { ITour, ITourTypeSelect } from 'src/app/modales/tours';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  tickets: ITour[];
  ticketCopy: ITour[] = [];
  filterText: string = '';
  ticketsDouble: ITour[];
  loadCountBlock = false;
  defaultDate: string

  @ViewChild('tourWrap', { read: BlocksStyleDirective }) blockDirective: BlocksStyleDirective;

  @ViewChild('tourWrap') tourWrap: ElementRef;
 
  tourUnsubscriber: Subscription;   //3.1

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TiсketsStorageService) { }


  ngOnInit(): void {
   this.ticketService.getTickets().subscribe( 
      (data: ITour[]) => {
        this.tickets = data;
        if (Array.isArray(data)) {
          this.ticketCopy = [...data];
          this.ticketsDouble = [...this.tickets]
        }
    
        this.ticketStorage.setStorage(data);
      }
      
    ) 

    //1 var
    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {
      console.log('data', data)
 
      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsDouble.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsDouble.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsDouble];
          break;
      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsDouble.filter((el) => el.date === dateValue);
      }
      setTimeout(() => {
 
        this.blockDirective.updateItems();
    
        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
       });
    });

    //2 var
    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) =>
     {  console.log('data', data)  });
    
    }

  //поиск 
  searchTour(): void {

    if (!this.filterText) {
      this.tickets = [...this.ticketCopy];
    } else {
      this.tickets = this.ticketCopy.filter((tour) => {
        return tour.name.toLowerCase().includes(this.filterText.toLowerCase())
      });
    }
  }
  

  ngAfterViewInit() {
    //setTimeout(() => { }
    //  , 0)

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true})
      this.searchTicketSub = fromEventObserver.pipe(
        debounceTime(200)).subscribe((ev: any) => {
          if(this.ticketSearchValue) {
            this.tickets = this.ticketCopy.filter((el: ITour) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
          } else {
            this.tickets = [...this.ticketCopy];
          }
        })
  }

ngOnDestroy() {
  this.tourUnsubscriber.unsubscribe();
  this.searchTicketSub.unsubscribe()
}

  goToTicketInfoPage(item: ITour) {
    //this.router.navigate([`/tickets/ticket/${item.id}`])
    this.router.navigate([`/tickets/ticket`], { queryParams: { id: item.id } });
  }
  directiveRenderComplete(ev: boolean) {

    //console.log('xxx', ev)
    this.tourWrap;
    this.blockDirective.initStyle(0)
  }

}




