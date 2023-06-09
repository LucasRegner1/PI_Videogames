import axios from "axios";

export const getVideogames = () => {
  return async (dispatch) => {
    let json = await axios.get("https://gamershub.onrender.com/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    let json = await axios.get("https://gamershub.onrender.com/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
};

export const filterByGenre = (payload) => {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
};

export const filterByRating = (payload) => {
  console.log(payload);
  return {
    type: "FILTER_BY_RATING",
    payload,
  };
};

export const sortByName = (payload) => {
  return {
    type: "SORT_BY_NAME",
    payload,
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `https://gamershub.onrender.com/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_BY_NAME",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `https://gamershub.onrender.com/videogames/${id}`
      );
      console.log(json.data);
      return dispatch({
        type: "GET_BY_ID",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterApiDb = (payload) => {
  return {
    type: "FILTER_API_DB",
    payload,
  };
};

export function postVideogame(payload) {
  return function (dispatch) {
    axios
      .post("https://gamershub.onrender.com/videogames", payload)
      .then((response) => response.data)
      .then((data) => console.log(data))
      .then((data) =>
        dispatch({
          type: "POST_VIDEOGAME",
          payload: data,
        })
      )
      .catch((error) => error.data);
  };
}

export const getPlatforms = () => {
  return async (dispatch) => {
    let json = await axios.get("https://gamershub.onrender.com/platforms");
    console.log(json.data);
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
};
