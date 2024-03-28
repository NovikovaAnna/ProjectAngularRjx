import { Injectable } from '@angular/core';
import { TicketRestService } from "../rest/ticket-rest.service";
import { Observable, Subject } from "rxjs";
import { ITour } from "../../models/tours";
import { ITourTypeSelect } from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>();

  // Добавляем свойство ticketType$
  ticketType$: Observable<ITourTypeSelect> = this.ticketSubject.asObservable();

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  // Метод для обновления текущего типа билета
  updateTicketType(tourType: ITourTypeSelect): void {
    this.ticketSubject.next(tourType);
  }
}
