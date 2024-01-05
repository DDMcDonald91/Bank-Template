import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
  Modal,
} from "reactstrap";

export default function SecondaryFeaturedList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => doc.data());
      setData(productList);
    } catch (error) {
      console.log(error);
      alert("Error with fetching data. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (index) => {
    setOpenModalIndex(index === openModalIndex ? null : index);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter the products based on the 'type' field, excluding 'flower', and limit to 6 items
  const filteredProducts = data
    .filter((product) => product.type !== 'flower')
    .slice(0, 6);

  return (
    <>
      {!filteredProducts.length && loading ? (
        <>
          <p>Loading products...please wait.</p>
        </>
      ) : (
        <>
          {filteredProducts.length ? (
            <>
              <Row align="left">
                {filteredProducts.map((product, index) => (
                  <Col md='6' lg="4" key={product.name}>
                    <div style={{ width: "100%", maxWidth: "35rem" }}>
                      <img
                        src={product.image}
                        alt="..."
                        style={{ height: '200px', width: '200px' }}
                        align='center'
                      />
                      <CardBody>
                        <CardTitle>
                          <h4>{product.name}</h4>
                        </CardTitle>
                        <br />
                        <CardText>
                          <p onClick={() => toggleModal(index)}>
                            {product.description.slice(0, 100)}...
                            <br />
                            <span style={{ color: 'blue', fontSize: '14px' }}>
                              More info
                            </span>
                          </p>
                        </CardText>
                        <br />
                      </CardBody>
                      <Modal
                        isOpen={openModalIndex === index}
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
                                style={{ height: '200px', width: '200px' }}
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
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <p>No products available.</p>
          )}
        </>
      )}
    </>
  );
}
