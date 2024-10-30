import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdministadoresComponent } from './components/administadores/administadores.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AdministadoresComponent,UsuariosComponent,RouterModule,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProyectopIntercicloPlataformasWeb';
}
