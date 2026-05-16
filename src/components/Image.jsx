import React from "react";

const Image = ({ imgClassName, imgSrc, imgAlt, className, src, alt }) => {
  return (
    <img
      className={imgClassName || className}
      src={imgSrc || src}
      alt={imgAlt || alt}
    />
  );
};

export default Image;
