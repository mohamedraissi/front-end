import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  listSelect:any[]=JSON.parse(localStorage.getItem("listSelect")) || [];
  rhb:any[]=JSON.parse(localStorage.getItem("_rhb")) || [] ;
  hotel:any[];
  constructor(private bookingService:BookingService) { }

  ngOnInit() {
    console.log(this.rhb)
    this.bookingService.getHotelRes(this.rhb).subscribe(data => {this.hotel=data;console.log(data)})
  }
}
