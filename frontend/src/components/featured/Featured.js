import React, { useEffect, useState } from "react";
import "./featured.scss";
import { Link } from "react-router-dom";
import { PlayArrow, InfoOutlined } from "@material-ui/icons";
import Navbar from "../navbar/Navbar";
import axios from "axios";
const Featured = ({ clickedItem, type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomMovies = async () => {
      try {
        const res = await axios(`/movie/random?type=${type}`);
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomMovies();
  }, [type]);

  return (
    <>
      <Navbar />

      <div className="featured">
        {type && (
          <div className="category">
            <span>{type === "movie" ? "Movies" : "Series"}</span>
            <select
              name="genre"
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option>Genre</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="fantasy">Fantasy</option>
              <option value="historical">Historical</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-fi</option>
              <option value="thriller">Thriller</option>
              <option value="western">Western</option>
              <option value="animation">Animation</option>
              <option value="drama">Drama</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>
        )}
        {clickedItem ? (
          <>
            <img src={clickedItem.imgThumb} alt="Backgroud poster pic" />

            <div className="info">
              <img src={clickedItem.imgTitle} alt="movie name " />
              <h2 className="movie-title">{clickedItem.title}</h2>
              <span className="desc">{clickedItem.desc}</span>
              <div className="buttons">
                <Link
                  to={{
                    pathname: `/watch/${clickedItem._id}`,
                    state: `${clickedItem.video}`,
                  }}
                  className="link"
                >
                  <button className="play">
                    <PlayArrow /> <span>play</span>
                  </button>
                </Link>
                <button className="more">
                  <InfoOutlined /> <span>info</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <img src={content.imgThumb} alt="Backgroud poster pic" />

            <div className="info">
              <img src={content.imgTitle} alt="movie name " />
              <h2 className="movie-title">{content.title}</h2>

              <span className="desc">{content.desc}</span>
              <div className="buttons">
                <Link
                  to={{
                    pathname: `/watch/${content._id}`,
                    state: `${content.video}`,
                  }}
                  className="link"
                >
                  <button className="play">
                    <PlayArrow /> <span>play</span>
                  </button>
                </Link>
                <button className="more">
                  <InfoOutlined /> <span>info</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Featured;
