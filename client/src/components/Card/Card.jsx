import React from "react";
import s from "./Card.module.css";

function Card({ name, image, genres, id, rating, createdInDb }) {
  console.log(name, image, genres, id, rating);
  let genres2 = genres.map((e) => (e.name ? e.name : e));
  return (
    <div className={s.body}>
      <div className={s.card}>
        <img src={image} alt="imagen del juego" />
        <h1>{name}</h1>
        <p className={s.title}>{genres2.join(", ")}</p>
        <p>Valoracion: {rating}</p>
      </div>
    </div>
  );
}

export default Card;
