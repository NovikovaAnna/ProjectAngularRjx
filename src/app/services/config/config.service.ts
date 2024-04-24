import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IConfig } from "../../models/config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static config: IConfig;

  constructor(private http: HttpClient) { }

  configLoad(): void {
    const jsonFile = 'src/app/assets/config/config.json';
    this.http.get<IConfig>(jsonFile).subscribe(
      (data) => {
        if (data && typeof (data) === 'object') {
          ConfigService.config = data;
        }
      },
      (error) => {
        console.error('Ошибка при загрузке конфигурационного файла:', error);
      }
    );
  }

  loadPromise(): Promise<IConfig> {
    const jsonFile = 'src/app/assets/config/config.json';
    return this.http.get<IConfig>(jsonFile).toPromise()
      .then((response: IConfig | undefined) => {
        if (response) {
          ConfigService.config = response;
          return response;
        } else {
          throw new Error('Пустой ответ от сервера');
        }
      })
      .catch((error) => {
        console.error('Ошибка при загрузке конфигурационного файла:', error);
        // Можно добавить логику для использования значений по умолчанию
        return ConfigService.config; // Возвращаем значения по умолчанию
      });
  }
}
