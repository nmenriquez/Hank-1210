import { Component, OnInit } from '@angular/core';
import { Observable, of, range, fromEvent, filter, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

 numbers : number[]=[];
 sum: number=0;

 filteredNumbers : number[] = [];
 sumfiltered: number=0;

 mapsum: number=0;
 mappedNumbers : number[] = [];

 apiMessage : any;

 counter: number=0;


  ngOnInit(){
    /*
    const intervals$ = interval(1000);
    intervals$.subscribe(val => console.log('stream 1 '+ val));
    const click$ = fromEvent(document, 'click');
    click$.subscribe(evt => console.log('Mouse Clicked' + evt));
    */

    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete(); 
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
      next(x){ console.log('got value ' +x);},
      error(err) {console.error('something wrong occurred: ' +err);},
      complete() {console.log('done');}
    });
    console.log('just after subscribe');

    const numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    const observer = {
      next: (num : number) => {this.numbers.push(num); this.sum += num},
      error: (err:any) => console.log(err),
      complete: () => console.log("Observation completed")
      
    };
    numbers$.subscribe(observer);

    const filterFn = filter ((num : number) => num > 5);
    const filteredNumbers$ = filterFn(numbers$);

    filteredNumbers$.subscribe((num:number) => {
      this.filteredNumbers.push(num); this.sumfiltered +=num
    });

    const mapFnc = map((num : number) => num + num);
    const mappedNumbers$ = numbers$.pipe(filterFn, mapFnc);
    mappedNumbers$.subscribe((num : number) => {this.mappedNumbers.push(num); this.mapsum += num});

    const api$ = ajax({ url: 'https://httpbin.org/delay/1', method: 'POST', headers: { 'Content-Type': 'application/text' }, body: "Hello" });


    api$.subscribe(res => this.apiMessage = res.request.body);

    const clickEvent$ = fromEvent(document, 'click');
    clickEvent$.subscribe(() => this.counter++ );


  };

}
