import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
declare var $ :any;
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  listVille:object[]=JSON.parse(localStorage.getItem("listville")) || [];
  map:string;
  resto:object[]=[];
  latu: number = 36.8520691;
  long: number = 10.311029399999999;
  listSelect=JSON.parse(localStorage.getItem("listSelect")) || [];
  selectedItemId:any=this.listVille[0];
  selectedResto:any ={titre:""};
  constructor(private bookingService:BookingService) { }

  ngOnInit() {
    var winH=$(window).height();
    this.map=parseInt(winH)-( 79 )+"px";
    console.log(this.resto);
    this.bookingService.getResto(this.listVille[0]).subscribe(data => {this.resto=data;console.log(this.resto)})
  }
  selectRestolVille(ville){
    this.bookingService.getResto(ville).subscribe(data => {this.resto=data;console.log(data)})
    this.selectedItemId=ville;
    console.log(this.selectedItemId);
  }
  getRestoModal(resto){
    this.selectedResto=resto;
  }

}
