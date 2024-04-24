import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./services/testing/testing.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2024';
  prop: string;
  private config: any;

  constructor(private  testing: ObservableExampleService) {
    testing.initObservable()

  }


  ngOnInit(){
    this.config.configLoad()

    //Observable
    //first subscriber
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) =>{
      //console.log('first myObservable data', data)
    })
    //second subscriber
    myObservable.subscribe((data)=>{
      //console.log('second myObservabledata', data)
    });

    //Subject
    const mySubject = this.testing.getSubject();

    //удалены подписки


    //send subjectData
    mySubject.next('subject value');

    //Behavior Subject
    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.next('new data from behaviorSubject'); // стирает последнее дефолтное значение и ставит новое
    myBehavior.subscribe((data) =>{
      console.log('first data behaviorSubject', data)
    });



  }

}
