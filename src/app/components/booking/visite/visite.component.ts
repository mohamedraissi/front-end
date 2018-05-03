import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
declare var $ :any;
@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {
  listVille:object[]=JSON.parse(localStorage.getItem("listville")) || [];
  visite:object[]=[];
  map:string;
  latu: number = 36.8520691;
  long: number = 10.311029399999999;
  listSelect=JSON.parse(localStorage.getItem("listSelect")) || [];
  selectedItemId:any=this.listVille[0];
  selectedVisite:any ={titre:""};
  constructor(private bookingService:BookingService) { }

  ngOnInit() {
    var winH=$(window).height();
    this.map=parseInt(winH)-( 79 )+"px";
    console.log(this.visite);
    this.bookingService.getVisite(this.listVille[0]).subscribe(data => {this.visite=data;console.log(data)})
  }
  selectVisitelVille(ville){
    this.bookingService.getVisite(ville).subscribe(data => {this.visite=data;console.log(data)})
    this.selectedItemId=ville;
    console.log(this.visite);
  }
  getVisiteModal(visite){
    this.selectedVisite=visite;
  }
}
