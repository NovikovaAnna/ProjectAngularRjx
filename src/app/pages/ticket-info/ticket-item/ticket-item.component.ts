import { AfterViewInit, Component, OnInit } from '@angular/core';
import { INearestTour, ITour, ITourLocation } from "../../../models/tours";
import { ActivatedRoute } from "@angular/router";
import { TiсketsStorageService } from "../../../services/tiсkets-storage/tiсkets-storage.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user/user.service";
import { IUser } from "../../../models/users";
import { TicketService } from "../../../services/tickets/ticket.service";
import { forkJoin } from "rxjs";


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;

  nearestTours: INearestTour[];
  toursLocation: ITourLocation;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();

    // Init form
    this.userForm = new FormGroup({
      firstName: new FormControl('', { validators: Validators.required }),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(''),
      birthDay: new FormControl(''),
      age: new FormControl(),
      citizen: new FormControl(''),
    });

    // Get nearest tour
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()])
      .subscribe(([nearestTours, toursLocations]) => {
        this.nearestTours = nearestTours;
        // Используем первый элемент массива toursLocations
        this.toursLocation = toursLocations[1];
      });


    // Read parameters
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIDParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIDParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
    }
  }

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
  }

  onSubmit(): void {
    // Handle form submission
  }

  selectDate($event: any): void {
    // Handle date selection
  }
}



