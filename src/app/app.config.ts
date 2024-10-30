import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {initializeApp} from 'firebase/app';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import {AngularFireModule} from '@angular/'



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()
    //importProvidersFrom(HttpClientModule,AngularFireModule)
  ]
};
