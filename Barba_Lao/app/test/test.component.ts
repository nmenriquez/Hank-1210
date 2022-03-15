import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  presentDate = new Date();
  price = 2000.90;

  Fruits = ["Apple","Orange","Grapes","Mango","Kiwi","Pomegranate"];
  decimalNum1 : number = 8.7589623;
  decimalNum2 : number = 5.43;
  constructor() { }

  ngOnInit(): void {
  }

}
