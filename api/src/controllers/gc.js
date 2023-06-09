const axios = require("axios");
const { api_key } = process.env;
const { Genre } = require("../db");

const getAllGenres = async () => {
  const allGenres = (
    await axios.get(`https://api.rawg.io/api/genres?key=${api_key}`)
  ).data;
  const genres = allGenres.results?.map((e) => (e.name ? e.name : "no data"));

  genres.forEach((e) => {
    if (e) {
      Genre.findOrCreate({
        where: {
          id: e.id,
          name: e.name,
        },
      });
    }
  });
  const genre = await Genre.findAll();
  return genre;
};

module.exports = {
  getAllGenres,
};
