Apolo

Aplicación de reproducción de música desarrollada con una arquitectura desacoplada entre cliente y servidor.

El objetivo del proyecto es construir una aplicación que permita utilizar un mismo backend desde diferentes clientes, como una aplicación web, de escritorio y, posteriormente, móvil.

Estado actual

El proyecto se encuentra en una etapa inicial de desarrollo.

Actualmente se dispone de:

Backend funcional con Spring Boot.
Frontend web básico con HTML, CSS y JavaScript.
Comunicación entre frontend y backend mediante HTTP/REST.
Configuración básica de CORS para el entorno de desarrollo.
Estructura

Apolo/
├── backend/ # API y lógica del servidor utilizando Spring Boot.
├── frontend/ # Interfaz de usuario web.
├── docs/ # Documentación del proyecto.
├── .gitignore
└── README.md

Arquitectura

El proyecto está dividido inicialmente en dos componentes principales

El frontend es independiente del backend y se comunica con él mediante una API REST.

Esta separación permitirá que el backend pueda ser utilizado posteriormente por diferentes clientes.

Tecnologías actuales
Backend
Java 17
Spring Boot
Maven
Frontend
HTML
CSS
JavaScript
Desarrollo

El backend se ejecuta actualmente mediante Spring Boot y está disponible en:
http://localhost:8080
(lanzamiento actual "mvn spring-boot:run")

El frontend se sirve durante el desarrollo mediante un servidor HTTP local:
http://localhost:5500
(lanzamiento actual "py -m http.server 5500")

La comunicación entre ambos componentes se realiza mediante HTTP.

Objetivos futuros

La arquitectura está pensada para permitir la incorporación progresiva de:

- Una interfaz web más completa.
- Un cliente de escritorio.
- Un cliente móvil.
- Comunicación en tiempo real cuando sea necesaria.
- Persistencia de datos.
- Autenticación y autorización.
- Reproducción y gestión de música.

Estas funcionalidades se incorporarán progresivamente a medida que el proyecto evolucione.
