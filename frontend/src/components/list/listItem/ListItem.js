import React, { useContext, useEffect, useState } from "react";

import "./listItem.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext/AuthContext";

const ListItem = ({ item }) => {
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getMovie = async () => {
      const res = await axios(`/movie/${item}/${user.user._id}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      setMovie(res.data);
    };
    getMovie();
  }, [item]);

  return (
    <Link
      to={{ pathname: `/contenthome/${movie._id}`, state: `${movie._id}` }}
      className="link"
    >
      <div className="list-content">
        <img src={movie.imgThumb} alt="movie poster" />
        <p>{movie.title}</p>
      </div>
    </Link>
  );
};

export default ListItem;
