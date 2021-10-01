import React, { useContext, useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { AuthContext } from "../../auth/authContext/AuthContext";
import "./home.scss";
import axios from "axios";

const UserHome = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/lists/${user.user._id}${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="user-home">
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} key={list._id} />
      ))}
    </div>
  );
};

export default UserHome;
