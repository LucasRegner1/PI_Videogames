const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const videogameRute = require("./videogames");
const genreRute = require("./genres");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogameRute);
router.use("/genres", genreRute);

module.exports = router;
