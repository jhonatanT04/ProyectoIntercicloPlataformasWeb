import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {initializeApp} from 'firebase/app';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

const firebaseConfig = {
  apiKey: "AIzaSyDOZ-vpnqt1ls05BBkIIE4GMTSK4BxO2BQ",
  authDomain: "proyectointerciclo-5b9a1.firebaseapp.com",
  projectId: "proyectointerciclo-5b9a1",
  storageBucket: "proyectointerciclo-5b9a1.appspot.com",
  messagingSenderId: "220944298224",
  appId: "1:220944298224:web:4ae3eeff99f23079d5d235",
  measurementId: "G-J9NCNFVHYW"
};

initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    importProvidersFrom(HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule), provideAnimationsAsync(),provideHttpClient()
  ]
};
