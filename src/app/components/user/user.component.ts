import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user:Object;
  constructor(private authService:AuthService,
              private router:Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe(data => {
     this.user=data.user;
     console.log(data.user);
    },err => {}

  );
  }

}
