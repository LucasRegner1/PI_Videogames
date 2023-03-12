const { Router } = require("express");
const controller = require("./controllers");
import arrvideogames from "./api_info";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', (req, res)=>{

})
module.exports = router;
