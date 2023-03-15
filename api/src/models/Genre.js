const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { api_key } = process.env;
const router = Router();
const axios = require("axios");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
} = require("../controllers/status");

router.get("/", async (_req, res) => {
  try {
    const apigenres = (
      await axios.get(`https://api.rawg.io/api/genres?key=${api_key}`)
    ).data.results;
    const apiGen = apigenres;
    apiGen.map(
      async (e) =>
        await Genre.findOrCreate({
          where: {
            id: e.id,
            name: e.name,
          },
        })
    );
    const genreDb = await Genre.findAll();
    res.status(OK).send(genreDb);
  } catch (error) {
    res.status(NOT_FOUND).send("Not found");
  }
});

module.exports = router;
