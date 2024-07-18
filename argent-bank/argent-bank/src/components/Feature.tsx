import React from "react";
import "../css/main.css";

interface FeatureProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  children: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({
  imgSrc,
  imgAlt,
  title,
  children,
}) => {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
};

export default Feature;
