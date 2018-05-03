import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import{Router} from '@angular/router';
//import { CompleterService, CompleterData } from 'ng-mdb-pro/pro';
declare var $ :any;
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  ville=['Ariana','Béja','Ben Arous','Bizerte','Gabès','Jendouba','Kasserine','Kébili','Le Kef','Mahdia','La Manouba','Médenine',
  'Monastir','Nabeul','Sfax','Sidi Bouzid','Siliana','Sousse','Tataouine','Tozeur','Tunis','Zaghouan'];
  villeForm: FormGroup;
  bt=JSON.parse(localStorage.getItem("_bt")) ||  [] ;

  showDropDown=false;
  constructor(private fb: FormBuilder , private router:Router) {
    this.initForm();
   }

  ngOnInit() {
    if(this.bt.length == 0){
      this.bt.origin='';
      this.bt.depart='';
      this.bt.arrive='';
      this.bt.voyageur='';
      
    }
    //$("input[type=Destination]").attr("min","2018-04-24")
    
  }
  initForm(): FormGroup {
    return this.villeForm = this.fb.group({
      search: [null],
      depart:[null],
      arrive:[null],
      voyaguer:[null]
    })
  }
  toggeleDropDown(){
    this.showDropDown=!this.showDropDown;
    
  }
  selectValue(value) {
    this.villeForm.patchValue({"search": value});
    this.showDropDown = false;
  }
  getSearchValue() {
    return this.villeForm.value.search;
  }
  onBookingSubmit(booking){
    var date1 = new Date(this.villeForm.value.depart);
    var date2 = new Date(this.villeForm.value.arrive);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var bt={days:diffDays,origin:this.villeForm.value.search,voyageur:this.villeForm.value.voyaguer,depart:this.villeForm.value.depart,arrive:this.villeForm.value.arrive,_rd:diffDays}
    console.log(this.villeForm.value.depart);
    localStorage.setItem("_bt",JSON.stringify(bt));
    this.router.navigate(['Booking']);
  }
}
