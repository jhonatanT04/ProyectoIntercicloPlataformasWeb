import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, deleteUser, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { User } from '../models/user';
import { Persona } from '../models/persona';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { UsuariosServiceService } from './usuarios-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificServiceService {
  
  constructor(private http: HttpClient,private serviceUsers:UsuariosServiceService) { }
  getAuth() {
    return getAuth();
  }
  private userEmail: string = '';
  regitrase(usuario: User) {
    return createUserWithEmailAndPassword(getAuth(), usuario.email, usuario.password);
  }
  login(usuario: User) {
    return signInWithEmailAndPassword(this.getAuth(), usuario.email, usuario.password)
  }

  loginGoogle() {
    return signInWithPopup(getAuth(), new GoogleAuthProvider()).then((result) => {
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalUserInfo?.isNewUser;
      const uid = user?.uid;
      const email = user?.email;
      
      return { isNewUser,uid,email};
    });
  }

  getInfo() {
    return getAuth().currentUser;
  }
  
  
  getUserEmail() {
    return this.userEmail;
  }
  
  logout() {
    //this.deleteToken();
    return signOut(getAuth());
  }

  isAutheticate(): boolean {
    const user = getAuth().currentUser;
    return user !== null;
  }
  deleteCuentaPerma() {
    return getAuth().currentUser?.delete().then(
      () => {
        console.log("Usuario eliminado con éxito");
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario: ", error);
      });
  }

  




}
