const express = require('express');
const ajv = require('./schemas'); // Importa la instancia de AJV configurada previamente

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta inicial para validar Persona
// Recibe el POST y devuelve 200 si es válido o 422 si falla
app.post('/persona', (req, res) => {
    // Obtenemos la función validadora de "persona" desde nuestra instancia de ajv
    const validate = ajv.getSchema("persona");

    if (validate(req.body)) {
        res.status(200).json({ mensaje: "JSON OK" });
    } else {
        res.status(422).json({
            mensaje: "JSON NO OK",
            errores: validate.errors
        });
    }
});

// Ruta inicial para validar Coordenada
// Recibe el POST y devuelve 200 si es válido o 422 si falla
app.post('/coordenada', (req, res) => {
    // Obtenemos la función validadora de "coordenada" desde nuestra instancia de ajv
    const validate = ajv.getSchema("coordenada");

    if (validate(req.body)) {
        res.status(200).json({ mensaje: "JSON OK" });
    } else {
        res.status(422).json({
            mensaje: "JSON NO OK",
            errores: validate.errors
        });
    }
});

// Middleware para capturar errores de sintaxis en el JSON
// Así garantizamos devolver 422 por cualquier otro error o fallo al parsear el JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(422).json({
            mensaje: "Error parseando el JSON",
            error: err.message
        });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
