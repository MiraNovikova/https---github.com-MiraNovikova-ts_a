import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuType } from 'src/app/modales/menuType';
import { ITourTypeSelect } from 'src/app/modales/tours';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { MessageService } from 'primeng/api';






@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})

export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  obj = {type: 'custom', label: 'обычное'}
  selectedMenuType: IMenuType;
  showButtonBar = true;
  date: string;
 
 
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();
  router: any;

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
 

  constructor(private ticketService: TicketService,
              private settingsService : SettingsService,
              private messageService: MessageService
             ) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  ngAfterViewInit() {
   // this.ticketService.updateTour({date: this.tourDefaultData.toString()})
  }


  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }
  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }
  
  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
     }

initRestError(ev: Event): void {
  this.ticketService.getError().subscribe(
    (data)=> {},
    (err) => {
      console.log('err', err)
      this.messageService.add({severity:'error', summary:'Not Found', detail:'Invalid URL'});
    }
  )
}


initSettingsData(): void {
  this.settingsService.loadUserSettingsSubject({
    saveToken: false
  })
}
}
