import React, { useState, useEffect } from "react";
import { deleteDoc, doc } from 'firebase/firestore';
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
} from "reactstrap";
import { useOrders } from "context/OrdersContext";

export default function AdminList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { deleteProduct } = useOrders();

  // Use an object to manage the modal states for each product
  const [isOpenMap, setIsOpenMap] = useState({});

  const [selectedType, setSelectedType] = useState(null);


  const fetchData = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(productList);

      // Initialize isOpenMap with false values for each product
      const initialIsOpenMap = {};
      productList.forEach((product) => {
        initialIsOpenMap[product.id] = false;
      });
      setIsOpenMap(initialIsOpenMap);
    } catch (error) {
      console.error(error);
      alert("Error with fetching data. Check console.");
    } finally {
      setLoading(false);
    }
  };
  

  const deleteProductHandler = async (productId) => {
    // Display a confirmation prompt
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");

    if (!isConfirmed) {
        // User clicked "Cancel" in the confirmation dialog
        return;
    }

    console.log(productId)
    await deleteProduct(productId);
    fetchData();
  };

  const filterProducts = (type) => {
    setSelectedType(type);
  };


  const openModal = (productId) => {
    setIsOpenMap((prevIsOpenMap) => ({
      ...prevIsOpenMap,
      [productId]: true,
    }));
  };

  const closeModal = (productId) => {
    setIsOpenMap((prevIsOpenMap) => ({
      ...prevIsOpenMap,
      [productId]: false,
    }));
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!data && loading ? (
        <>
          <p>Loading products...please wait.</p>
        </>
      ) : (
        <>
          {data ? (
            <>
            <div className="w-100" align="center">
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
              <Row>
                {data
                .filter((product) => selectedType === null || product.type === selectedType)
                .map((product, index) => {
                  return (
                    <>
                      <Col xs='6' lg="3" key={product.id}>
                        <div style={{ width: "100%", maxWidth: "35rem" }}>
                          <img src={product.image} alt="..." style={{height: 'auto', width: 'auto'}} />
                          <CardBody>
                            <CardTitle>
                              <h4>{product.name}</h4>
                            </CardTitle>
                            <br />
                            <CardText>
                              <p onClick={() => openModal(product.id)}>{product.description.slice(0, 100)}... 
                              <br />
                                <span style={{color: 'blue', fontSize: '14px'}}>
                                More info
                                </span>
                              </p>
                            </CardText>
                            <br />
                            {product.thc_levels && (
                              <p>
                                <strong>THC:</strong> {product.thc_levels.low}%
                                - {product.thc_levels.high}%
                              </p>
                            )}
                            <Button onClick={() => deleteProductHandler(product.id)}>Delete</Button>
                            <></>
                          </CardBody>
                        </div>
                      </Col>

                      <Modal
                        isOpen={isOpenMap[product.id]}
                        className="modal-lg"
                        modalClassName="bd-modal-lg"
                        toggle={() => closeModal(product.id)}
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
                            onClick={() => closeModal(product.id)}
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
                          {product.thc_levels && (
                            <p>
                              <strong>THC:</strong> {product.thc_levels.low}% -{" "}
                              {product.thc_levels.high}%
                            </p>
                          )}
                        </div>
                      </Modal>
                    </>
                  );
                })}
              </Row>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
