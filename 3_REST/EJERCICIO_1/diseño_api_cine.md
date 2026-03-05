# Diseño API REST - Cine

## Descripción

Servicio web REST para gestionar la cartelera y las sesiones de un cine.
Permitirá a aplicaciones externas consultar la cartelera y a nosotros mismos gestionar películas y sesiones.

---

## Recursos identificados

| Recurso   | Descripción                                |
|-----------|--------------------------------------------|
| Películas | Las películas disponibles en la cartelera  |
| Sesiones  | Las sesiones (horarios) de cada película   |

---

## Rutas y acciones

### Películas (`/peliculas`)

| Método   | Ruta               | Acción   | Descripción                            | Código éxito | Código error             |
|----------|--------------------| ---------|----------------------------------------|--------------|--------------------------|
| GET      | /peliculas         | index    | Obtener todas las películas            | 200          | 500                      |
| GET      | /peliculas/:id     | show     | Obtener una película por su ID         | 200          | 404, 500                 |
| POST     | /peliculas         | create   | Crear una nueva película               | 201          | 422, 500                 |
| PUT      | /peliculas/:id     | update   | Actualizar una película existente      | 200          | 404, 422, 500            |
| DELETE   | /peliculas/:id     | destroy  | Eliminar una película                  | 200          | 404, 500                 |

### Sesiones (`/peliculas/:peliculaId/sesiones`)

| Método   | Ruta                                       | Acción   | Descripción                                       | Código éxito | Código error             |
|----------|--------------------------------------------| ---------|----------------------------------------------------|--------------|--------------------------|
| GET      | /peliculas/:peliculaId/sesiones            | index    | Obtener todas las sesiones de una película         | 200          | 404, 500                 |
| GET      | /peliculas/:peliculaId/sesiones/:id        | show     | Obtener una sesión concreta                        | 200          | 404, 500                 |
| POST     | /peliculas/:peliculaId/sesiones            | create   | Crear una nueva sesión para una película           | 201          | 404, 422, 500            |
| PUT      | /peliculas/:peliculaId/sesiones/:id        | update   | Actualizar una sesión existente                    | 200          | 404, 422, 500            |
| DELETE   | /peliculas/:peliculaId/sesiones/:id        | destroy  | Eliminar una sesión                                | 200          | 404, 500                 |

---

## Ejemplos de mensajes

### Película

```json
{
    "id": 1,
    "titulo": "Interstellar",
    "director": "Christopher Nolan",
    "duracion": 169,
    "genero": "Ciencia ficción",
    "sinopsis": "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio."
}
```

### Sesión

```json
{
    "id": 1,
    "peliculaId": 1,
    "sala": 3,
    "fecha": "2025-03-10",
    "hora": "18:30",
    "precio": 8.50,
    "asientosDisponibles": 120
}
```

---

## Códigos de estado utilizados

| Código | Significado            | Cuándo se usa                                                |
|--------|------------------------|--------------------------------------------------------------|
| 200    | OK                     | La petición se ha procesado correctamente                    |
| 201    | Created                | Se ha creado un recurso nuevo (POST)                         |
| 404    | Not Found              | El recurso solicitado no existe                              |
| 422    | Unprocessable Entity   | Los datos enviados no son válidos (faltan campos, etc.)      |
| 500    | Internal Server Error  | Error interno del servidor                                   |

---

## Ejemplo de peticiones y respuestas

### GET /peliculas → 200 OK
```json
[
    {
        "id": 1,
        "titulo": "Interstellar",
        "director": "Christopher Nolan",
        "duracion": 169,
        "genero": "Ciencia ficción",
        "sinopsis": "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio."
    },
    {
        "id": 2,
        "titulo": "El Padrino",
        "director": "Francis Ford Coppola",
        "duracion": 175,
        "genero": "Drama",
        "sinopsis": "La historia de la familia Corleone bajo el patriarca Vito Corleone."
    }
]
```

### GET /peliculas/99 → 404 Not Found
```json
{
    "error": "Película no encontrada"
}
```

### POST /peliculas → 201 Created
**Petición:**
```json
{
    "titulo": "Inception",
    "director": "Christopher Nolan",
    "duracion": 148,
    "genero": "Ciencia ficción",
    "sinopsis": "Un ladrón que roba secretos a través de los sueños."
}
```
**Respuesta:**
```json
{
    "id": 3,
    "titulo": "Inception",
    "director": "Christopher Nolan",
    "duracion": 148,
    "genero": "Ciencia ficción",
    "sinopsis": "Un ladrón que roba secretos a través de los sueños."
}
```

### POST /peliculas → 422 Unprocessable Entity (faltan campos)
**Petición:**
```json
{
    "director": "Christopher Nolan"
}
```
**Respuesta:**
```json
{
    "error": "Faltan campos obligatorios",
    "camposRequeridos": ["titulo", "director", "duracion", "genero"]
}
```

### POST /peliculas/1/sesiones → 201 Created
**Petición:**
```json
{
    "sala": 5,
    "fecha": "2025-03-15",
    "hora": "20:00",
    "precio": 9.00,
    "asientosDisponibles": 150
}
```
**Respuesta:**
```json
{
    "id": 1,
    "peliculaId": 1,
    "sala": 5,
    "fecha": "2025-03-15",
    "hora": "20:00",
    "precio": 9.00,
    "asientosDisponibles": 150
}
```

### DELETE /peliculas/1 → 200 OK
```json
{
    "mensaje": "Película eliminada correctamente"
}
```
