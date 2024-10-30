import { Injectable } from '@angular/core';
import  { createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthentificServiceService {

  constructor() { }
  getAuth(){
    return getAuth();
  }
  
  regitrase(email:string,password:string){
    return createUserWithEmailAndPassword(getAuth(),email,password)
  }
}
