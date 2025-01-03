import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

import { GestionEspaciosComponent } from './pages/gestion-espacios/gestion-espacios.component';
import { LoginComponent } from './pages/login/login.component';
import { PantallaCargaComponent } from './pages/pantalla-carga/pantalla-carga.component';
import { guardsAuthGuard } from './guards/guards-auth.guard';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ActualizarPerfilComponent } from './pages/actualizar-perfil/actualizar-perfil.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistroGoogleComponent } from './components/registro-google/registro-google.component';

export const routes: Routes = [
    {
        path: 'pages/usuarios',
        component: UsuariosComponent,
        
    },
    {
        path: 'components/registro-google',
        canActivate:[guardsAuthGuard],
        loadComponent:()=>import('./components/registro-google/registro-google.component')
        .then(comp=> comp.RegistroGoogleComponent),
    },
    // {
    //     path: 'pages/administrador',
    //     component: AdministadoresComponent
    // },
    {
        path: 'pages/login',
        component: LoginComponent
    },
    {
        path: '',
        component: PantallaCargaComponent
    },
    {
        path: 'pages/administrador',
        canActivate:[guardsAuthGuard],
        loadComponent:()=>import('./components/administadores/administadores.component')
        .then(comp=> comp.AdministadoresComponent),
        
    },
    {
        path: 'pages/actualizar',
        canActivate:[guardsAuthGuard],
        loadComponent:()=>import('./pages/actualizar-perfil/actualizar-perfil.component')
        .then(comp=> comp.ActualizarPerfilComponent),
    },
    {
        path: 'pages/perfil',
        canActivate:[guardsAuthGuard],
        loadComponent:()=>import('./pages/perfil/perfil.component')
        .then(comp=> comp.PerfilComponent),
    }
    
];
