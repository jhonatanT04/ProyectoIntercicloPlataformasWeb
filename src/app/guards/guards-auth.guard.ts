import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthentificServiceService } from '../services/authentific-service.service';

export const guardsAuthGuard: CanMatchFn = (route, state) => {
  const router = inject(Router)
  const authServi = inject(AuthentificServiceService)
  console.log(authServi.isAutheticate())
  if(authServi.isAutheticate()){
    return true
  }else{
    router.navigate(['pages/login'])
    return false;
  }  
  return true
};
