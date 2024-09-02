# Aplicación API REST en Java

## Descripción

Este proyecto es una aplicación API REST que implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en Java y ofrece funcionalidades adicionales para ordenar datos. El desarrollo se realizó utilizando Spring Boot como framework, Hibernate para la capa de persistencia y PostgreSQL como sistema de gestión de bases de datos. La aplicación está desplegada en Railway y se ejecuta en contenedores Docker.

El frontend está desarrollado con React.js y desplegado en Vercel.

## Prueba - Despliegue

<div align="center">
  <img src="https://raw.githubusercontent.com/RendevMq/MyGIFS/main/gifjavaapirest.gif" width="700" alt="Final Result">
</div>


## Funcionalidades

- **Crear**: Añadir nuevos registros a la base de datos.
- **Leer**: Obtener uno o todos los registros de la base de datos.
- **Actualizar**: Modificar registros existentes en la base de datos.
- **Eliminar**: Borrar registros de la base de datos.

## Tecnologías Utilizadas

- **Lenguaje de Programación**: Java
- **Framework**: Spring Boot
- **Persistencia**: Hibernate
- **Base de Datos**: PostgreSQL
- **Despliegue Backend**: Railway
- **Contenedores**: Docker
- **Frontend**: React.js
- **Despliegue Frontend**: Vercel

## Configuración del Entorno

### Requisitos Previos

- Java 8 o superior
- Maven
- PostgreSQL
- Cuenta en Railway

### Instalación

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/usuario/repositorio.git
    ```
2. Navegar al directorio del proyecto:
    ```bash
    cd repositorio
    ```
3. Configurar la base de datos PostgreSQL en `application.properties`:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/nombre_base_datos
    spring.datasource.username=usuario
    spring.datasource.password=contraseña
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
    ```
4. Compilar y ejecutar la aplicación:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

## Endpoints

La aplicación consume las siguientes endpoints para las operaciones CRUD y de orden en la app con React:

- **Crear**:
    ```http
    POST /product
    ```
- **Leer Todos**:
    ```http
    GET /product
    ```
- **Leer Uno**:
    ```http
    GET /product/{id}
    ```
- **Actualizar**:
    ```http
    PUT /product/{id}
    ```
- **Eliminar**:
    ```http
    DELETE /product/{id}
    ```
- **Actualizar Orden de Productos**:
    ```http
    POST /product/update-order
    ```





