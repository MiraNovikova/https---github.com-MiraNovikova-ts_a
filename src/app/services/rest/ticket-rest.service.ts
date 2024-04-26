import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {INearestTour, ITour, ITourLocation} from '../../modales/tours'
import {TOKEN_NAME} from '../../modales/users'
@Injectable({
  providedIn: 'root'
})
export class TicketRestService {
  sentTourData(type: any): void {
    throw new Error('Method not implemented.');
  }

  constructor(private  http: HttpClient) { }

  getTickets() : Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/',
    {headers: {'Authorization': `Bearer ${TOKEN_NAME}`}} //тема 2,  Реализовать отправку токена авторизации при переходе по прямой ссылке
    )
  }



  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTour(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/')
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  }

  getRandomNearestEven(type: number): Observable<INearestTour> {
    switch (type) {
      case 0:
        return this.http.get<INearestTour>('../../../../assets/mocks/nearestTours1.json');
        case 1:
        return this.http.get<INearestTour>('../../../../assets/mocks/nearestTours2.json');
        case 2:
        return this.http.get<INearestTour>('../../../../assets/mocks/nearestTours3.json');
        default:
        return this.http.get<INearestTour>('../../../../assets/mocks/nearestTours2.json');  
    }
  }

  sendTourData(data: any) : Observable<any> {
    return this.http.post('../../../../assets/mocks/', data)
  }
}
