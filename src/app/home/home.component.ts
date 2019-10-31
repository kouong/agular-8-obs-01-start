import {Component, OnDestroy, OnInit} from '@angular/core';

import {interval, Subscription, Observable} from 'rxjs';
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    /*this.firstObSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });*/

    const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        // Subscribing to observable
        observer.next(count);  // this is how to emit new data
        if (count === 5) {
          observer.complete();  // to complete an observable
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!')); // throw an error
        }
        count++;
      }, 1000);
    });

    this.firstObSubscription = customObservable.pipe(filter((data) => {
        return data > 0;
      }),
      map((data: number) => {
        return 'Round: ' + (data + 1);
      })).subscribe(
      // Setting up different handler functions when data is emitted, an error is thrown and the observable completed
      data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed!');
      });
  }

  ngOnDestroy(): void {
    this.firstObSubscription.unsubscribe();
  }

}
