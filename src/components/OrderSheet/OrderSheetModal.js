import React, { useEffect } from "react";
import { Modal, NavLink, NavItem, Button, Container, Row, Col } from "reactstrap";
import { useOrders } from "context/OrdersContext";
import { Link } from "react-router-dom";
import { RiFilePaper2Fill } from "react-icons/ri";
import { CgSmileSad } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import './index.css'


export default function OrderSheetModal() {
  const { orders, deleteFromOrder, clearOrder } = useOrders();

  const [isOpen, setIsOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(0);


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

     // Update the item count whenever orders change
  useEffect(() => {
    const count = uniqueProducts.reduce((total, product) => total + product.quantity, 0);
    setItemCount(count);
  }, [orders]);


  // handles emptying the order sheet
  const handleClear = () => {
    clearOrder();
  };

  return (
    <>

          <NavLink 
            className="p-0 ml-5"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <RiFilePaper2Fill 
              id="order-modal-icon"
              type="button" 
            />
                    {itemCount > 0 && <span className="item-count">{itemCount}</span>}

          </NavLink>


      <Modal
        isOpen={isOpen}
        className="modal-lg"
        modalClassName="bd-modal-lg"
        toggle={() => setIsOpen(false)}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="myLargeModalLabel">
            Current Order Sheet
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>

        <div className="modal-body">
          {uniqueProducts.length > 0 ? (
            <>
              <ul>
                {uniqueProducts.map((product, index) => {
                  const [productName, productOption] = product.key.split("-");

                  return (
                    <li key={index} className='d-flex pt-1 pb-1' style={{fontWeight: 'bold'}}>
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
              <Container fluid className='d-flex pt-5 justify-content-center align-items-center'>
                <Row>
                  <Col xs='12' className="p-2">
                <div align='center'>
                <Button color='danger' onClick={handleClear}>Empty Cart</Button>
                </div>
                </Col>
                <Col xs='12' className="p-2">
                <div align='center'>
                
                <Link to="/confirmation" >
                  <Button>Continue</Button>
                </Link>
                <p>
              <small>Total Order Price: ${totalOrderPrice.toFixed(2)}</small>
            </p>
                </div>
                </Col>
                </Row>
              </Container>
            </>
          ) : (
            <>
              <p>
                No Items Added! <CgSmileSad />{" "}
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
