
# Sistema de Parqueadero con Autenticación Firebase

Este proyecto es una **aplicación web** desarrollada con **Angular** que ofrece una **interfaz gráfica** para la gestión de un parqueadero.  
Incluye **autenticación de usuarios** mediante **correo electrónico** y **Google** usando **Firebase Authentication**.

## Funcionalidades

- **Interfaz gráfica intuitiva** para gestión de parqueadero.
- **Autenticación de usuarios** con Firebase:
  - **Correo y contraseña**
  - **Google Sign-In**
- **Control de sesión** (inicio/cierre).
- **Protección de rutas** (solo usuarios autenticados pueden acceder a la gestión).
- **Diseño responsive** usando SCSS.

---

## Instalación y Ejecución

### 1️ Clonar repositorio
```bash
git clone https://github.com/usuario/ProyectoIntercicloPlataformasWeb.git
cd ProyectoIntercicloPlataformasWeb
````

### 2️ Instalar dependencias

```bash
npm install
```

### 3️ Configurar Firebase

* Crear un proyecto en [Firebase Console](https://console.firebase.google.com/).
* Activar **Authentication** y habilitar:

  * Email/Password
  * Google
* Copiar la configuración del proyecto en el archivo `environment.ts`:

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  }
};
```

### 4️ Ejecutar en modo desarrollo

```bash
ng serve
```

La aplicación estará disponible en **[http://localhost:4200](http://localhost:4200)**

---

## Tecnologías Usadas

* **Angular**
* **Firebase Authentication**
* **TypeScript**
* **SCSS**
* **Node.js** (para configuración del servidor)


