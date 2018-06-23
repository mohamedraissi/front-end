import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import{Router} from '@angular/router';
import { Route } from '@angular/router/src/config';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Options } from 'selenium-webdriver/safari';
declare var $ :any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  verifyForm:boolean;
 userLogin= {
  email:"",
  password:"",
 }
    user = {
    name:"",
    firstName:"",
    email:"",
    tel:"",
    adress:"",
    password:"",
    comfirmPass:"",
   }
   
    e:string= localStorage.getItem("currentUser.email") || "" ;
   
  constructor(private validate:ValidateService,
              private authService:AuthService,
              private router:Router,
              private flashMessagesService: FlashMessagesService,
              private toastrManager: ToastsManager,vcr: ViewContainerRef
  ) { 
    this.toastrManager.setRootViewContainerRef(vcr);
  }
  ngOnInit() {

    
   console.log(this.e)
  }
   onRegisterSubmit({value,valid},f){
     if(this.validate.validateRegister(value)){
     f.hide();
     this.authService.registerUser(this.user).subscribe(data => {
        if(data.success){
          this.flashMessagesService.show('register!', { cssClass: 'alert-success', timeout: 4000 });
          this.router.navigate(['']);
        }
     },
        err => {
          console.log("Error occured"+err);
        }
    );
     }
     else{
       this.verifyForm=true;
     }
  }
  onLoginSubmit({value,valid},f){
    if(this.validate.validateLogin(value)){

      this.authService.loginUser(this.userLogin).subscribe(data => {
        if(data.success){
          this.authService.storeUserData(data.user)
          this.authService.getUser().subscribe(data => {
            this.e=data.user.email;
            console.log(data.user.email)
           },err => {}
       
         );
          //this.router.navigate(['']);
          f.hide();
          let options = { showCloseButton: true , animate:'flyLeft'};
          this.toastrManager.custom('connecté',null,options);
       
        }
      });
    }
    else{

    }
  }
  logout(){
    this.authService.logout();
    let options = { showCloseButton: true, tapToDismiss: true };
    this.toastrManager.success('déconnecté',null,options);
    //this.router.navigate(['']);
  }
}
