import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RelatedContent from "../../components/ContentSuggestion/relatedContent/RelatedContent";
import SeriesParts from "../../components/ContentSuggestion/seriesPart/SeriesParts";
import Featured from "../../components/featured/Featured";
import "./contentHome.scss";
import axios from "axios";
import { AuthContext } from "../../auth/authContext/AuthContext";
const ContentHome = () => {
  const location = useLocation();
  const movieId = location.state;

  const [suggestionMovies, setSuggestionMovies] = useState();
  const [clickedMovie, setClickedMovie] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getThisMovie = async () => {
      try {
        const res = await axios.get(`/movie/${movieId}/${user.user._id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        setClickedMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getSuggestionMovie = async () => {
      try {
        const res = await axios.get(`/movie/related`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        setSuggestionMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getThisMovie();
    getSuggestionMovie();
  }, [movieId, location]);

  return (
    <>
      {clickedMovie && (
        <>
          <Featured clickedItem={clickedMovie} />

          <div className="content-home">
            {/* <div className="heading">
              <p>Episodes || </p>
              <p>choiceMovietitle</p>
            </div> */}
            {/* <div className="suggestionContainer">
              <SeriesParts />
              <SeriesParts />
              <SeriesParts />
              <SeriesParts />
              <SeriesParts />
              <SeriesParts />
              <SeriesParts />
              <SeriesParts />
            </div> */}

            <p className="related-content-heading">More Like This</p>
            <div className="related-contents">
              {suggestionMovies.map((suggestionMovie) => (
                <RelatedContent
                  movieContent={suggestionMovie}
                  key={suggestionMovie._id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContentHome;
