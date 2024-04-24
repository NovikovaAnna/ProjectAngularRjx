import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TicketService } from "../../../services/tickets/ticket.service";
import { ITour, ITourTypeSelect } from "../../../models/tours";
import { Router } from "@angular/router";
import { TiсketsStorageService } from "../../../services/tiсkets-storage/tiсkets-storage.service";
import { BlockStyleDirective } from "../../../directive/block-style.directive";
import { debounceTime, fromEvent, Subscription } from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit {
  tickets: ITour[];
  ticketsCopy: ITour[];
  renderComplete = false;
  tourUnsubscriber: Subscription;
  searchTicketSub: Subscription;
  ticketSearchValue: string;
  loadCountBlock: boolean = true;

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TiсketsStorageService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      }
    );

    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {
      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;
      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0];
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      setTimeout(() => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);
      });
    });
  }

  ngOnDestroy(): void {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement,'keyup');
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe(() => {
      if (this.ticketSearchValue) {
        const searchValueLower = this.ticketSearchValue.toLowerCase(); // Приведение к нижнему регистру
        this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(searchValueLower)); // Поиск независимо от регистра
      } else {
        this.tickets = [...this.ticketsCopy];
      }
    });
  }

  goToTicketInfoPage(item: ITour): void {
    this.router.navigate([`/tickets/ticket/${item.id}`]).then(r => {});
  }

  directiveRenderComplete(ev: boolean): void {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #f5f5dc')
    this.blockDirective.initStyle(0)
    this.renderComplete = true
  }

  findTours(ev: Event): void {
    const searchValue = (<HTMLInputElement>ev.target).value;
    if (searchValue) {
      const searchValueLower = searchValue.toLowerCase();
      this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(searchValueLower));
    } else {
      this.tickets = [...this.ticketsCopy]
    }
  }
}


