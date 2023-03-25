import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={s.body}>
      <div className={s.title}>
        <h1> Bienvenidos a The Gamers' Hub!</h1>
        <Link to="/videogames">
          <button className={s.button}>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
