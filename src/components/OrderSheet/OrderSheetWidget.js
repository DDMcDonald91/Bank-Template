import React from 'react';
import { useOrders } from 'context/OrdersContext';
import { RiFilePaper2Fill } from 'react-icons/ri';
import './index.css';
import { Button, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function OrderSheetWidget() {
  const { orders, deleteFromOrder, clearOrder } = useOrders();

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

  // handles emptying the order sheet
  const handleClear = () => {
    clearOrder()
  }

  return (
    <>
      <NavLink  
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight">
        <RiFilePaper2Fill
          id="order-modal-icon"
          type="button"
          
        />
      </NavLink>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Order Sheet</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
        {uniqueProducts.length > 0 ? (
          <>
            <ul>
              {uniqueProducts.map((product, index) => {
                const [productName, productOption] = product.key.split('-');

                return (
                  <li key={index}>
                    {productName} - {productOption}
                    {product.quantity > 1 && (
                      <span className="quantity">{`x${product.quantity} `}</span>
                    )}
                    <Button
                      style={{ width: 'auto', marginLeft: '200px', background: 'red' }}
                      onClick={() => {
                        deleteFromOrder(index); // Pass the index to deleteFromOrder
                      }}
                    >
                      X
                    </Button>
                  </li>
                );
              })}
            </ul>
            <div>
              <Button onClick={handleClear}>Empty Cart</Button>
              <br />
              <Link to="/confirmation">
                <Button>Continue</Button>
                </Link>
            </div>
          </>
        ) : (
          <>
          <p>No Items Added To Order Sheet</p>
          <NavLink to="/" tag={Link}>
                <Button>Continue</Button>
                </NavLink>
                </>
        )}
      </div>
      </div>
    </>
  );
}
