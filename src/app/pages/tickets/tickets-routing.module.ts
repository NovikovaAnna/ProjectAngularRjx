import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "../auth/auth.component";
import {TicketsComponent} from "./tickets.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {SettingComponent} from "../setting/setting.component";

const routes: Routes = [
  { path: '', component: TicketsComponent,
    children:[
      {
        path: 'tickets-list',
        component: TicketListComponent
      },
      {
        path: 'ticket/:id', //путь и параметр
        loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
      },
      {
        path: 'setting', //настройки
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
