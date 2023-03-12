const axios = require("axios");
const { api_key } = process.env;

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

module.exports = {
  getApiInfo,
};
