import { Injectable } from '@angular/core';
import  { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, verifyBeforeUpdateEmail} from 'firebase/auth'
import { User } from '../models/user';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class AuthentificServiceService {

  constructor() { }
  getAuth(){
    return getAuth();
  }
  
  regitrase(usuario:User){
    console.log(usuario.password+'xd')
    return createUserWithEmailAndPassword(getAuth(),usuario.email,usuario.password)
  }
  login(usuario: User): Promise<Persona | null> {
    return signInWithEmailAndPassword(this.getAuth(), usuario.email, usuario.password)
      .then(async (userCredential) => {
        const listaAdministradores = JSON.parse(localStorage.getItem('listUser') || '[]') as Persona[];
        const usuarioAdmin = listaAdministradores.find(admin => admin.email === usuario.email && admin.rolAdministrativo === true);
        return usuarioAdmin ? usuarioAdmin : null;
      });
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
  
  isNewCliente(){
    return
  }
}
