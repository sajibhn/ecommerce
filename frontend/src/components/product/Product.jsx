import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

export const api = 'http://localhost/ecommerce/backend/index.php';
// export const api = 'https://saj-commerce.000webhostapp.com/backend/index.php';

const Product = () => {
  const [productData, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  // get products
  const getData = async () => {
    const response = await fetch(api);
    const data = await response.json();

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

    let SKUs = [];
    for (let product of selectedProducts) {
      SKUs.push(product.SKU);
    }

    let SKUsJson = { SKUs: SKUs };

    let raw = JSON.stringify(SKUsJson);
    let requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'DELETE',
      },
      body: raw,
    };

    await fetch(api, requestOptions);
    getData();
  };
  return (
    <div className="home">
      <nav className="nav">
        <div>
          <h2>Product List</h2>
        </div>
        <ul>
          <button onClick={() => navigate('/add')}>ADD</button>
          <button onClick={() => deleteSelectedProducts()}>MASS DELETE</button>
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
