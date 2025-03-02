# Event Reservation App

![Angular](https://img.shields.io/badge/Angular-18-red?logo=angular)
![RxJS](https://img.shields.io/badge/RxJS-7-purple?logo=ReactiveX)
![SCSS](https://img.shields.io/badge/SCSS-Style-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blueviolet)
![ESLint](https://img.shields.io/badge/ESLint-Linted-green?logo=eslint)

## 📌 Descripción
Este proyecto es una aplicación de reserva de eventos desarrollada con **Angular 18**, utilizando una arquitectura modular basada en **programación reactiva con RxJS** y asegurando las mejores prácticas de **rendimiento y escalabilidad**.

## 📥 Instalación y Requisitos
### 🛠 Requisitos Previos
Para ejecutar este proyecto necesitas tener instalado:
- **Node.js** >= 16
- **Angular CLI** >= 18
- **NPM** o **Yarn**

### 🚀 Pasos de Instalación
```sh
# Clonar el repositorio
git clone https://github.com/usuario/event-reservation-app.git
cd event-reservation-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
ng serve --open
```

Esto iniciará la aplicación en `http://localhost:4200/`.

---

## 🚀 Características Principales
✅ Uso de **JSON como mock** para llamadas `getEvents` (cartelera) y `getEventInfo` (ficha evento).
✅ **Simulación de servidor** mediante `HttpClient`.
✅ Uso de imágenes (`simple-image.jpg`, `trash.png`) para eventos y carrito de compras.
✅ **Enrutamiento dinámico con Lazy Loading** con `@angular/router`.
✅ **Implementación de Guards** para seguridad en rutas.
✅ **Uso de Mixins en SCSS** para mejorar reutilización de estilos.
✅ **Responsive Design** con Bootstrap y `@angular/flex-layout`.
✅ **Arquitectura modular y desacoplada basada en principios SOLID**.
✅ **Estrategia de cambio OnPush** para mejorar el rendimiento.
✅ **Linting y estilado** con ESLint y TypeScript.
✅ **Carrito de compras como componente reutilizable**.
✅ **Ordenación de eventos con Pipes personalizados**.
✅ **Interceptors para manejar errores HTTP y redirecciones**.
✅ **Página de Not Found y Spinner para mejor experiencia de usuario**.

---

## 📂 Estructura del Proyecto
```plaintext
├── public
│   └── assets
│       ├── data   # JSONs con datos mock
│       └── img    # Imágenes de eventos y carrito
└── src
    └── app
        ├── core
        │   ├── components
        │   │   └── header
        │   ├── guards
        │   ├── interceptors
        │   ├── models
        │   └── services
        ├── features
        │   ├── event-detail
        │   │   └── event-detail
        │   └── event-list
        │       └── event-list
        └── shared
            ├── component
            │   └── shopping-cart
            ├── pages
            │   ├── not-found
            │   └── spinner
            └── pipes
```

---

## 📦 Tecnologías Utilizadas
- **Angular 18**: Framework principal.
- **RxJS**: Manejo de programación reactiva.
- **Bootstrap 5**: Diseño y estilos.
- **SCSS con Mixins**: Mejora la reutilización de estilos.
- **ESLint**: Linter de TypeScript para mantener código limpio.
- **@angular/router**: Gestión de navegación con **guards y Lazy Loading**.
- **TypeScript**: Tipado fuerte para escalabilidad.
- **Interceptors**: Manejo de errores y redirecciones HTTP.
- **ChangeDetectionStrategy.OnPush**: Optimización del rendimiento.
- **Arquitectura SOLID**: Diseño desacoplado y modular.

---

## 🔀 Lazy Loading y Guards para Seguridad
El enrutamiento utiliza **Lazy Loading** para mejorar la carga de la aplicación y **guards** para restringir accesos no autorizados.
```typescript
export const routes: Routes = [
  { path: 'events', loadChildren: () => import('../app/features/event-list/event-list.module').then(m => m.EventListModule) },
  { path: 'events/:id', canActivate: [detailGuard], loadChildren: () => import('../app/features/event-detail/event-detail.module').then(m => m.EventDetailModule) },
  { path: 'not-found', loadComponent: () => import('../app/shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];
```

---

## 🎨 Uso de Mixins en SCSS
Los **mixins** se utilizan para mejorar la reutilización de estilos y facilitar la personalización.
```scss
@mixin theme-colors($header-color, $button-color) {
  .custom-header {
    background-color: $header-color;
    padding: 20px;
    box-shadow: 0px 8px 10px rgb(0, 0, 0);
  }

  :root {
    .btn-custom {
      background-color: $button-color;
      &:hover {
        background-color: lighten($button-color, 10%);
      }
    }
  }
}
@include theme-colors(#53acd5, #078aba);
```

---

## 🛠 Pipes Personalizados
### `orderByDate.pipe.ts` (Ordenar por fecha)
```typescript
@Pipe({ name: 'orderByDate', standalone: true })
export class OrderByDatePipe implements PipeTransform {
  public transform<T, K extends keyof T>(value: T[], key: K): T[] {
    return value.sort((a, b) => Number(a[key] ?? 0) - Number[b][key] ?? 0);
  }
}
```

---

## 💡 Contribución y Mejoras
🛠 **Futuras Implementaciones:**
- Gestión de **usuarios y autenticación**.
- Mejor accesibilidad con **WAI-ARIA**.

📌 _Desarrollado con Angular 18, ESLint y las mejores prácticas para escalabilidad._ 🚀

---

## ✍️ Autor
**danideveloperweb**

