import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
  reserveResto:any[]=JSON.parse(localStorage.getItem("_rrb")) || [];
  constructor(private bookingService:BookingService , private toastrManager: ToastsManager,vcr: ViewContainerRef) { }

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
  reserveBooking(reseve,fluid){
    this.reserveResto.push(reseve);
    localStorage.setItem('_rrb',JSON.stringify(this.reserveResto));
    fluid.hide();
    let options = { showCloseButton: true, tapToDismiss: true ,positionClass:'toast-top-left' };
      this.toastrManager.success('success.',null,options);

  }
  isReserve(hebergement){  
    var isReserve:boolean=true;
    if(this.reserveResto.length!=0){
      for(var i = 0; i < this.reserveResto.length; i++){
        if(hebergement==this.reserveResto[i].ir){
          isReserve=false;
          
          break;
        }
     }
    }
    return isReserve ;
  }
  isAnnule(hebergement){
    for(var i = 0; i < this.reserveResto.length; i++){
      if(hebergement==this.reserveResto[i].ir){
        this.reserveResto.splice(i,1);
        localStorage.removeItem("_rrb");
        localStorage.setItem('_rrb',JSON.stringify(this.reserveResto));
      }
  }
}

}
