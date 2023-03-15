const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const router = Router();
const {
  getDbInfo,
  getAllInfo,
  getApiInfo,
  getId,
} = require("../controllers/vgc");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  GAME_NOT_FOUND,
} = require("../controllers/status");

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    let total = await getAllInfo();
    if (name) {
      let found = await total.filter((g) =>
        g.name.toLowerCase().includes(name.toLowerCase())
      );
      found.length
        ? res.status(OK).send(found)
        : res.status(NOT_FOUND).send(GAME_NOT_FOUND);
    } else {
      res.status(OK).send(total.flat());
    }
  } catch (error) {
    res.status(NOT_FOUND).send(GAME_NOT_FOUND);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allIds = await getId(id);
    allIds
      ? res.status(OK).send(allIds)
      : res.status(NOT_FOUND).send(GAME_NOT_FOUND);
  } catch (err) {
    res.status(NOT_FOUND).send(GAME_NOT_FOUND);
  }
});

router.post("/", async (req, res) => {
  try {
    let { body } = req;
    const createdVideogame = await Videogame.create(body);
    body.genres.forEach(async (e) => {
      const found = await Genre.findAll({
        where: { name: e },
      });
      createdVideogame.addGenre(found);
    });
    res.status(CREATED).send(createdVideogame);
  } catch (err) {
    console.log(err);
    res.status(BAD_REQUEST).send("Data needed is missing...");
  }
});

module.exports = router;
