import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

export const api = 'http://localhost/ecommerce/backend/';

const Product = () => {
  const [productData, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`${api}products.php`);
    setProducts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(productData);

  return (
    <div className="home">
      <nav className="nav">
        <div>
          <h2>Product List</h2>
        </div>
        <ul>
          <li>Add</li>
          <li>Mass delete</li>
        </ul>
      </nav>
      <div className="products">
        {productData?.map((item, i) => (
          <Card item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Product;
