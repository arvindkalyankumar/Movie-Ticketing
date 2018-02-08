import { Component } from '@angular/core';
import { SeatReservationService } from './seat.reservation.service';

@Component({
  selector: 'seat-plan',
  template: `
    <label style="    display: block;width: 100%;
    text-align: center;font-size: 15pt;
    font-weight: bold;background: #369;
    color: #fff;margin: 20px 0px 5px 0px;
    border: 1px solid #369;">Screen</label>
    <div class="plan">
      <ul style="list-style: none">
        <li *ngFor="let columnNumber of columns">
        </li>
      </ul>
      
      <ul class="position" style="list-style: none">
        <li *ngFor="let rowNumber of rows">
        </li>
      </ul>
      
      <ul>
        <li *ngFor="let seatNumber of seats">
         <span (click)="seatingPlan(seatNumber)" class="{{seatNumber.status}}">{{seatNumber.no}}</span>
        </li>
      </ul>
          <button (click)="confirmSelection()" class="btn btn-info" style="cursor:pointer;text-align: center;
    margin: 0px auto;display: block;
    padding: 3px; margin-bottom: 20px; position: relative;
    bottom: -350px;
    left: 50%;
    margin-left: 290.5px;" >Confirm Selection</button>
    </div>

    <seat-booked></seat-booked>
    `
    ,
        styleUrls: ['./seat.component.css']

})

export class SeatPlan {
   columns = [];
   rows = [];
   seats = [];
   values = '';
   
   constructor(private seatReservationService: SeatReservationService){
     
    for(let i=1;i<=12;i++){
     this.columns.push(i)
    }
    for(let i=0;i<12;i++){
     this.rows.push(String.fromCharCode(65+i))
    }
    this.rows.forEach((row)=>{
      this.columns.forEach((col)=>{
        let no = row+col
        this.seats.push({no:no,status:"free"}); 
       })
    })
   }
   
   seatingPlan(seatNumber){
     if(seatNumber.status == "free"){
        seatNumber.status = "selected";
        console.log('selected');  
     }
     else if(seatNumber.status == "selected"){
       seatNumber.status = "free";
     }
   }
   
   confirmSelection(){
     !(this.seats.some((i)=>i.status=='selected') )&& alert("Please Select One")
     let confirmSeats = [];
     this.seats = this.seats.map((seat)=>{
       if(seat.status == 'selected'){
         confirmSeats.push(seat.no);
         seat.status = 'reserved';
       }
       return seat;
       })
       this.seatReservationService.setSeatConfirmed(confirmSeats);
   }
}










