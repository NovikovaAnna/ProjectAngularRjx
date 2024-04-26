import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  saveValue: boolean;
  saveUserInStore: boolean;
  showCardNumber: boolean;


  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  saveUser(): void{

  }

  registration(ev: Event): void | boolean {
    if (this.psw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary: 'Ошибка', detail: 'Пароли не совпадают'});
      return false;
    }
    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email
    }
      //Пользователь есть/нет
    if (!this.authService.isUserExists(userObj)){
      this.authService.setUser(userObj);
      this.messageService.add({severity:'success', summary: 'Успех!', detail: 'Регистрация прошла успешно'});
    }
    if (this.saveValue){
      window.localStorage.setItem('userLogin:' + `${userObj.login}`, JSON.stringify(userObj));
    }

    else {
      this.messageService.add({severity:'warn', summary: 'Неудача', detail: 'Пользователь уже зарегистрирован'});
    }

  }

}
