import { Injectable } from '@angular/core';
import { ITour } from 'src/app/modales/tours';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
  private ticketStorage: ITour[];
  constructor() { }

  setStorage(data: ITour[]): void {
  this.ticketStorage = data;
  
 
   }
   getStorage(): ITour[] {
     return this.ticketStorage
      
}
}
