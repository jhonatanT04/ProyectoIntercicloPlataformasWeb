import { Injectable } from '@angular/core';
import  { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthentificServiceService {

  constructor() { }
  getAuth(){
    return getAuth();
  }
  
  regitrase(usuario:User){
    return createUserWithEmailAndPassword(getAuth(),usuario.email,usuario.password)
  }
  login (usuario:User){
    return signInWithEmailAndPassword(getAuth(),usuario.email,usuario.password)
  }
  loginGoogle(){
    return signInWithPopup(getAuth(),new GoogleAuthProvider)
  }
  logout(){
    return signOut(getAuth())
  }
  isAutheticate():boolean{
    const user = getAuth().currentUser
    return user!==null
  }
}
