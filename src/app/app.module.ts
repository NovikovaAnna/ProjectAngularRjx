import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RestInterceptorsService} from "./services/interceptors/restInterceptors";
import {ConfigService} from "./services/config/config.service";


function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,

  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi:true

    },

    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true},

  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

