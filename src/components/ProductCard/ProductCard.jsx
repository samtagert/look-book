import React from 'react';
import './ProductCard.css';

const ProductCard = (props) => (
  <div key={props.index} className="product-card" onClick={props.click}>
    <div className="header">
    <div>{props.name} by {props.brand}</div>
      <img src={props.image} alt="fail"/>
    </div>
    <div className="description-container">
      <div>{props.description}...</div>
    </div>
  </div>
)

export default ProductCard;