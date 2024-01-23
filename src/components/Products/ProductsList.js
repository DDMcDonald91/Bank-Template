import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Button,
  Col,
  Row,
  Modal,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  Alert,
  CardFooter
} from "reactstrap";
import { useOrders } from "context/OrdersContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProductsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [addedToOrder, setAddedToOrder] = useState(false);
  const [isOpenArray, setIsOpenArray] = React.useState([]);
  const { orders, setOrders, addToOrder } = useOrders();

  const fetchData = async () => {
    setLoading(true);
  
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => doc.data());
  
      // Define the order of product types
      const typeOrder = ['flower', 'edible', 'apparatus', 'shatter/hash', 'prerolls'];
  
      // Sort products based on the order of types and then by price (most expensive to least expensive)
      const sortedProductList = productList.sort((a, b) => {
        const typeComparison = typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
        if (typeComparison !== 0) {
          return typeComparison;
        }
        return b.options[0].price - a.options[0].price; // Assuming options array contains size and price
      });
  
      setData(sortedProductList);
  
      // Initialize isOpenArray with false values for each modal
      setIsOpenArray(new Array(sortedProductList.length).fill(false));
    } catch (error) {
      console.log(error);
      alert("Error with fetching data. Check console.");
    } finally {
      setLoading(false);
    }
  };
  

  // Toggle the state of a specific modal
  const toggleModal = (index) => {
    setIsOpenArray((prevIsOpenArray) => {
      const newArray = [...prevIsOpenArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const handleAdd = (product, chosenOption) => {
    setLoading(true);

    addToOrder(product, chosenOption);

    setAddedToOrder(true); // Set addedToOrder state to true on successful addition
    
    notification();


    setTimeout(() => {
      setAddedToOrder(false); // Reset addedToOrder state after a certain time
    }, 2500); // Set the time for how long the notification should be displayed

    setLoading(false);

  };

  const filterProducts = (type) => {
    setSelectedType(type);
  };

  const notification = () => {
      toast("Added to order!")
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {/* Display notification when item is added to order */}
    {addedToOrder && (
      <ToastContainer 
      autoClose={2500}
      theme="dark"
      hideProgressBar={true}
      />
      )}

      {!data && loading ? (
        <>
          <p>Loading products...please wait.</p>
        </>
      ) : (
        <>
          {data ? (
            <>
              <Row align="left">
                <Col sm="12" md="12">
                  <div className="mb-3">
                    <strong>Filter by Type:</strong>{" "}
                    <Button
                      color={selectedType === null ? "primary" : "secondary"}
                      onClick={() => filterProducts(null)}
                    >
                      All
                    </Button>{" "}
                    <Button
                      color={selectedType === "flower" ? "primary" : "secondary"}
                      onClick={() => filterProducts("flower")}
                    >
                      Flower
                    </Button>{" "}
                    <Button
                      color={selectedType === "edible" ? "primary" : "secondary"}
                      onClick={() => filterProducts("edible")}
                    >
                      Edible
                    </Button>{" "}
                    <Button
                      color={selectedType === "prerolls" ? "primary" : "secondary"}
                      onClick={() => filterProducts("prerolls")}
                    >
                      Prerolls
                    </Button>{" "}
                    <Button
                      color={selectedType === "shatter/hash" ? "primary" : "secondary"}
                      onClick={() => filterProducts("shatter/hash")}
                    >
                      Shatter/Hash
                    </Button>{" "}
                    <Button
                      color={selectedType === "apparatus" ? "primary" : "secondary"}
                      onClick={() => filterProducts("apparatus")}
                    >
                      Apparatus
                    </Button>
                  </div>
                </Col>
                {data
                  .filter((product) => selectedType === null || product.type === selectedType)
                  .map((product, index) => {
                    return (
                      <Col sm="12" md="6" key={index}>
                        <Card style={{ width: "100%", maxWidth: "30rem", minHeight: '600px' }}>
                          <img
                            src={product.image}
                            alt="..."
                            style={{ height: "200px", width: "200px", margin: "auto auto" }}
                          />
                          <CardBody>
                            <CardTitle>
                              <h4>{product.name}</h4>
                            </CardTitle>
                            <br />
                            <CardText>
                              <p style={{fontWeight: 'normal'}} onClick={() => toggleModal(index)}>
                                {product.description.slice(0, 100)}...
                                <br />
                                <span style={{ color: "blue", fontSize: "14px" }}>More info</span>
                              </p>
                            </CardText>
                            <br />
                            {product.thc_levels.low != 0 || product.thc_levels.high != 0 ? <>
                              <p>
                                <strong>THC:</strong> {product.thc_levels.low}% -{" "}
                                {product.thc_levels.high}%
                              </p>
                            </>
                            :
                            <></>  
                          }

                           
                            <></>
                          </CardBody>
                          <CardFooter>
                          <UncontrolledDropdown direction="up">
                              <DropdownToggle
                                aria-expanded={false}
                                aria-haspopup={true}
                                caret
                                color="secondary"
                                data-toggle="dropdown"
                                id="dropdownMenuButton"
                                type="button"
                                disabled={loading}
                              >
                                Add to Order
                              </DropdownToggle>
                              <DropdownMenu aria-labelledby="dropdownMenuButton">
                                {product.options.map((option) => {
                                  return (
                                    <DropdownItem
                                      style={{ backgroundColor: "black", color: "white" }}
                                      key={option.size}
                                      onClick={() => {
                                        handleAdd(product, option);
                                      }}
                                    >
                                      {option.size} / ${option.price}
                                    </DropdownItem>
                                  );
                                })}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </CardFooter>
                        </Card>

                        <Modal
                          isOpen={isOpenArray[index]}
                          className="modal-lg"
                          modalClassName="bd-modal-lg"
                          toggle={() => toggleModal(index)}
                        >
                          <div className="modal-header">
                            <h4 className="modal-title" id="myLargeModalLabel">
                              {product.name}
                            </h4>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => toggleModal(index)}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          {product.image && (
                            <>
                              <div className="modal-img" align="center">
                                <img
                                  src={product.image}
                                  style={{ height: "400px", width: "400px" }}
                                />
                              </div>
                            </>
                          )}
                          <div className="modal-body">
                            <p>{product.description}</p>
                            <br />
                            {product.thc_levels.low != 0 || product.thc_levels.high != 0 ? <>
                              <p>
                                <strong>THC:</strong> {product.thc_levels.low}% -{" "}
                                {product.thc_levels.high}%
                              </p>
                            </>
                            :
                            <></>  
                          }
                          </div>
                        </Modal>
                      </Col>
                    );
                  })}
              </Row>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
