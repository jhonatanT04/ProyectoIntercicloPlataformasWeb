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

export const routes: Routes = [
    {
        path: 'pages/usuarios',
        component: UsuariosComponent
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
        path: 'pages/parqueaderos',
        component: GestionEspaciosComponent
    },
    {
        path: 'pages/contratos',
        component: ContratosComponent
    },
    {
        path: 'pages/tarifas',
        component: TarifasComponent
    },
    {
        path: 'pages/horarios',
        component: HorariosComponent
    },
    {
        path: 'pages/lista',
        component: ListaUsuariosComponent
    },
    {
        path: 'pages/actualizar',
        component: ActualizarPerfilComponent
    },
    // {
    //     path: 'pages/perfil',
    //     component: PerfilComponent
    // },
    {
        path: 'pages/perfil',
        canActivate:[guardsAuthGuard],
        loadComponent:()=>import('./pages/perfil/perfil.component')
        .then(comp=> comp.PerfilComponent),
    }
    
];
