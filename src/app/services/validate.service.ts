import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
  constructor() { }
   validateRegister(user){
     if(user.name=="" || user.firstName =="" || user.email =="" || user.address == "" || user.password == "" || user.comfirmPass == "" || user.tel == "" ){
      return false ;
     }
     else {
       return true ;
     }

   }
   validateLogin(user){
    if(user.email =="" || user.password == "" ){
      return false ;
     }
     else {
       return true ;
     }
   }
}
