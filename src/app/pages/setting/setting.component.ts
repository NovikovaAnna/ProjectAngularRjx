import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../services/testing/testing.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  private subjectScope: Subject<string>;
  private  subjectUnsubscribe: Subscription;


  constructor(private testing : ObservableExampleService) {

  }

  ngOnInit(): void {
    this.subjectScope = this.testing.getSubject();

    // const myObservable = this.testing.getSubject();
    // // сразу получаем данные
    // const unsubscribe = myObservable.subscribe((data) => {
    //   console.log('***observer data', data)
    // })
    //
    // unsubscribe.unsubscribe();


    // подписка
    this.subjectUnsubscribe = this.subjectScope.subscribe((data) => {
       console.log('***data', data)
    });
    //отправляем данные
    this.subjectScope.next('subData value');

  }
  // Отписка
  ngOnDestroy() {
    this.subjectUnsubscribe.unsubscribe()
  }


}
