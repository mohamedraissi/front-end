import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../../../services/auth.service';
import { ValidateService } from '../../../services/validate.service';

declare var $ :any;
@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  _token=localStorage.getItem("_token") ;
  _dd=JSON.parse(localStorage.getItem("_bt")).depart || '';
  _df=JSON.parse(localStorage.getItem("_bt")).arrive || '';
  _days=JSON.parse(localStorage.getItem("_bt")).days || '';
  listSelect:any[]=JSON.parse(localStorage.getItem("listSelect")) || [];
  rhb:any[]=JSON.parse(localStorage.getItem("_rhb")) || [] ;
  rrb:any[]=JSON.parse(localStorage.getItem("_rrb")) || [] ;
  rvb:any[]=JSON.parse(localStorage.getItem("_rvb")) || [] ;
  rb:any[]=[];
  rr:any[]=[];
  rv:any[]=[];
  hotel:any[];
  resto:any[];
  visite:any[];
  userLogin1= {
    email:"",
    password:"",
   }
   userlogged={
    email: "" ,
  };
  constructor(private bookingService:BookingService, private toastrManager: ToastsManager,vcr: ViewContainerRef ,private validate:ValidateService,private authService:AuthService,) { }
  
  ngOnInit() {
    for(var i in this.rhb){
      this.rb.push(this.rhb[i].ih);
    }
    for(var i in this.rrb){
      this.rr.push(this.rrb[i].ir);
    }
    for(var i in this.rvb){
      this.rv.push(this.rvb[i].ivs);
    }
    this.bookingService.getHotelRes(this.rb).subscribe(data => {this.hotel=data;})
    this.bookingService.getHotelRes(this.rr).subscribe(data => {this.resto=data;console.log(data)})
    this.bookingService.getHotelRes(this.rv).subscribe(data => {this.visite=data;})
  }
  convertDate(date){
    var d_m_y=date.split("/");
    return new Date(d_m_y[1]+"/"+d_m_y[0]+"/"+d_m_y[2] );
  }
  reserve(login){
    var tabs=[];
    var tabSelect:any=[{}];
    for(var i in this.listSelect){
      var d_m_y_f=this.listSelect[i].dateArrive.split("/");
      var d_m_y_d=this.listSelect[i].dateDepart.split("/");
      var dateDepart =new Date(d_m_y_d[1]+"/"+d_m_y_d[0]+"/"+d_m_y_d[2] );
      var dateArrive =new Date(d_m_y_f[1]+"/"+d_m_y_f[0]+"/"+d_m_y_f[2] );
      tabSelect[i]={ville_id:this.listSelect[i]._id,days:this.listSelect[i].days,date_debut:dateDepart,date_fin:dateArrive};
    }
    console.log(tabSelect);
    for(var i in this.rhb){
      tabs.push(this.rhb[i].ih);
    }
    for(var i in this.rrb){
      tabs.push(this.rrb[i].ir);
    }
    for(var i in this.rvb){
      tabs.push(this.rvb[i].ivs);
    }
    if(localStorage.getItem("_token")){
      console.log(this._token)
      let options = { showCloseButton: true, tapToDismiss: true ,positionClass:'toast-top-left' };
      this.toastrManager.success('success.',null,options);
      var date_created=this.convertDate(new Date().toLocaleDateString());
      this.bookingService.ReserveUser([this._token,this._dd,this._df,this._days,tabs,tabSelect,date_created]).subscribe(data => {});
    }
    else{
    login.show();
    }
  }
 
  onLoginSubmitRes(formRes,f){
      //console.log(formRes.value)
      console.log("ezezez")
      this.authService.loginUser(this.userLogin1).subscribe(data => {
        if(data.success){
          this.authService.storeUserData(data.user)
          this.authService.getUser().subscribe(data => {
            console.log(data)
            this.userlogged.email=data.user.email;
           },err => {}
       
         );
          //this.router.navigate(['']);
          f.hide();
          let options = { showCloseButton: true , animate:'flyLeft'};
          this.toastrManager.custom('connecté',null,options);
       
        }
      });
  }
  logout(){
    localStorage.removeItem('currentUser.email');
    let options = { showCloseButton: true, tapToDismiss: true };
    this.toastrManager.success('déconnecté',null,options);
    //this.router.navigate(['']);
  }
}
