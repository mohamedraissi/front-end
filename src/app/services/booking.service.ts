import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class BookingService {

  constructor(private http:Http) { }
  getVille(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/ville',{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getHotel(hotel){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/hotel/'+hotel,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getHotelRes(hotel){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/hotelres/'+hotel,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getResto(resto){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/resto/'+resto,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getRestoRes(hotel){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/restores/'+hotel,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getVisite(visite){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/visite/'+visite,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getVisiteRes(hotel){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/visiteres/'+hotel,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  ReserveUser(user:any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/reserve/',user,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getInfo(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/userInfo/'+id,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  getOneBooking(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/oneRes/'+id,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
  
  getBooking(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/userRes/'+user,{headers:headers,withCredentials:true})
    .map(res => res.json());
  }
}
