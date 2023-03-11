import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const api = 'http://localhost/ecommerce/backend/';

const Add = () => {
  let heightRef = useRef(null);
  let widthRef = useRef(null);
  let lengthRef = useRef(null);
  let weightRef = useRef(null);
  let sizeRef = useRef(null);
  let formRef = useRef(null);

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    SKU: '',
    Name: '',
    Price: '',
    Type: '',
    TypeValue: '',
  });

  const Submit = async () => {
    if (validateForm()) {
      try {
        const { data } = await axios.post(`${api}create.php`, formData);
        if (data['message']) {
          navigate('/');
        }
      } catch {
        setError('sku is already present in the database');
      }
    }
  };

  const validateForm = () => {
    let value;
    for (value in formData) {
      if (formData[value].length === 0) {
        setError('Please Fill All Fields');
        return false;
      }
    }

    if (formData.Type === 'Furniture' && formData.TypeValue.length < 5) {
      setError('Please Fill All Furniture Dimensions');
      return false;
    }

    setError('');
    return true;
  };

  const renderError = () => {
    if (error.length === 0) {
      return <span></span>;
    } else {
      return <p className="error">{error}</p>;
    }
  };

  const updateForm = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.target.value,
    });
  };

  const updateFormNumbersOnly = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    event.target.value = result;
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.target.value,
    });
  };

  const updateSelection = (event) => {
    resetConditionalForm();
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.target.value,
      ['TypeValue']: '',
    });
  };

  const resetConditionalForm = () => {
    if (heightRef.current && lengthRef.current && widthRef.current) {
      heightRef.current.value = '';
      lengthRef.current.value = '';
      widthRef.current.value = '';
    }

    if (weightRef.current) {
      weightRef.current.value = '';
    }

    if (sizeRef.current) {
      sizeRef.current.value = '';
    }
  };

  const conditionalRender = () => {
    if (formData.Type === '') {
      return <div>-No Type-</div>;
    }

    if (formData.Type === 'DVD') {
      return (
        <div className="form__control">
          <label htmlFor="size"> Size (MB):</label>
          <input
            ref={sizeRef}
            id="size"
            onChange={updateFormNumbersOnly}
            type="text"
            name="TypeValue"
            title="Please input a Size"
          />
        </div>
      );
    }

    if (formData.Type === 'Book') {
      return (
        <div className="form__control">
          <label htmlFor="Weight"> Weight (KG):</label>
          <input
            ref={weightRef}
            id="weight"
            onChange={updateFormNumbersOnly}
            type="text"
            name="TypeValue"
            title="Please input a Weight"
          />
        </div>
      );
    }

    if (formData.Type === 'Furniture') {
      const handleDimensions = (event) => {
        const result = event.target.value.replace(/\D/g, '');
        event.target.value = result;

        const typeValue =
          heightRef.current?.value +
          'x' +
          widthRef.current?.value +
          'x' +
          lengthRef.current?.value;
        setFormData({ ...formData, ['TypeValue']: typeValue });
      };

      return (
        <>
          <div className="form__control">
            <label htmlFor="Height"> Height (CM):</label>
            <input
              ref={heightRef}
              id="height"
              onChange={handleDimensions}
              type="text"
              name="Height"
              title="Please input a Height"
            />
          </div>

          <div className="form__control">
            <label htmlFor="Width"> Width (CM):</label>
            <input
              ref={widthRef}
              id="width"
              onChange={handleDimensions}
              type="text"
              name="Width"
              title="Please input a Width"
            />
          </div>
          <div className="form__control">
            <label htmlFor="Length"> Length (CM):</label>
            <input
              ref={lengthRef}
              id="length"
              onChange={handleDimensions}
              type="text"
              name="Length"
              title="Please input a Length"
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="home">
      <nav className="nav">
        <div>
          <h2>Add Product</h2>
        </div>
        <ul>
          <li onClick={() => navigate('/')}>cancel</li>
          <button
            name="submit"
            type="submit"
            className="SubmitButton"
            onClick={Submit}
          >
            Save
          </button>
        </ul>
      </nav>
      <div className="add__item">
        <form id="product__form" ref={formRef}>
          <div className="form__control">
            <label htmlFor="SKU">SKU: </label>
            <input
              onChange={updateForm}
              id="sku"
              type="text"
              name="SKU"
              title="Please input a SKU"
            />
          </div>
          <div className="form__control">
            <label htmlFor="Name">Name:</label>
            <input
              onChange={updateForm}
              id="name"
              type="text"
              name="Name"
              title="Please input a Name"
            />
          </div>
          <div className="form__control">
            <label htmlFor="Price">Price ($):</label>
            <input
              onChange={updateFormNumbersOnly}
              id="price"
              type="text"
              name="Price"
              title="Please input a Price"
            />
          </div>
          <div className="form__control">
            <label htmlFor="Type">Type Switcher:</label>
            <select
              onChange={updateSelection}
              id="productType"
              name="Type"
              title="Please Pick a Type"
            >
              <option value="">--Type--</option>
              <option value="DVD">DVD</option>
              <option value="Book">Book</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          {conditionalRender()}
        </form>
        {renderError()}
      </div>
    </div>
  );
};

export default Add;
