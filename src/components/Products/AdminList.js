import React, { useState, useEffect } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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
  ButtonGroup,
} from "reactstrap";
import { useOrders } from "context/OrdersContext";

export default function AdminList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { deleteProduct } = useOrders();

  // New state to track the edited product and its fields
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: "",
    description: "",
    // Add other fields as needed
  });

  // Use an object to manage the modal states for each product
  const [isOpenMap, setIsOpenMap] = useState({});

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedType, setSelectedType] = useState(null);

  // fetch data
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

  // delete a product
  const deleteProductHandler = async (productId) => {
    // Display a confirmation prompt
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!isConfirmed) {
      // User clicked "Cancel" in the confirmation dialog
      return;
    }

    console.log(productId);
    await deleteProduct(productId);
    fetchData();
  };

  // filter products
  const filterProducts = (type) => {
    setSelectedType(type);
  };

  // Function to handle changes in the form fields
  const handleFieldChange = (field, value) => {
    setEditedProduct((prevEditedProduct) => ({
      ...prevEditedProduct,
      [field]: value,
    }));
  };

  // Function to open the modal for editing a product
  const openEditModal = (product) => {
    setEditedProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      // Add other fields as needed
    });
    setIsEditModalOpen(true);
  };

  // Function to update the product in the database
  const updateProductHandler = async () => {
    try {
      // Create a reference to the document of the product being updated
      const productRef = doc(db, "products", editedProduct.id);

      // Use updateDoc to update the fields of the product
      await updateDoc(productRef, {
        name: editedProduct.name,
        description: editedProduct.description,
        // Add other fields as needed
      });

      // Close the modal after updating
      closeModal(editedProduct.id);
      fetchData(); // Refetch the data to reflect the changes
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  // open the modal
  const openModal = (productId) => {
    setIsOpenMap((prevIsOpenMap) => ({
      ...prevIsOpenMap,
      [productId]: true,
    }));
  };

  // close the modal
  const closeModal = (productId) => {
    setIsOpenMap((prevIsOpenMap) => ({
      ...prevIsOpenMap,
      [productId]: false,
    }));
    setIsEditModalOpen(false); // Close the edit modal
    setEditedProduct({
      id: null,
      name: "",
      description: "",
      // Reset other fields as needed
    });
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
                    color={
                      selectedType === "prerolls" ? "primary" : "secondary"
                    }
                    onClick={() => filterProducts("prerolls")}
                  >
                    Prerolls
                  </Button>{" "}
                  <Button
                    color={
                      selectedType === "shatter/hash" ? "primary" : "secondary"
                    }
                    onClick={() => filterProducts("shatter/hash")}
                  >
                    Shatter/Hash
                  </Button>{" "}
                  <Button
                    color={
                      selectedType === "apparatus" ? "primary" : "secondary"
                    }
                    onClick={() => filterProducts("apparatus")}
                  >
                    Apparatus
                  </Button>
                </div>
                <Row>
                  {data
                    .filter(
                      (product) =>
                        selectedType === null || product.type === selectedType
                    )
                    .map((product, index) => {
                      return (
                        <>
                          <Col xs="12" md='6' lg="3" key={product.id}>
                            <div style={{ width: "100%", maxWidth: "35rem", height: 'auto', minHeight: '25rem' }} className='p-3'>
                              <img
                                src={product.image}
                                alt="..."
                                style={{ height: "auto", width: "auto" }}
                              />
                              <CardBody>
                                <CardTitle>
                                  <h4>{product.name}</h4>
                                </CardTitle>
                                <br />
                                <CardText>
                                  <p onClick={() => openModal(product.id)}>
                                    {product.description.slice(0, 50)}...
                                    <br />
                                    <span
                                      style={{
                                        color: "blue",
                                        fontSize: "14px",
                                      }}
                                    >
                                      More info
                                    </span>
                                  </p>
                                </CardText>
                                <br />
                                {product.thc_levels && (
                                  <p>
                                    <strong>THC:</strong>{" "}
                                    {product.thc_levels.low}% -{" "}
                                    {product.thc_levels.high}%
                                  </p>
                                )}
                              </CardBody>

                            </div>
                            <div className="mt-auto">
                                  <div>
                                    <ButtonGroup>
                                    <Button
                                        onClick={() => 
                                          openEditModal(product)
                                      }
                                      color='primary'
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          deleteProductHandler(product.id)
                                        }
                                        color='danger'
                                      >
                                        Delete
                                      </Button>
                                    </ButtonGroup>
                                  </div>
                                </div>
                          </Col>

                          <Modal
                            isOpen={
                              isOpenMap[product.id] ||
                              (isEditModalOpen &&
                                editedProduct.id === product.id)
                            }
                            className="modal-lg"
                            modalClassName="bd-modal-lg"
                            toggle={() => closeModal(product.id)}
                          >
                            <div className="modal-header">
                              <h4
                                className="modal-title"
                                id="myLargeModalLabel"
                              >
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

                            {isEditModalOpen && editedProduct.id === product.id ?
                            <>
                             <div className="modal-body w-100" align='center'>
    {/* New form for editing product */}
    <form className="w-100">
      <h4 style={{fontWeight: 'bold'}}>Update Your Product</h4>
      <Row className="pt-2">
        <Col xs='12'>
      <label className="w-100">
        <h5>Name:</h5>
        <br />
        <input
          className="w-100"
          type="text"
          value={editedProduct.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
      </label>
      </Col>
      <Col xs='12'>
      <label className="w-100">
        <h5>Description:</h5>
        <br />

        <textarea
          style={{height: '300px', width: '100%'}}
          value={editedProduct.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
        />
      </label>
      </Col>
      {/* Add other fields as needed */}
      </Row>
    </form>
    <Button onClick={updateProductHandler}>Update</Button>
  </div>
                            </>
                            :
                            <>
                            <div className="modal-body">
                              <p>{product.description}</p>
                              <br />
                              {product.thc_levels && (
                                <p>
                                  <strong>THC:</strong> {product.thc_levels.low}
                                  % - {product.thc_levels.high}%
                                </p>
                              )}
                            </div>
                            </>
                            }



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
