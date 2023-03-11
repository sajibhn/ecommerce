import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

export const api = 'http://localhost/ecommerce/backend/';

const Product = () => {
  const [productData, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // get products
  const getData = async () => {
    const { data } = await axios.get(`${api}products.php`);
    setProducts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // select products
  const toggleProduct = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((item) => item !== product));
    } else {
      setSelectedProducts([product, ...selectedProducts]);
    }
  };

  // delete products

  const deleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) {
      return false;
    }

    const SKUs = selectedProducts.map((product) => product.SKU);

    const SKUsJson = { SKUs };

    await axios.delete(`${api}delete.php`, {
      data: SKUsJson,
    });

    getData();
  };

  return (
    <div className="home">
      <nav className="nav">
        <div>
          <h2>Product List</h2>
        </div>
        <ul>
          <li>Add</li>
          <li onClick={() => deleteSelectedProducts()}>Mass delete</li>
        </ul>
      </nav>
      <div className="products">
        {productData?.map((item, i) => (
          <Card toggleProduct={toggleProduct} item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Product;
