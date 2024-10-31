import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdministadoresComponent } from './components/administadores/administadores.component';
import { GestionEspaciosComponent } from './pages/gestion-espacios/gestion-espacios.component';
import { LoginComponent } from './pages/login/login.component';
import { PantallaCargaComponent } from './pages/pantalla-carga/pantalla-carga.component';
import { guardsAuthGuard } from './guards/guards-auth.guard';

export const routes: Routes = [
    {
        path: 'pages/usuarios',
        component: UsuariosComponent
    },
    {
        path: 'pages/gestion',
        component: GestionEspaciosComponent
    },
    {
        path: 'pages/login',
        component: LoginComponent
    },
    {
        path: '',
        component: PantallaCargaComponent
    },
    // {
    //     path: 'dasholder',
    //     canActivate:[guardsAuthGuard],
    //     loadComponent:()=> import('pages/login'),
    // }
    
    
];
