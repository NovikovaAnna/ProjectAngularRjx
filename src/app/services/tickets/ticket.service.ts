import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {INearestTour, ITour, ITourLocation} from "../../models/tours"
import {ITourTypeSelect} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private ticketServiceRest: TicketRestService) {
  }

  private ticketSubject = new Subject<ITourTypeSelect>()

//Вызов метод ticketServiceRest
  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets()
  }

  // 1 вариант доступа к Observable
  readonly ticketType$ = this.ticketSubject.asObservable();

  // 2 вариант доступа к Observable (из практики)
  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  //
  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }


  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTours():Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation():Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }
}
//   getTickets(): Observable<ITour[]> {
//     return this.ticketServiceRest.getTickets().pipe(map(
//
//       project:(value: ITour) => {
//         const singleTours = value.filter((el: ITour)) =>el.type === "single");
//         return value.concat(singleTours);
//     }
//     ))
//   }
// }
