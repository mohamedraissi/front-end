import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import{Router,Params,ActivatedRoute} from '@angular/router';
import { BookingService } from '../../../services/booking.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user:Object={
    nom:"",
    prenom:"",
  };
  info:any[];
  markers:any[];
  constructor(private authService:AuthService,
    private router:Router,private bookingService:BookingService,private actRoute:ActivatedRoute) { }

  ngOnInit() {
    let id =this.actRoute.snapshot.params.id ;
    this.authService.getUser().subscribe(data => {
      this.user=data.user;
      console.log(this.user);
     },err => {}
 
   );
   this.bookingService.getInfo(id).subscribe(data => {
    this.info=data.info;
   
    console.log(data);
   },err => {}

 );
 this.bookingService.getOneBooking(id).subscribe(data => { 
   this.markers=data.marker_id;
  console.log(data.marker_id);
 },err => {}

);
  }
  date(date){
    return new Date(date).toLocaleDateString();
   }
}
