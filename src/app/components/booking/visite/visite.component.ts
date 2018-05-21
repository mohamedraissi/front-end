import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
  reserveVisite:any[]=JSON.parse(localStorage.getItem("_rvb")) || [];
  constructor(private bookingService:BookingService , private toastrManager: ToastsManager,vcr: ViewContainerRef) { }
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
  reserveBooking(reseve,fluid){
    this.reserveVisite.push(reseve);
    localStorage.setItem('_rvb',JSON.stringify(this.reserveVisite));
    fluid.hide();
    let options = { showCloseButton: true, tapToDismiss: true ,positionClass:'toast-top-left' };
      this.toastrManager.success('success.',null,options);

  }
  isReserve(hebergement){  
    var isReserve:boolean=true;
    if(this.reserveVisite.length!=0){
      for(var i = 0; i < this.reserveVisite.length; i++){
        if(hebergement==this.reserveVisite[i].ivs){
          isReserve=false;
          
          break;
        }
     }
    }
    return isReserve ;
  }
  isAnnule(hebergement){
    for(var i = 0; i < this.reserveVisite.length; i++){
      if(hebergement==this.reserveVisite[i].ivs){
        this.reserveVisite.splice(i,1);
        localStorage.removeItem("_rvb");
        localStorage.setItem('_rvb',JSON.stringify(this.reserveVisite));
      }
  }
}
}
