import { Injectable } from '@angular/core';
import  { createUserWithEmailAndPassword, deleteUser, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, verifyBeforeUpdateEmail} from 'firebase/auth'
import { User } from '../models/user';
import { Persona } from '../models/persona';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

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
        const listaAdministradores = JSON.parse(localStorage.getItem('listAdm') || '[]') as Persona[];
        const listaUsuarios = JSON.parse(localStorage.getItem('listUser') || '[]') as Persona[];
        const usuarioAdmin = listaAdministradores.find(admin => admin.email === usuario.email && admin.rolAdministrativo === true);
        if (usuarioAdmin) {
          return usuarioAdmin; 
        }
        const usuarioCliente = listaUsuarios.find(user => user.email === usuario.email);
        if (usuarioCliente) {
          return usuarioCliente;
        }
        return null; 
      });
  }
  
  loginGoogle(){
    return signInWithPopup(getAuth(),new GoogleAuthProvider)
    .then((result) => {
      return getAdditionalUserInfo(result)?.isNewUser;
    })
    .catch((error) => {
      console.error("Error al iniciar sesión con Google:", error);
    });
  }
  
  getInfo(){
    return getAuth().currentUser
  }

  logout(){
    return signOut(getAuth())
  }
  isAutheticate():boolean{
    const user = getAuth().currentUser
    return user!==null
  }
  deleteCuentaPerma(){
    return getAuth().currentUser?.delete().then(
      ()=>{
        console.log("Usuario eliminado con éxito");
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario: ", error);
      });
  }
}
