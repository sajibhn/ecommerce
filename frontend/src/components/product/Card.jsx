import React, { useState } from 'react';

const Card = ({ item, toggleProduct }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    toggleProduct(item);
  };
  const productTypeFormatters = {
    DVD: (value) => `Size ${value} MB`,
    Book: (value) => `Weight: ${value} KG`,
    Furniture: (value) => `Dimension: ${value}`,
    default: (value) => `Unknown Type: ${value}`,
  };

  return (
    <div className="card">
      <input
        type="checkbox"
        className="delete-checkbox"
        checked={checked}
        onChange={handleChange}
      ></input>
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
