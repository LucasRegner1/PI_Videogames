const { Router } = require("express");
const router = Router();
import { getApiInfo } from "../controllers/apiInfo";
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  GAME_NOT_FOUND,
} = require("../controllers/status");

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  try {
    let total = await getApiInfo();
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
