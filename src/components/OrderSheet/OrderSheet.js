import React, { useState, useEffect } from 'react'
import { useOrders } from 'context/OrdersContext'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export default function OrderSheet() {
  const { orders, deleteFromOrder, clearOrder } = useOrders()

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
    const totalOrderPrice = orders.reduce((total, product) => total + product.price, 0);


  // handles emptying the order sheet
  const handleClear = () => {
    clearOrder();
  };

  return (
    <Container fluid id='order-sheet'>
      {orders.length != 0 ? 
      <>
      <div className='pb-3'>
        <h4>Current Order Sheet</h4>
      </div>
      <ul className='p-0 w-100'>
              {uniqueProducts.map((product, index) => {
                const [productName, productOption, productPrice] = product.key.split('-');

                return (
                  <li key={index} className='d-flex p-2' style={{fontWeight: 'bold'}}>
                    {productName} - {productOption}
                    {product.quantity > 1 && (
                      <span className="quantity">{`x${product.quantity} `}</span>
                    )}
                    <div style={{width: 'auto', marginLeft: 'auto'}}>
                      <Button
                        style={{
                          width: "auto",
                          background: "black",
                          color: "red",
                        }}
                        onClick={() => {
                          deleteFromOrder(index); // Pass the index to deleteFromOrder
                        }}
                      >
                        <FaTrash />
                      </Button>
                      </div>
                  </li>
                );
              })}
            </ul>
            <div className='pt-5'>
                <Button color='danger' onClick={handleClear}>Empty Cart</Button>
            </div>
            <div className='pt-5'>
            <p style={{textDecoration: 'underline'}}>
              <small>Total Order Price: ${totalOrderPrice.toFixed(2)}</small>
            </p>

            <p className='pt-3'><small>Ready to place your order?</small></p>

              <Link to='/confirmation'>
                <Button>Next</Button>
              </Link>
            </div>
      </>
      :
      <><p>No Items Ordered</p></>
      }
    </Container>
  )
}
