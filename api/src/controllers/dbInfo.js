const getDbInfo = async () => {
  return await Videogame.findAll({});
};
