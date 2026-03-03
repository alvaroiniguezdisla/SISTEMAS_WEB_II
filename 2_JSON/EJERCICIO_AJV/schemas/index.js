// Archivo schemas/index.js
const Ajv2020 = require("ajv/dist/2020");
const ajv = new Ajv2020(); /* https://ajv.js.org/json-schema.html#draft-2020-12 */

const schema_persona = require("./persona.schema.json")
const schema_coordenada = require("./coordenada.schema.json")

ajv.addSchema(schema_persona, "persona")
ajv.addSchema(schema_coordenada, "coordenada")

module.exports = ajv;
