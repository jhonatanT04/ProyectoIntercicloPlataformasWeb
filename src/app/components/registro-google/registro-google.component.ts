import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { Router } from '@angular/router';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Persona } from '../../models/persona';
import { JWTService } from '../../services/jwt.service';


@Component({
  selector: 'app-registro-google',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro-google.component.html',
  styleUrl: './registro-google.component.scss'
})
export class RegistroGoogleComponent {


  servicioAuthetication = inject(AuthentificServiceService)
  router = inject(Router)
  servicioUser = inject(UsuariosServiceService)
  showDangerAlert = false
  textError = ''

  form = new FormGroup({
    name: new FormControl(this.servicioAuthetication.getInfo()?.displayName?.split(" ")[0], [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl(this.servicioAuthetication.getInfo()?.displayName?.split(" ")[1], [Validators.required,Validators.minLength(2)],),
    numberPhone: new FormControl(this.servicioAuthetication.getInfo()?.phoneNumber, [Validators.required,Validators.pattern(/^\d{10}$/)]),
    addres: new FormControl('', [Validators.required]),
    codeZip: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)]),
  })

  constructor(private personaService:UsuariosServiceService,private JWTservice:JWTService){}

  registrarse() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const persona: Persona = new Persona(
        0,  
        this.servicioAuthetication.getInfo()?.email || '',
        this.servicioAuthetication.getInfo()?.uid || '',
        this.form.get('name')?.value || '',
        this.form.get('lastName')?.value || '',
        this.form.get('numberPhone')?.value || '',
        this.form.get('addres')?.value || '',
        this.form.get('codeZip')?.value || '',
        false, 
        undefined  
      );
      this.personaService.createPersona(persona).subscribe({
        next: () => {
          this.JWTservice.serverLogin({email: persona.email ,password:persona.password}).subscribe({
            next: (a)=> this.router.navigate(['/pages/perfil'])
          })
          
        },
        error: () => {
          this.alertError("Error al registrar el usuario.");
        }
      });
    } else {
      this.alertError("Complete los campos correctamente.");
    }
  }

  alertError(error: string) {
    setTimeout(() => {
      this.textError = error
      this.showDangerAlert = true;
    }, 4);
    this.textError = ''
    this.showDangerAlert = false;
  }
}
