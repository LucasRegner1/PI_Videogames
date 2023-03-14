const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../models");

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/platforms?key=${api_key}`
  );
  const apiInfo = await apiUrl.data.map((c) => {
    return {
      id: c.id,
      name: c.name,
      released: c.released,
      background_image: c.background_image,
      rating: c.rating,
      platforms: c.platforms.map((p) => p.platform.name),
      genres: c.genres.map((g) => g.name),
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

module.exports = {
  getAllInfo,
  getDbInfo,
  getApiInfo,
};
