import React from "react";

function Card({ name, image, genres, id, rating, createdInDb }) {
  let genres2 = genres.map((e) => (e.name ? e.name : e));
  return (
    <div className="cardContainer">
      <div className="cardContainer2">
        <p className="ratingCard">{rating}</p>
        <img className="cardImage" src={image} />
        <div className="genresTitle">
          <div className="cardGenres">
            <p> {genres2.join(", ")}</p>
          </div>
          <h3 className="CardTitle">{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
