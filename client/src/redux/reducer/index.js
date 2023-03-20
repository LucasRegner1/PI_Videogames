const initialState = {
  videogames: [],
  videogamesCopy: [],
  genres: [],
  gameid: [],
  platforms: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        videogamesCopy: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "FILTER_BY_GENRE":
      const allVideogames = state.videogamesCopy;
      console.log(action.payload);
      const filtered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((e) => e.genres.includes(action.payload));
      return {
        ...state,
        videogames: filtered,
      };

    case "FILTER_BY_RATING":
      let sort = state.videogamesCopy;
      if (action.payload !== "-") {
        sort =
          action.payload === "higher"
            ? state.videogames.sort((a, b) => {
                if (a.rating > b.rating) {
                  return -1;
                }
                if (b.rating > a.rating) {
                  return 1;
                }
                return 0;
              })
            : state.videogames.sort((a, b) => {
                if (a.rating > b.rating) {
                  return 1;
                }
                if (b.rating > a.rating) {
                  return -1;
                }
                return 0;
              });
      }
      return {
        ...state,
        videogames: sort,
      };

    case "SORT_BY_NAME":
      let sort2 = state.videogamesCopy;
      if (action.payload !== "-") {
        sort2 =
          action.payload === "A-Z"
            ? state.videogames.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.videogames.sort((a, b) => {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
      }
      return {
        ...state,
        videogames: sort2,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        gameid: action.payload,
      };

    case "FILTER_API_DB":
      let all = state.videogamesCopy;
      const created =
        action.payload === "db"
          ? all.filter((e) => e.createdInDb)
          : all.filter((e) => !e.createdInDb);
      return {
        ...state,
        videogames: action.payload === "all" ? state.videogamesCopy : created,
      };

    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case "FILTER_NEW":
      let toFilter = state.videogamesCopy;
      let newfiltered = toFilter.filter((e) => e.reviews_text_count > 40);
      return {
        ...state,
        videogames: newfiltered,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
