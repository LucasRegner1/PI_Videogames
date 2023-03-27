import React from "react";
import { useState } from "react";
import s from "../Page/Page.module.css";

function Page({ gamesPerPage, allVideogames, page }) {
  const pageNum = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <nav>
      <ul className={s.container}>
        {pageNum?.map((n) => (
          <li className={s.subcontainer} key={n}>
            <button className={s.button} onClick={() => page(n)}>
              {n}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Page;
