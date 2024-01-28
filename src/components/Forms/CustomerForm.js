import React, { useState, useRef } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useOrders } from "context/OrdersContext";

import emailjs from '@emailjs/browser';
import { Link, useNavigate } from "react-router-dom";

import  logo  from '../../assets/img/logo2.png'

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  address: "",
  address2: "",
  city: "",
  zip: "",
  agreeToTerms: false,
};


export default function CustomerForm() {
  // State for form fields
  const [formData, setFormData] = useState(initialFormData);

  // loading state
  const [loading, setLoading] = useState(false)

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // email js ref
  const form = useRef();

  // context data
  const { orders, clearOrder } = useOrders();

  // thank you message state after order confirmation
  const [showThankYou, setShowThankYou] = useState(false);

  // useNavigate method from react-router-dom
  const navigate = useNavigate()

  // code for formating orders
  // Count the occurrences of each product in the order
  const productCounts = orders.reduce((acc, item) => {
    const key = `${item.name}-${item.option}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Create an array of unique products with quantity
  const uniqueProducts = Object.keys(productCounts).map((key) => ({
    key,
    quantity: productCounts[key],
  }));

  // Calculate the total order price
  const totalOrderPrice = orders.reduce(
    (total, product) => total + product.price,
    0
  );

  // Handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    console.log("Form submitted:", formData);

    // Open the modal after form submission
    setIsModalOpen(true);
  };

// handle email submission
const handleEmailSend = async () => {
  setLoading(true);

  try {
    // Construct the email template parameters
    const templateParams = {
      // Add customer information
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      deliveryAddress: `${formData.address} ${formData.address2}`,
      city: formData.city,
      zip: formData.zip,

      // Use orderDetails directly
      orderDetails: uniqueProducts.map((product) => {
        const [productName, productOption] = product.key.split("-");
        return {
          name: productName,
          option: productOption,
          quantity: product.quantity,
        };
      }),

      totalOrderPrice: totalOrderPrice.toFixed(2),
    };

    // Send the email using Email.js
    await emailjs.send('service_6bweyl6', 'template_kiunp7a', templateParams, 'JSioancmTaTHqGHRZ');

    console.log('Email sent successfully!');
    
    // Reset the form after successful submission
    resetForm();

    // Show the thank you message
    setShowThankYou(true);


  } catch (error) {
    alert('There has been an error.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  // Function to reset form data and hide the thank you message
  const resetFormAndThankYou = () => {
    setFormData(initialFormData);
    clearOrder();
    setShowThankYou(false);
    navigate('/')
  };


  // Function to reset form data
  const resetForm = () => {
    setFormData(initialFormData);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={form}>
        <Row>
          <Col sm={12}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="enter your first name"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="enter your last name"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                name="email"
                placeholder="enter your email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="enter your contact number for delivery"
                type="number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="deliveryAddress">Delivery Address</Label>
          <Input
            id="deliveryAddress"
            name="address"
            placeholder="1234 Main St"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="deliveryAddress2">Address 2</Label>
          <Input
            id="deliveryAddress2"
            name="address2"
            placeholder="Apartment, studio, or floor"
            type="text"
            value={formData.address2}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleZip">Zip</Label>
              <Input 
                id="exampleZip" 
                name="zip"
                required
                />
            </FormGroup>
          </Col>
          <Row>
            <Col sm={12}>
              <p>
                <small>We only deliver locally within the DMV area.</small>
              </p>
            </Col>
          </Row>
        </Row>
        <Button>Next</Button>
      </form>

      {/* Modal */}
      <Modal isOpen={isModalOpen} toggle={closeModal} className="modal-lg" keyboard={false} backdrop="static">
        <ModalBody align='center'>
        {showThankYou ? (
            // Thank you message
            <>
            <div>
              <img src={logo} style={{height: '250px', width: '250xpx'}} />
            </div>
            <div>
              <h4>Thank you for your order!</h4>
              {/* You can customize the thank you message further */}
              <br />
              <p>Our team will be in touch with you for further instruction regarding payment and delivery instructions.</p>
            </div>
            </>
          ) : (
            // Other content if thank you message is not shown
            <>
              <ModalHeader>
            <h4>Order Confirmation:</h4>
          </ModalHeader>
          {/* Display the user's entered information and order details here */}
          
          <h4>Customer Information:</h4>
          <div className="pt-3">
          <p>First Name: <span style={{fontWeight: 'bold'}}>{formData.firstName}</span></p>
          <p>Last Name: <span style={{fontWeight: 'bold'}}>{formData.lastName}</span></p>
          <p>Delivery Address: <span style={{fontWeight: 'bold'}}>{formData.address}{" "}{formData.address2}</span></p>
          </div>

          {/* ... Other user information ... */}
          <div className="pb-3">
            <h4>Current Order Sheet</h4>
          </div>
          <ul className="p-0 w-100">
            {uniqueProducts.map((product, index) => {
              const [productName, productOption] = product.key.split("-");

              return (
                <li key={index} className="d-flex pt-1 pb-1">
                  <p style={{marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold'}}>{productName} - {productOption}
                  {product.quantity > 1 && (
                    <span className="quantity">{`x${product.quantity} `}</span>
                  )}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="pt-5">
            <p style={{textDecoration: 'underline'}}>
              <small><span style={{ fontWeight: 'bold'}}>Total Order Price: ${totalOrderPrice.toFixed(2)}</span></small>
              <br  />
            </p>
            <p>
              <span style={{fontStyle: 'italic', fontWeight: 'bold'}}>Our team will contact you regarding payment before delivery.</span>
            </p>
            <p>
              <small>Confirm your order below.</small>
            </p>
          </div>
            </>
          )}
          
        </ModalBody>
        {showThankYou ? 
        <>
        <ModalFooter className='pl-5 pr-5'>
          <Button color="secondary" onClick={resetFormAndThankYou} disabled={loading} style={{marginRight: 'auto', marginLeft: 'auto'}}>
            Go Home
          </Button>
        </ModalFooter>
        </>
        :
        <>
        <ModalFooter className='pl-5 pr-5'>
          <Button color="secondary" onClick={closeModal} disabled={loading} className='mr-auto'>
            Go Back
          </Button>
          {' '}
          <Button color="primary" onClick={handleEmailSend} disabled={loading} className='ml-auto'>
            Confirm Order
          </Button>
        </ModalFooter>
        </>}
      </Modal>
    </>
  );
}
