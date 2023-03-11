import React from 'react';

const Card = ({ item }) => {
  const productTypeFormatters = {
    DVD: (value) => `Size ${value} MB`,
    Book: (value) => `Weight: ${value} KG`,
    Furniture: (value) => `Dimension: ${value}`,
    default: (value) => `Unknown Type: ${value}`,
  };

  return (
    <div className="card">
      <input type="checkbox" className="delete-checkbox"></input>
      <p>{item.SKU}</p>
      <p>{item.Name}</p>
      <p>{item.Price}$</p>
      <p>
        {productTypeFormatters[item.Type]?.(item.TypeValue) ??
          productTypeFormatters['default'](item.TypeValue)}
      </p>
    </div>
  );
};

export default Card;
