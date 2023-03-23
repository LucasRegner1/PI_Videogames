import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.title}>
        <h1> Bienvenidos a The Gamers' Hub!</h1>
        <Link to="/videogames">
          <button className={styles.button}>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
