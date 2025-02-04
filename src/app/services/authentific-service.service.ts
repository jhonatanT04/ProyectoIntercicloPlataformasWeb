import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, deleteUser, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { User } from '../models/user';
import { Persona } from '../models/persona';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosServiceService } from './usuarios-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificServiceService {
  
  constructor(private http: HttpClient,private serviceUsers:UsuariosServiceService) { }
  getAuth() {
    return getAuth();
  }
  regitrase(usuario: User) {
    return createUserWithEmailAndPassword(getAuth(), usuario.email, usuario.password);
  }
  login(usuario: User): Promise<Persona | null> {
    return signInWithEmailAndPassword(this.getAuth(), usuario.email, usuario.password)
      .then(async (userCredential) => {
        this.userEmail = usuario.email;
        this.serverLogin(usuario)
        const usuarioAdmin = this.serviceUsers.buscarUsuarioPorEmail(usuario.email);
        if (usuarioAdmin) {
          return usuarioAdmin;
        }
        return null;
      });
  }

  loginGoogle() {
    return signInWithPopup(getAuth(), new GoogleAuthProvider()).then((result) => {
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalUserInfo?.isNewUser;
      const listaAdministradores = JSON.parse(localStorage.getItem('listUser') || '[]') as Persona[];
      
      const usuarioAdmin = listaAdministradores.find(admin => admin.email === this.getInfo()?.email);
      const uid = user?.uid;
      console.log(uid);
      return { isNewUser, usuarioAdmin ,uid};
    });
  }

  getInfo() {
    return getAuth().currentUser;
  }
  
  private userEmail: string = '';

  getUserEmail() {
    return this.userEmail;
  }
  
  logout() {
    this.deleteToken();
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

  private apiUrl = 'http://localhost:8080/demo65/rs/auth/login'; 
  
  serverLogin(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  
  saveToken(token: string): void {
    localStorage.setItem('token', token);  // Guardamos el token en el localStorage
  }

  
  getToken(): string | null {
    return localStorage.getItem('token');  
  }

  
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;  
  }

  
  deleteToken(): void {
    localStorage.removeItem('token');   
  }





}
