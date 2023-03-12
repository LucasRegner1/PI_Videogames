import axios from "axios";

export default function arrvideogames() {
  const arrvideogames = axios.get(
    "https://api.rawg.io/api/platforms?key=44de716e4c7d4ca09fec78341c0890b2"
  );
  return arrvideogames;
}

module.exports = {
  arrvideogames,
};
