import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, deleteUser, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { User } from '../models/user';
import { Persona } from '../models/persona';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthentificServiceService {

  constructor() { }

  // Obtiene la instancia actual de autenticación de Firebase.
  getAuth() {
    return getAuth();
  }

  // Registra un nuevo usuario con email y contraseña.
  regitrase(usuario: User) {
    console.log(usuario.password + 'xd');
    return createUserWithEmailAndPassword(getAuth(), usuario.email, usuario.password);
  }

  // Inicia sesión con email y contraseña, y verifica si es un administrador.
  login(usuario: User): Promise<Persona | null> {
    return signInWithEmailAndPassword(this.getAuth(), usuario.email, usuario.password)
      .then(async (userCredential) => {
        this.userEmail = usuario.email;
        const listaAdministradores = JSON.parse(localStorage.getItem('listUser') || '[]') as Persona[];
        const usuarioAdmin = listaAdministradores.find(admin => admin.email === usuario.email && admin.rolAdministrativo === true);
        if (usuarioAdmin) {
          return usuarioAdmin;
        }
        return null;
      });
  }

  // Inicia sesión con una cuenta de Google y verifica si es un usuario nuevo o administrador.
  loginGoogle() {
    return signInWithPopup(getAuth(), new GoogleAuthProvider()).then((result) => {
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalUserInfo?.isNewUser;
      const listaAdministradores = JSON.parse(localStorage.getItem('listUser') || '[]') as Persona[];
      const usuarioAdmin = listaAdministradores.find(admin => admin.email === this.getInfo()?.email);
      
      return { isNewUser, usuarioAdmin };
    });
  }

  // Obtiene la información del usuario actualmente autenticado.
  getInfo() {
    return getAuth().currentUser;
  }
  
  private userEmail: string = '';

  // Retorna el email del usuario autenticado almacenado localmente.
  getUserEmail() {
    return this.userEmail;
  }

  // Cierra la sesión del usuario actual.
  logout() {
    return signOut(getAuth());
  }

  // Verifica si hay un usuario autenticado actualmente.
  isAutheticate(): boolean {
    const user = getAuth().currentUser;
    return user !== null;
  }

  // Elimina permanentemente la cuenta del usuario actual.
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
