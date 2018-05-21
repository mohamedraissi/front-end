import { Component, OnInit , ViewContainerRef , Input } from '@angular/core';
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
  reservehotel:any[]= JSON.parse(localStorage.getItem("_rhb")) || [];
  disabled:boolean=false;
  constructor(private bookingService:BookingService,private toastrManager: ToastsManager,vcr: ViewContainerRef,) { }

  ngOnInit() {
    
    var winH=$(window).height();
    this.map=parseInt(winH)-( 79 )+"px";
    $('.block-overflow').css({
      "height": parseInt(winH)-(185)+"px",
      "overflow": "scroll"});
    this.bookingService.getHotel(this.listVille[0]).subscribe(data => {this.hotel=data;
      for(var i = 0; i < this.reservehotel.length; i++){
        if(this.selectedItemId==this.reservehotel[i].iv[0]){
          this.disabled=true;
          break;
        }
        else{
          this.disabled=false;
        }
        
     }
    })
  }
  selectHotelVille(ville){

    this.bookingService.getHotel(ville).subscribe(data => {this.hotel=data;
      for(var i = 0; i < this.reservehotel.length; i++){
        if(ville==this.reservehotel[i].iv[0]){
          this.disabled=true;
          break;
        }
        else{
          this.disabled=false;
        }
        
     }
    })
    this.selectedItemId=ville; 
  }
  getHotelModal(hotel){
    this.selectedHotel=hotel;
  }
  reserveBooking(reseve,fluid){
    this.reservehotel.push(reseve);
    this.disabled=true;
    localStorage.setItem('_rhb',JSON.stringify(this.reservehotel));
    fluid.hide();
    let options = { showCloseButton: true, tapToDismiss: true ,positionClass:'toast-top-left' };
      this.toastrManager.success('success.',null,options);

  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  isReserve(hebergement){  
    var isReserve:boolean=true;
    if(this.reservehotel.length!=0){
      for(var i = 0; i < this.reservehotel.length; i++){
        if(hebergement==this.reservehotel[i].ih){
          isReserve=false;
          
          break;
        }
     }
    }
    return isReserve ;
  }
  isAnnule(hebergement){
    for(var i = 0; i < this.reservehotel.length; i++){
      if(hebergement==this.reservehotel[i].ih){
        this.reservehotel.splice(i,1);
        localStorage.removeItem("_rhb");
        localStorage.setItem('_rhb',JSON.stringify(this.reservehotel));
        this.disabled=false;
      }
  }
}
}
