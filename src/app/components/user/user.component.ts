import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{Router, Params,ActivatedRoute} from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  _token=localStorage.getItem("_token") || '';
  user:Object={
    nom:"",
    prenom:"",
  };
  info:any[]=[];
  booking:any[]=[];
  constructor(private authService:AuthService,
              private router:Router,private bookingService:BookingService,) {}

  ngOnInit() {

    this.authService.getUser().subscribe(data => {
     this.user=data.user;
     console.log(data.user);
    },err => {}

  );
 
 this.bookingService.getBooking(this._token).subscribe(data => {
  this.booking=data
  console.log(data);
  
 },err => {}

);
  }
  date(date){
    
    //alert(d);
   return new Date(date).toLocaleDateString();
  }
}
