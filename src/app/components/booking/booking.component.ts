import { Component, OnInit ,ViewContainerRef } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { DirectionsMapDirective } from '../../derective/map.derective';
import { ChangeDetectorRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var google: any;
declare var $ :any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  latu: number = 36.8520691;
  long: number = 10.311029399999999;
  _bt:any=JSON.parse(localStorage.getItem("_bt")) || null;
  date:Date=JSON.parse(localStorage.getItem("_bt")).depart || null;
  villes:any[];
  listSelect:any[]=JSON.parse(localStorage.getItem("listSelect")) || [];
  listRoute:object[]=JSON.parse(localStorage.getItem("listRoute")) || [];
  listVille:object[]=JSON.parse(localStorage.getItem("listville")) || [];
  newRoute:object[]=[];
  isRouteActive:boolean;
  map:string;
  bl:string;
  constructor(private ref: ChangeDetectorRef,
    private bookingService:BookingService,
    private toastrManager: ToastsManager,vcr: ViewContainerRef) { 
    this.toastrManager.setRootViewContainerRef(vcr);
  }

  ngOnInit() { 
    console.log(this._bt.origin)
    var winH=$(window).height();
    this.map=parseInt(winH)-( 79 )+"px";
   $('.block-overflow').css({
    "height": parseInt(winH)-(165)+"px",
    "overflow": "scroll"});
    $('.block-iti').css({
      "height": parseInt(winH)-(260)+"px",
      "overflow": "scroll"});
    var block_cal=$(".blockD").innerHeight()+25;
    this.bl= parseInt(block_cal)+"px";
    this.bookingService.getVille().subscribe(data => {
     this.villes=data.ville;
    });
    //this.bookingService.getHotel(this.listVille).subscribe(data => {console.log(data)})
    if(JSON.parse(localStorage.getItem("listSelect")).length > 0 ){
      this.isRouteActive=true;
      this.newRoute.push({new:1})
    }
    else{
      this.isRouteActive=false;
    }
    
  }
  addRoute(ville){
    if(this.listSelect.length<1){
      var dateDepart =new Date(this.date);
      var dateArrive =new Date(this.date);
      dateArrive.setDate(dateDepart.getDate()+ 1)
    }
    else{
      var d_m_y=this.listSelect[this.listSelect.length-1].dateArrive.split("/");
      var dateDepart =new Date(d_m_y[1]+"/"+d_m_y[0]+"/"+d_m_y[2] );
      var dateArrive =new Date(d_m_y[1]+"/"+d_m_y[0]+"/"+d_m_y[2] );
      dateArrive.setDate(dateDepart.getDate() + 1)
    }
    if(this._bt._rd>0){
    this._bt._rd--;
    ville.days=1;
    ville.dateDepart=dateDepart.toLocaleDateString()
    ville.dateArrive=dateArrive.toLocaleDateString()
    this.listRoute.push( {location:{lat:ville.lat,lng:ville.long}});
    this.newRoute.push({new:1})
    this.listSelect.push(ville);
    this.listVille.push(ville._id);
    localStorage.removeItem("_bt");
    localStorage.setItem('_bt',JSON.stringify(this._bt));
    localStorage.setItem('listSelect',JSON.stringify(this.listSelect));
    localStorage.setItem('listRoute',JSON.stringify(this.listRoute));
    localStorage.setItem('listville',JSON.stringify(this.listVille));
    this.isRouteActive=true;
    console.log(JSON.parse(localStorage.getItem("listRoute")));
    }
    else{
      let options = { showCloseButton: true, tapToDismiss: true };
      this.toastrManager.error('Attention !!!!',null,options);
    }
  }
  removeRoute(i){
      this._bt._rd=this._bt._rd+this.listSelect[i].days;
      this.newRoute.push({new:1})
      this.listSelect.splice(i,1); 
      this.listRoute.splice(i,1);
      this.listVille.splice(i,1);
      localStorage.removeItem("_bt");
      localStorage.setItem('_bt',JSON.stringify(this._bt._rd));
      localStorage.removeItem("listRoute");
      localStorage.setItem('listRoute',JSON.stringify(this.listRoute));
      localStorage.removeItem("listSelect");
      localStorage.setItem('listSelect',JSON.stringify(this.listSelect));
      localStorage.removeItem("listville");
      localStorage.setItem('listville',JSON.stringify(this.listVille));
      if(this.listRoute.length<1){
        this.isRouteActive=false;
      }
      console.log(this.listRoute);
  }
  addDay(i){
    if(this._bt._rd>0){
      this._bt._rd--;
      this.listSelect[i].days++;
      console.log(this.listSelect[i].days);
      for(var k=i;k<this.listSelect.length;k++){
        var d_m_y=this.listSelect[k].dateArrive.split("/");
        var dateArrive = new Date(d_m_y[1]+"/"+d_m_y[0]+"/"+d_m_y[2] );
        dateArrive.setDate(dateArrive.getDate() + 1)
        this.listSelect[k].dateArrive=dateArrive.toLocaleDateString();
        console.log(!(this.listSelect.length-1==k))
        if(!(this.listSelect.length-1==k)){
          this.listSelect[k+1].dateDepart=dateArrive.toLocaleDateString();
        }
      }
      localStorage.removeItem("_bt");
      localStorage.setItem('_bt',JSON.stringify(this._bt));
      localStorage.removeItem("listSelect");
      localStorage.setItem('listSelect',JSON.stringify(this.listSelect));
    }
    else{
      let options = { showCloseButton: true, tapToDismiss: true };
      this.toastrManager.error('Attention Votre voyage n\'est pas assez long. Vous pouvez prolonger votre voyage ou ajuster la durée dans les autres villes.',null,options);
    }
    
  }
  subDay(i){
    if((0<this._bt._rd)|| (this._bt._rd <this._bt.days)  ){
      if(this.listSelect[i].days>1){
        this._bt._rd++;
        this.listSelect[i].days--;
        localStorage.removeItem("_bt");
        localStorage.setItem('_bt',JSON.stringify(this._bt));
        localStorage.removeItem("listSelect");
        localStorage.setItem('listSelect',JSON.stringify(this.listSelect));
      }
      else{
        let options = { showCloseButton: true, tapToDismiss: true };
      this.toastrManager.error('Attention Vous devez rester au moins un jour.',null,options);
        
      }
     
    }
    else{
      let options = { showCloseButton: true, tapToDismiss: true };
      this.toastrManager.error('Attention Votre voyage n\'est pas assez long. Vous pouvez prolonger votre voyage ou ajuster la durée dans les autres villes.',null,options);
    }
  }
}