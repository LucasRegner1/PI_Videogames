const { Router } = require("express");
const { getPlatforms } = require("../controllers/pc.js");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  GAME_NOT_FOUND,
} = require("../controllers/status");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let platforms = await getPlatforms();
    res.status(OK).json(platforms);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
});

module.exports = router;
