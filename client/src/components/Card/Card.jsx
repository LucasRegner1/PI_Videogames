import React from "react";
import s from "./Card.module.css";

function Card({ name, image, genres, id, rating, createdInDb }) {
  console.log(name, image, genres, id, rating);
  let genres2 = genres.map((e) => (e.name ? e.name : e));
  return (
    <div className={s.card}>
      <div>
        <p>{rating}</p>
        <img alt="imagen del juego" src={image} />
        <div>
          <div>
            <p> {genres2.join(", ")}</p>
          </div>
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
