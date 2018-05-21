
import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class AuthService {
  constructor( private http:Http) { }
  registerUser(user:any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/user',user,{headers:headers})
    .map(res => res.json());
  }
  loginUser(user:any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/login',user,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
    storeUserData(user){
      localStorage.setItem('currentUser.email', user.email);
      localStorage.setItem('_token', user._id);

    }
  loggedIn():boolean{
    return localStorage.getItem('currentUser.email') != undefined;
  }
  logout(){
    localStorage.removeItem('currentUser.email');
    localStorage.removeItem('_token');

  }
  getUser(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/user',{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
}

