# FrontAlertasMedicas 🏥

Este proyecto es la interfaz FrontEnd para el **Sistema de Gestión de Alertas Médicas en Tiempo Real**, desarrollado para la Actividad Sumativa de la Experiencia 3. La aplicación está construida con **Angular 21** y diseñada bajo lineamientos de arquitectura Cloud Native y alta disponibilidad.

## 🚀 Características Principales

* **Gestión de Señales Vitales**: Módulo avanzado para la visualización, monitoreo y gestión de alertas críticas de pacientes en tiempo real.
* **Seguridad IDaaS**: Implementación de autenticación robusta mediante Microsoft Azure AD, garantizando el acceso restringido a personal médico autorizado.
* **Arquitectura Responsiva**: Interfaz adaptada a dispositivos móviles, tablets y escritorio mediante el sistema de GRID de 12 columnas de Bootstrap.
* **Seguridad y Calidad**: Validaciones en formularios y cumplimiento de métricas de cobertura de código mediante SonarQube y Vitest (Meta de cobertura >90%).
* **Contenedorización**: Integración total con Docker, asegurando portabilidad y consistencia entre los entornos de desarrollo y producción.

## 🛠️ Tecnologías Utilizadas

* **Framework**: Angular 21 (Sintaxis moderna de Control Flow: `@if`, `@else`).
* **Autenticación**: MSAL Angular (Identity as a Service - Azure AD).
* **Testing**: Vitest + AnalogJS para pruebas unitarias de alto rendimiento.
* **Estilos**: Bootstrap 5 (Layout responsivo y componentes de UI).
* **Comunicación**: HttpClient con Interceptors para securitización de peticiones REST.
* **Orquestación**: Docker Compose para el entorno de desarrollo local.

## 🏗️ Arquitectura del Sistema

La aplicación sigue el patrón **Smart & Dumb Components** para optimizar el flujo de datos:

* **Smart Components**: Gestionan la lógica de negocio, la inyección de servicios (ej. `AlertasService`) y la comunicación con el BFF.
* **Dumb Components**: Se enfocan exclusivamente en la presentación (ej. `HeaderComponent`, `FooterComponent`), facilitando la reusabilidad y el testeo unitario.

## 📂 Estructura de Directorios

```text
src/app/
├── components/          # Vistas organizadas por funcionalidad
│   ├── alertas/         # Visualización y gestión de signos vitales
│   ├── header/          # Navegación securitizada
│   ├── login/           # Flujo de autenticación con Azure
├── models/              # Contratos de datos (alerta.ts)
├── services/            # Lógica de comunicación con APIs REST
│   ├── auth.ts          # Gestión de tokens y sesión
│   ├── alertas.ts       # Servicio de gestión de alertas
├── app.routes.ts        # Enrutamiento protegido por MsalGuard
└── app.config.ts        # Configuración global e interceptores