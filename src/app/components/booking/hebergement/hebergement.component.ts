import { Component, OnInit , ViewContainerRef } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var $ :any;
@Component({
  selector: 'app-hebergement',
  templateUrl: './hebergement.component.html',
  styleUrls: ['./hebergement.component.scss']
})
export class HebergementComponent implements OnInit {
  listVille:object[]=JSON.parse(localStorage.getItem("listville")) || [];
  hotel:object[]=[];
  map:string;
  latu: number = 36.8520691;
  long: number = 10.311029399999999;
  listSelect=JSON.parse(localStorage.getItem("listSelect")) || [];
  selectedItemId:any=this.listVille[0];
  selectedHotel:any ={titre:"",_id:"",};
  reservehotel:any= JSON.parse(localStorage.getItem("_rhb")) || [];
  constructor(private bookingService:BookingService,private toastrManager: ToastsManager,vcr: ViewContainerRef,) { }

  ngOnInit() {
    var winH=$(window).height();
    this.map=parseInt(winH)-( 79 )+"px";
    this.bookingService.getHotel(this.listVille[0]).subscribe(data => {this.hotel=data;console.log(data)})
    console.log(this.hotel);
  }
  selectHotelVille(ville){
    this.bookingService.getHotel(ville).subscribe(data => {this.hotel=data;console.log(data)})
    this.selectedItemId=ville;
    console.log(this.selectedItemId);

  }
  getHotelModal(hotel){
    this.selectedHotel=hotel;
  }
  reserveBooking(reseve,fluid){
    this.reservehotel.push(reseve);
    localStorage.setItem('_rhb',JSON.stringify(this.reservehotel));
    fluid.hide();
    let options = { showCloseButton: true, tapToDismiss: true ,positionClass:'toast-top-left' };
      this.toastrManager.success('success.',null,options);

  }

}
