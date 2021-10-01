import React from "react";
import { Link } from "react-router-dom";
import "./relatedContent.scss";

const RelatedContent = ({ movieContent }) => {
  return (
    <Link
      to={{
        pathname: `/contenthome/${movieContent._id}`,
        state: `${movieContent._id}`,
      }}
    >
      <div className="related-content">
        <img src={movieContent.imgThumb} alt="Thumb" />
      </div>
    </Link>
  );
};

export default RelatedContent;
