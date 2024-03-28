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

  constructor(private  testing: ObservableExampleService) {
    testing.initObservable()

  }


  ngOnInit(){
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) =>{

    })

    myObservable.subscribe((data)=>{

    });


    const mySubject = this.testing.getSubject();
    mySubject.next('subject value');


    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.next('new data from behaviorSubject');
    myBehavior.subscribe((data) =>{
      console.log('first data behaviorSubject', data)
    });



  }

}
