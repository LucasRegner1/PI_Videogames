import { useState, useEffect } from "react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  postVideogame,
  getGenres,
  getPlatforms,
  getVideogames,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";

const validate = (input) => {
  let errors = {};
  console.log(input);
  if (!input.name) {
    errors.name = "Debe ingresar el nombre";
  }
  if (!input.platforms.length) {
    errors.platforms = "Debe ingresar la plataforma";
  }
  if (!input.description) {
    errors.description = "Debe ingresar una descripcion";
  }
  if (!input.genres.length) {
    errors.genres = "Debe ingresar el genero";
  }
  if (!input.released.length) {
    errors.released = "22/22/2222";
  }
  if (!input.rating.length) {
    errors.rating = 1;
  }
  return errors;
};

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const videogames = useSelector((state) => state.videogamesCopy);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: [],
    released: "",
    genres: [],
    rating: "",
    image: "",
  });
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsFields = validate(input);
    setErrors(errorsFields);
    if (!Object.keys(errorsFields).length) {
      dispatch(postVideogame(input));
      setInput({
        name: "",
        description: "",
        platforms: [],
        released: "",
        genres: [],
        rating: "",
        image: "",
      });
      alert("Videojuego creado!");
      history.push("/videogames");
    } else {
      alert("Ingresar todos los campos necesarios");
    }
  };

  const handleGenreSelect = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };

  const handlePlatformSelect = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };

  const handleGenresDelete = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  };

  const handlePlatformsDelete = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== e),
    });
  };

  return (
    <div className="containerForm">
      <div className="navContainer">
        <Link className="nav" to="/videogames">
          <Nav />
        </Link>
      </div>
      <h1 className="title">CREAR VIDEOJUEGO</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="formContainer">
          <div className="name formInput">
            <label>Nombre:</label>
            <input
              className="inputName"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.name}
              name="name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="description formInput">
            <label>Descripcion:</label>
            <input
              className="inputDescription"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.description}
              name="description"
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className="realesed formInput">
            <label>Fecha:</label>
            <input
              className="inputReleased"
              onChange={(e) => handleChange(e)}
              type="date"
              value={input.released}
              name="released"
            />
          </div>
          <div className="rating formInput">
            <label>Valoracion:</label>
            <input
              className="inputRating "
              onChange={(e) => handleChange(e)}
              type="number"
              min="1"
              max="5"
              value={input.rating}
              name="rating"
            />
          </div>
          <div className="image formInput">
            <label>Imagen:</label>
            <input
              className="inputImage"
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.image}
              name="image"
            />
          </div>
          <p>Generos:</p>
          {
            <select onChange={(e) => handleGenreSelect(e)}>
              {" "}
              {genres &&
                genres.map((g) => (
                  <option value={g.id} key={g.id}>
                    {g.name}
                  </option>
                ))}
            </select>
          }
          <div className="containerDivGenres">
            {input.genres.map((e) => (
              <div className="divGenres" value={e}>
                <p>{e}</p>
                <button
                  key={e}
                  className="buttonX"
                  onClick={() => handleGenresDelete(e)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <p className="pPlatforms">Plataforma:</p>
          {
            <select onChange={(e) => handlePlatformSelect(e)}>
              {" "}
              {platforms.map((g) => (
                <option value={g.name}>{g.name}</option>
              ))}
            </select>
          }
          <div className="containterDivPlatforms">
            {input.platforms.map((e) => (
              <div className="divPlatform" value={input.platforms}>
                <p>{e}</p>
                <button
                  key={e}
                  className="buttonX"
                  onClick={() => handlePlatformsDelete(e)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="containerSubmit">
          <button className="submit" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
