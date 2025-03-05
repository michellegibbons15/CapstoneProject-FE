import React from 'react'
import "../../Styles/Dashboard/Groups.css"

const Groups = ({ imageUrl, text}) => {
  return (
    <div className="card">
      <img className="card-logo" src={imageUrl} alt={text} />
      <div className="card-title">{text}</div>
    </div>
  );
};

export default Groups;
