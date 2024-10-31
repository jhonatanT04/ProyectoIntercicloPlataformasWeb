import { Injectable } from '@angular/core';
import  { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
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
  login (email:string,password:string){
    return signInWithEmailAndPassword(getAuth(),email,password)
  }
  loginGoogle(){
    return signInWithPopup(getAuth(),new GoogleAuthProvider)
  }
  logout(){
    return signOut(getAuth())
  }
  isAutheticate():boolean{
    const user = getAuth()
    return user!==null
  }
}
