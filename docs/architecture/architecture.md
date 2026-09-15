Arquitectura

1. Objetivo

Apolo utilizará una arquitectura desacoplada entre el backend y los clientes.

El backend será responsable de proporcionar la lógica de negocio y exponer una API que pueda ser consumida por diferentes tipos de clientes.

La primera implementación contempla un frontend web independiente y un backend desarrollado con Spring Boot.

2. Arquitectura inicial

Backend -> HTTP / REST -> Frontend

Actualmente ambos componentes se ejecutan de forma independiente durante el desarrollo.

Backend

El backend está desarrollado con:

Java 17.
Spring Boot.
Maven.

Su responsabilidad será proporcionar:

API REST.
Lógica de negocio.
Acceso y gestión de datos.
Autenticación y autorización cuando se incorpore esta funcionalidad.
Comunicación en tiempo real cuando sea necesaria.
Frontend

El frontend actualmente utiliza:

HTML.
CSS.
JavaScript.

Su responsabilidad será proporcionar la interfaz con la que interactúa el usuario y consumir los servicios proporcionados por el backend.

3. Comunicación

La comunicación entre frontend y backend se realiza mediante HTTP.

Actualmente existe un endpoint de prueba:

GET /api/hello

que devuelve:
Hola desde Apolo

El frontend realiza la petición mediante la API fetch de JavaScript.

Ejemplo conceptual:

Frontend
│
│ GET /api/hello
▼
Backend
│
│ "Hola desde Apolo"
▼
Frontend 4. Desarrollo local

Durante el desarrollo, los componentes utilizan puertos independientes:

Frontend → http://localhost:5500
Backend → http://localhost:8080

Debido a que ambos componentes utilizan orígenes diferentes, el backend permite explícitamente las peticiones procedentes del frontend mediante CORS.

Esta configuración corresponde únicamente al entorno de desarrollo actual y deberá revisarse cuando se establezca la arquitectura de despliegue.

5. Desacoplamiento

El backend no debe depender de una implementación concreta del cliente.

La intención es que diferentes clientes puedan consumir la misma API:

                         ┌─────────────┐
                         │   Backend   │
                         │ Spring Boot │
                         └──────┬──────┘
                                │
                   ┌────────────┼────────────┐
                   │            │            │
                   ▼            ▼            ▼
                Web         Escritorio      Móvil

Esto permitirá evolucionar cada cliente de manera independiente sin tener que duplicar la lógica principal del servidor.

6. Evolución prevista

La arquitectura inicial no pretende definir todas las tecnologías finales del proyecto.

A medida que Apolo crezca podrán incorporarse nuevas herramientas y componentes cuando exista una necesidad concreta.

Entre las posibles evoluciones se encuentran:

Framework frontend.
Aplicación de escritorio mediante una tecnología basada en WebView.
Cliente móvil.
Base de datos.
Autenticación.
WebSockets para funcionalidades en tiempo real.
Servicios adicionales relacionados con la reproducción y gestión de música.

Estas decisiones se tomarán progresivamente y se documentarán cuando sean incorporadas al proyecto.
