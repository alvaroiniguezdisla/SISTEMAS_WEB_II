const express = require('express');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// ============================================================
// DATOS EN MEMORIA (simulan una base de datos)
// ============================================================

// ID autoincremental para películas y sesiones
let siguienteIdPelicula = 3;
let siguienteIdSesion = 3;

// Películas precargadas
let peliculas = [
    {
        id: 1,
        titulo: "Interstellar",
        director: "Christopher Nolan",
        duracion: 169,
        genero: "Ciencia ficción",
        sinopsis: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio."
    },
    {
        id: 2,
        titulo: "El Padrino",
        director: "Francis Ford Coppola",
        duracion: 175,
        genero: "Drama",
        sinopsis: "La historia de la familia Corleone bajo el patriarca Vito Corleone."
    }
];

// Sesiones precargadas
let sesiones = [
    {
        id: 1,
        peliculaId: 1,
        sala: 3,
        fecha: "2025-03-10",
        hora: "18:30",
        precio: 8.50,
        asientosDisponibles: 120
    },
    {
        id: 2,
        peliculaId: 2,
        sala: 5,
        fecha: "2025-03-10",
        hora: "20:00",
        precio: 9.00,
        asientosDisponibles: 150
    }
];

// ============================================================
// RUTAS DE PELÍCULAS
// ============================================================

// GET /peliculas - Obtener todas las películas
app.get('/peliculas', (req, res) => {
    res.status(200).json(peliculas);
});

// GET /peliculas/:id - Obtener una película por su ID
app.get('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);

    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    res.status(200).json(pelicula);
});

// POST /peliculas - Crear una nueva película
app.post('/peliculas', (req, res) => {
    const { titulo, director, duracion, genero, sinopsis } = req.body;

    // Validamos que los campos obligatorios estén presentes
    if (!titulo || !director || !duracion || !genero) {
        return res.status(422).json({
            error: "Faltan campos obligatorios",
            camposRequeridos: ["titulo", "director", "duracion", "genero"]
        });
    }

    const nuevaPelicula = {
        id: siguienteIdPelicula++,
        titulo,
        director,
        duracion,
        genero,
        sinopsis: sinopsis || ""
    };

    peliculas.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
});

// PUT /peliculas/:id - Actualizar una película existente
app.put('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = peliculas.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    const { titulo, director, duracion, genero, sinopsis } = req.body;

    // Validamos que los campos obligatorios estén presentes
    if (!titulo || !director || !duracion || !genero) {
        return res.status(422).json({
            error: "Faltan campos obligatorios",
            camposRequeridos: ["titulo", "director", "duracion", "genero"]
        });
    }

    // Actualizamos la película manteniendo el mismo ID
    peliculas[indice] = {
        id,
        titulo,
        director,
        duracion,
        genero,
        sinopsis: sinopsis || ""
    };

    res.status(200).json(peliculas[indice]);
});

// DELETE /peliculas/:id - Eliminar una película (y sus sesiones)
app.delete('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = peliculas.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    // Eliminamos la película
    peliculas.splice(indice, 1);

    // También eliminamos todas las sesiones de esa película
    sesiones = sesiones.filter(s => s.peliculaId !== id);

    res.status(200).json({ mensaje: "Película eliminada correctamente" });
});

// ============================================================
// RUTAS DE SESIONES (anidadas bajo /peliculas/:peliculaId)
// ============================================================

// GET /peliculas/:peliculaId/sesiones - Obtener todas las sesiones de una película
app.get('/peliculas/:peliculaId/sesiones', (req, res) => {
    const peliculaId = parseInt(req.params.peliculaId);
    const pelicula = peliculas.find(p => p.id === peliculaId);

    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    const sesionesPelicula = sesiones.filter(s => s.peliculaId === peliculaId);
    res.status(200).json(sesionesPelicula);
});

// GET /peliculas/:peliculaId/sesiones/:id - Obtener una sesión concreta
app.get('/peliculas/:peliculaId/sesiones/:id', (req, res) => {
    const peliculaId = parseInt(req.params.peliculaId);
    const id = parseInt(req.params.id);

    const pelicula = peliculas.find(p => p.id === peliculaId);
    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    const sesion = sesiones.find(s => s.id === id && s.peliculaId === peliculaId);
    if (!sesion) {
        return res.status(404).json({ error: "Sesión no encontrada" });
    }

    res.status(200).json(sesion);
});

// POST /peliculas/:peliculaId/sesiones - Crear una nueva sesión
app.post('/peliculas/:peliculaId/sesiones', (req, res) => {
    const peliculaId = parseInt(req.params.peliculaId);
    const pelicula = peliculas.find(p => p.id === peliculaId);

    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    const { sala, fecha, hora, precio, asientosDisponibles } = req.body;

    // Validamos los campos obligatorios
    if (!sala || !fecha || !hora || precio === undefined || !asientosDisponibles) {
        return res.status(422).json({
            error: "Faltan campos obligatorios",
            camposRequeridos: ["sala", "fecha", "hora", "precio", "asientosDisponibles"]
        });
    }

    const nuevaSesion = {
        id: siguienteIdSesion++,
        peliculaId,
        sala,
        fecha,
        hora,
        precio,
        asientosDisponibles
    };

    sesiones.push(nuevaSesion);
    res.status(201).json(nuevaSesion);
});

// PUT /peliculas/:peliculaId/sesiones/:id - Actualizar una sesión
app.put('/peliculas/:peliculaId/sesiones/:id', (req, res) => {
    const peliculaId = parseInt(req.params.peliculaId);
    const id = parseInt(req.params.id);

    const pelicula = peliculas.find(p => p.id === peliculaId);
    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    const indice = sesiones.findIndex(s => s.id === id && s.peliculaId === peliculaId);
    if (indice === -1) {
        return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const { sala, fecha, hora, precio, asientosDisponibles } = req.body;

    // Validamos los campos obligatorios
    if (!sala || !fecha || !hora || precio === undefined || !asientosDisponibles) {
        return res.status(422).json({
            error: "Faltan campos obligatorios",
            camposRequeridos: ["sala", "fecha", "hora", "precio", "asientosDisponibles"]
        });
    }

    // Actualizamos la sesión
    sesiones[indice] = {
        id,
        peliculaId,
        sala,
        fecha,
        hora,
        precio,
        asientosDisponibles
    };

    res.status(200).json(sesiones[indice]);
});

// DELETE /peliculas/:peliculaId/sesiones/:id - Eliminar una sesión
app.delete('/peliculas/:peliculaId/sesiones/:id', (req, res) => {
    const peliculaId = parseInt(req.params.peliculaId);
    const id = parseInt(req.params.id);

    const pelicula = peliculas.find(p => p.id === peliculaId);
    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    const indice = sesiones.findIndex(s => s.id === id && s.peliculaId === peliculaId);
    if (indice === -1) {
        return res.status(404).json({ error: "Sesión no encontrada" });
    }

    sesiones.splice(indice, 1);
    res.status(200).json({ mensaje: "Sesión eliminada correctamente" });
});

// ============================================================
// MIDDLEWARE DE ERRORES
// ============================================================

// Capturar errores de sintaxis en el JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(422).json({
            error: "Error parseando el JSON",
            detalle: err.message
        });
    }
    next();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor del cine iniciado en http://localhost:${PORT}`);
});
