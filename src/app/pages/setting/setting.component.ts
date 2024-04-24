import {Component, OnDestroy, OnInit} from '@angular/core';
import { ObservableExampleService } from "../../services/testing/testing.service";
import {take, takeUntil} from "rxjs/operators"; // Добавлен оператор take для использования в методе pipe
import { Subscription, Subject } from "rxjs";
import { SettingService } from "src/app/services/setting/setting.service"; // Импортирован сервис SettingService

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {


  subjectForUnsubscribe = new Subject();
  constructor(private testing: ObservableExampleService,
              private settingsService: SettingService) { // Добавлен импорт и инъекция SettingService

  }

  ngOnInit(): void {

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data: any) => {
      console.log('settings data', data);
    });

    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data: any) => { // Исправлен синтаксис take
      console.log('settings data from subject', data);
    });
  }




  ngOnDestroy() {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }
}
