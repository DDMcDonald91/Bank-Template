import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Row, Col, Button, FormGroup, Label, Input, Alert } from 'reactstrap';

export default function AddProductForm() {
  // State
  const [formData, setFormData] = useState({
    description: '',
    image: null,
    name: '',
    type: '',
    thc_levels: {
      high: 0,
      low: 0,
    },
    options: [
      {
        price: 0,
        size: '',
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  // Handle changes in option fields
  const handleOptionChange = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedOptions = [...prevFormData.options];
      updatedOptions[index] = { ...updatedOptions[index], [name]: name === 'price' ? parseFloat(value) : value };

      return {
        ...prevFormData,
        options: updatedOptions,
      };
    });
  };

// ...

// Handle changes in THC level fields
const handleTHCChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevFormData) => {
    if (name.includes('thc_levels')) {
      // Update THC levels
      const thc_levels = {
        ...prevFormData.thc_levels,
        [name.split('.')[1]]: value === '' ? 0 : parseFloat(value),
      };

      return {
        ...prevFormData,
        thc_levels,
      };
    } else {
      // Update other fields
      return {
        ...prevFormData,
        [name]: value === '' ? 0 : parseFloat(value),
      };
    }
  });
};





  // Remove an option from the form
  const handleRemoveOption = (index) => {
    setFormData((prevFormData) => {
      const updatedOptions = [...prevFormData.options];
      updatedOptions.splice(index, 1);

      return {
        ...prevFormData,
        options: updatedOptions,
      };
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageFile,
    }));
  };

  // Add a new product
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `product_images/${formData.name}_${Date.now()}`);
      await uploadBytes(storageRef, formData.image);

      // Get the image URL
      const imageUrl = await getDownloadURL(storageRef);

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, 'products'), {
        ...formData,
        image: imageUrl,
      });

      setMessage('Product added successfully!');
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      setMessage('There has been an error. Please try again.');
      console.error('Error adding document: ', error);
    } finally {
      handleReset();
      messageReset();
      setLoading(false);
    }
  };

  // Add a new option field
  const handleAddOption = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      options: [...prevFormData.options, { price: 0, size: '' }],
    }));
  };

  // handles resetting the state data
  const handleReset = () => {
    setFormData({
      description: '',
      image: null,
      name: '',
      type: '',
      thc_levels: {
        high: 0,
        low: 0,
      },
      options: [
        {
          price: 0,
          size: '',
        },
      ],
    });
  };

  // handles message reset
  const messageReset = () => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className='w-100' align='center'>
      <form onSubmit={handleAdd} style={{ maxWidth: '45rem' }}>
        {message && <Alert>{message}</Alert>}
        <Row className='pt-2 pb-3'>
          <Col sm={12}>
            <FormGroup>
              <Label for='productName'>Product Name</Label>
              <Input
                required
                id='productName'
                name='name'
                placeholder='Enter your product name'
                type='text'
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col sm={12}>
            <FormGroup>
              <Label for='productDescription'>Product Description</Label>
              <Input
              required
                id='productDescription'
                name='description'
                placeholder='Enter your product description'
                type='textarea'
                style={{ height: '150px' }}
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className='pt-2 pb-3'>
          <Col sm='12'>
            <FormGroup>
              <Label for='productType'>Product Type</Label>
              <Input
                id='productType'
                name='type'
                type='select'
                required
                value={formData.type}
                onChange={handleInputChange}
              >
                <option>Choose an option</option>
                <option value='flower'>Flower</option>
                <option value='edible'>Edible</option>
                <option value='prerolls'>Pre Rolls</option>
                <option value='shatter/hash'>Shatter/Hash</option>
                <option value='apparatus'>Apparatus</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        {formData.type === 'flower' && (
          <Row className='pt-2 pb-3'>
            <Col sm={12}>
              <FormGroup>
                <Label for='thcLow'>THC Low (%)</Label>
                <Input
                  id='thcLow'
                  name='thc_levels.low'
                  type='number'
                  value={formData.thc_levels.low}
                  onChange={handleTHCChange}
                />
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup>
                <Label for='thcHigh'>THC High (%)</Label>
                <Input
                  id='thcHigh'
                  name='thc_levels.high'
                  type='number'
                  value={formData.thc_levels.high}
                  onChange={handleTHCChange}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
        <Row className='pt-2 pb-3'>
          <Col sm={12}>
            <h5>Options</h5>
            {formData.options.map((option, index) => (
              <div key={index}>
                <FormGroup>
                  <Label for={`optionSize${index}`}>Size</Label>
                  <Input
                    required
                    id={`optionSize${index}`}
                    name='size'
                    type='text'
                    value={option.size}
                    onChange={(e) => handleOptionChange(e, index)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for={`optionPrice${index}`}>Price</Label>
                  <Input
                    required
                    id={`optionPrice${index}`}
                    name='price'
                    type='number'
                    value={option.price}
                    onChange={(e) => handleOptionChange(e, index)}
                  />
                </FormGroup>
                <Button type='button' onClick={() => handleRemoveOption(index)}>
                  Remove Option
                </Button>
              </div>
            ))}
            <br />
            <Button onClick={handleAddOption}>Add Option</Button>
          </Col>
        </Row>
        <Row className='pt-2 pb-3'>
          <Col sm={12}>
            <FormGroup>
              <Label for='productImage'>Product Image</Label>
              <Input id='productImage' name='image' type='file' accept='image/*' onChange={handleImageChange} />
            </FormGroup>
          </Col>
        </Row>

        <Button type='submit' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
