import {Component, OnDestroy, OnInit} from '@angular/core';
import { ObservableExampleService } from "../../services/testing/testing.service";
import { take } from "rxjs/operators"; // Добавлен оператор take для использования в методе pipe
import { Subscription, Subject } from "rxjs";
import { SettingService } from "src/app/services/setting/setting.service"; // Импортирован сервис SettingService

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  private subjectScope: Subject<any> = new Subject<any>(); // Инициализирован новый Subject
  settingsData: Subscription;
  settingsDataSubject: Subscription;
  private subjectUnsubscribe: Subscription;

  constructor(private testing: ObservableExampleService,
              private settingsService: SettingService) { // Добавлен импорт и инъекция SettingService

  }

  ngOnInit(): void {
    this.settingsData = this.settingsService.loadUserSettings().subscribe((data:any) => {
      console.log('settings data', data);
    });

    this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable().pipe(take(1)).subscribe((data:any) => { // Исправлен синтаксис take
      console.log('settings data from subject', data);
    });

    // Перемещение отправки данных после подписки для избежания преждевременного вызова
    // Отправляю данные после подписки
    this.subjectScope.subscribe((data) => {
      console.log('***data', data);
    });
    this.subjectScope.next('subData value');
  }

  ngOnDestroy() {
    // Отписка от settingsData
    if (this.settingsData) {
      this.settingsData.unsubscribe();
    }
    // Отписка от settingsDataSubject
    if (this.settingsDataSubject) {
      this.settingsDataSubject.unsubscribe();
    }
    // Отписка от subjectScope
    if (this.subjectUnsubscribe) {
      this.subjectUnsubscribe.unsubscribe();
    }
  }
}

