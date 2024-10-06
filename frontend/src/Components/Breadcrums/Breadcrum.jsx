import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
const Breadcrum = (props) => {
  const { products } = props;
  return (
    <div className="breadcrum">
      HOME
      <img src={arrow_icon} alt="arrow" />
      SHOP <img src={arrow_icon} alt="arrow" />
      {products.category} <img src={arrow_icon} alt="arrow" /> {products.name}
    </div>
  );
};

export default Breadcrum;
