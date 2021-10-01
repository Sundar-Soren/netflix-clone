import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";

import { useRef } from "react";
import "./list.scss";
import ListItem from "./listItem/ListItem";

const List = ({ list }) => {
  const [visibility, setVisibility] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const conRef = useRef();

  const handleClick = (direction) => {
    setVisibility(true);
    let distance = conRef.current.getBoundingClientRect().x - 30;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      conRef.current.style.transform = `translateX(${320 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      conRef.current.style.transform = `translateX(${-320 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <p className="list-title">{list.title}</p>
      <div className="main-container">
        <ArrowBackIosOutlined
          className="arrowSlider left"
          onClick={() => handleClick("left")}
          style={{ display: !visibility && "none" }}
        />

        <div className="container" ref={conRef}>
          {list.content.map((item, index) => (
            <ListItem item={item} key={index} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="arrowSlider right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
