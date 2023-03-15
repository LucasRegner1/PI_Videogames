const axios = require("axios");
const { api_key } = process.env;
const { Videogame, Genre } = require("../db");

// api: {data: {results: [{juego1}, {juego2}]}}

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=${api_key}`
  );
  const apiInfo = await apiUrl?.data?.results?.map((c) => {
    return {
      id: c.id,
      name: c.name,
      released: c.released,
      background_image: c.background_image,
      rating: c.rating,
      platforms: c?.platforms?.map((p) => p.platform?.name),
      genres: c?.genres?.map((g) => g?.name),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  const dbInfo = await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return dbInfo;
};

const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

const getId = async (id) => {
  if (
    id.match(
      /^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$/i
    )
  ) {
    try {
      let dbID = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              atributes: [],
            },
          },
        ],
        attributes: [
          "id",
          "name",
          "description",
          "released",
          "rating",
          "image",
          "createdInDb",
          "platform",
        ],
      });
      return dbID;
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const idApi = (
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${api_key}`)
      ).data;

      const game = {
        id: idApi.id,
        name: idApi.name,
        released: idApi.released,
        rating: idApi.rating,
        platforms: idApi.parent_platforms.map((e) => e.platform.name),
        image: idApi.background_image,
        genres: idApi.genres.map((e) => e.name),
        description: idApi.description,
      };
      return game;
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  getAllInfo,
  getDbInfo,
  getApiInfo,
  getId,
};
