import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import {INearestTour, ITour, ITourLocation, ITourTypeSelect} from '../../modales/tours'
import {TicketRestService} from '../rest/ticket-rest.service'
import { ICustomTicketData } from 'src/app/modales/custom';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  private ticketSubject = new Subject<ITourTypeSelect>(); //2

  // 1 вариант доступа к Observable  
 readonly ticketType$ = this.ticketSubject.asObservable(); 

  constructor(private ticketServiceRest: TicketRestService) {}
  
  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(

      (value: ITour[]) => {
        const singleTours = value.filter((el) => el.type === 'single');
        return value.concat(singleTours)
      }
    ));
      }
    

  // 2 вариант доступа к Observable 

 getTicketTypeObservable(): Observable<ITourTypeSelect> {  //2
  return this.ticketSubject.asObservable(); 
 }
  
 updateTour(type:ITourTypeSelect): void {
   this.ticketSubject.next(type);
 }

 getError(): Observable<any> {             // п.2.2 возвращать результат вызова getRestError из  TicketRestService 
  return this.ticketServiceRest.getRestError()
  }

  getNearestTour(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTour()
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList()
  }

  transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
    const newTicketData: ICustomTicketData[] = [];
    data.forEach((el: INearestTour) => {
      const newEl = <ICustomTicketData> {...el};
      //newEl.region = <ICustomTicketData>regions.find((region: ITourLocation) => el.locationId === region.id) || {}
      newTicketData.push(newEl);
    });
    return newTicketData;
  }

  getRandomNearestEvent (type: number): Observable<INearestTour> {
   return this.ticketServiceRest.getRandomNearestEven(type);
  }

  sendTourData(data: any): Observable<any> {
    return this.ticketServiceRest.sendTourData(data);
  }
}
