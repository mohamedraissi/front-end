import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-navbarbooking',
  templateUrl: './navbarbooking.component.html',
  styleUrls: ['./navbarbooking.component.scss']
})
export class NavbarbookingComponent implements OnInit {
  listSelect=JSON.parse(localStorage.getItem("listSelect")) || [];
  constructor(private router:Router) { 
    console.log(this.listSelect.length);
  }

  ngOnInit() {
  }

}
