import { Injectable } from '@angular/core';
import { StatisticRestService } from '../rest/statistic-rest/statistic-rest.service';
import { Observable, map } from 'rxjs';
import { ICustomStatisticUser, IStatisticUser } from 'src/app/modales/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private statisticUserRest: StatisticRestService) { }

  getUserStatistic(): Observable<ICustomStatisticUser[]>{
    return this.statisticUserRest.getUserStatistic().pipe(
      map((data: IStatisticUser[]) => {
        const newDataArr: ICustomStatisticUser[] = [];

        data.forEach((el: IStatisticUser) => {
          const newDataObj: ICustomStatisticUser = {
            id: el.id,
            name: el.name,
            city: el.address.city,
            company: el.company.name,
            phone: el.phone,
            street: el.address.street
          };
          newDataArr.push(newDataObj);
        })
        return  newDataArr
      })
    )
  }
}
