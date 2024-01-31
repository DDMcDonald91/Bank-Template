/* eslint-disable */

import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  CardBody,
  CardImg,
} from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";

// firebase imports
import { auth } from "../../../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

// react router dom import
import { useNavigate } from "react-router-dom";
import AddServiceForm from "components/Forms/AddServiceForm.js";
import UpdateServiceForm from "components/Forms/UpdateServiceForm.js";
import DeleteService from "components/Forms/DeleteService.js";

function Admin() {
  // state
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  // State for the modal
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  // useNavigate var
  const navigate = useNavigate();

  // firebase functionality
  // checks for user on load
  const userCheck = async () => {
    setLoading(true);

    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log("User signed in. User info:", user);
          setUser(user);
          // ...
        } else {
          // User is signed out
          // ...
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  // template code
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert("There has been an error. Contact your developer.");
        console.log(error);
      });
  };

  if (!user) {
    return (
      <Container style={{ minHeight: "100vh" }}>
        <p align="center">No user logged in.</p>
      </Container>
    );
  }

  return (
    <>
      {loading ? (
        <>
          <Container style={{ minHeight: "100vh" }}>
            <p align="center">Loading user information...</p>
          </Container>
        </>
      ) : (
        <>
          <ProfilePageHeader />
          <div className="section profile-content">
            <Container fluid>
            <Row>
              <Col xs='12' md='4'>
              <div className="owner">
                <div align="center">
                  <img
                    alt="..."
                    style={{ height: "100px", width: "auto" }}
                    className="img-no-padding img-responsive"
                    src={require("assets/img/4sons-logo.png")}
                  />
                </div>
                <div className="name">
                  <h4 className="title">
                    4Sons Locksmiths LLC Admin Panel
                    <br />
                  </h4>
                  <h6 className="description">Locksmith Service Provider</h6>
                </div>
              </div>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="6">
                  <p>On this page, you can manage all of your various services.</p>
                  <br />
                  <UncontrolledDropdown>
                    <DropdownToggle
                      aria-expanded={false}
                      aria-haspopup={true}
                      caret
                      className="btn-round"
                      outline
                      color="secondary"
                      onClick={toggleModal}
                      style={{ color: "black" }}
                    >
                      <i className="fa fa-cog" /> Settings
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </Col>
              </Row>
              <br />
              </Col>
              <Col xs='12' md='8'>
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav role="tablist">
                    <NavItem
                    style={{margin: 'auto auto'}}
                    >
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Update A Service
                      </NavLink>
                    </NavItem>
                    <NavItem
                    style={{margin: 'auto auto'}}
                    >
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Add A New Service
                      </NavLink>
                    </NavItem>
                    <NavItem
                    style={{margin: 'auto auto'}}
                    >
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Delete A Service
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <TabContent className="text-center" activeTab={activeTab}>
                <TabPane tabId="1" id="follows">
                <h3 className="text-muted">Update Service Form</h3>
                  <p className="text-muted">
                    Update your services below.
                  </p>
                  <UpdateServiceForm />
                </TabPane>
                <TabPane className="text-center" tabId="2">
                  <h3 className="text-muted">New Service Form</h3>
                  <p className="text-muted">
                    Click the button below to add a new service.
                  </p>
                  <AddServiceForm />
                </TabPane>
                <TabPane className="text-center" tabId="3">
                  <h3 className="text-muted">Delete A Service</h3>
                  <p className="text-muted">
                    Select a service to be deleted.
                  </p>
                  <DeleteService />
                </TabPane>
              </TabContent>
              </Col>
            </Row>

{/*
              <div className="owner">
                <div align="center">
                  <img
                    alt="..."
                    style={{ height: "100px", width: "auto" }}
                    className="img-no-padding img-responsive"
                    src={require("assets/img/4sons-logo.png")}
                  />
                </div>
                <div className="name">
                  <h4 className="title">
                    4Sons Locksmiths LLC Admin Panel
                    <br />
                  </h4>
                  <h6 className="description">Locksmith Service Provider</h6>
                </div>
              </div>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="6">
                  <p>Lorem ipsum...</p>
                  <br />
                  <UncontrolledDropdown>
                    <DropdownToggle
                      aria-expanded={false}
                      aria-haspopup={true}
                      caret
                      className="btn-round"
                      outline
                      color="secondary"
                      onClick={toggleModal}
                      style={{ color: "black" }}
                    >
                      <i className="fa fa-cog" /> Settings
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </Col>
              </Row>
              <br />

              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Follows
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Add A New Service
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <TabContent className="following" activeTab={activeTab}>
                <TabPane tabId="1" id="follows">
                  <Row>
                    <Col className="ml-auto mr-auto" md="6">
                      <ul className="list-unstyled follows">
                        <li>
                          <Row>
                            <Col
                              className="ml-auto mr-auto"
                              lg="2"
                              md="4"
                              xs="4"
                            >
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                              />
                            </Col>
                            <Col
                              className="ml-auto mr-auto"
                              lg="7"
                              md="4"
                              xs="4"
                            >
                              <h6>
                                Flume <br />
                                <small>Musical Producer</small>
                              </h6>
                            </Col>
                            <Col
                              className="ml-auto mr-auto"
                              lg="3"
                              md="4"
                              xs="4"
                            >
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    defaultChecked
                                    defaultValue=""
                                    type="checkbox"
                                  />
                                  <span className="form-check-sign" />
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </li>
                        <hr />
                        <li>
                          <Row>
                            <Col className="mx-auto" lg="2" md="4" xs="4">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                              />
                            </Col>
                            <Col lg="7" md="4" xs="4">
                              <h6>
                                Banks <br />
                                <small>Singer</small>
                              </h6>
                            </Col>
                            <Col lg="3" md="4" xs="4">
                              <FormGroup check>
                                <Label check>
                                  <Input defaultValue="" type="checkbox" />
                                  <span className="form-check-sign" />
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane className="text-center" tabId="2" id="following">
                  <h3 className="text-muted">Service Form</h3>
                  <p className="text-muted">
                    Use the form below to add a new service.
                  </p>
                  <AddServiceForm />
                </TabPane>
              </TabContent>
            
      */}
      </Container>
          </div>
          {/* Modal for Logout */}
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
              <h3>Settings</h3>
            </ModalHeader>
            <ModalBody align='center'>
              <img
                    alt="..."
                    style={{ height: "250px", width: "250px" }}
                    className="img-circle img-no-padding img-responsive"
                    src={require("assets/img/4sons-header5.jpg")}
                  />
              <CardBody>
            {/* You can add more content to the modal if needed */}
            <div>
                <p>Need help with anything?</p>
                <a href='mailto:ddmwebdesigns@gmail.com'>
                  <Button>Contact developer</Button>
              </a>
              </div>

            <div className="pt-3">
            <p>You can log out here.</p>
              <Button color="primary" onClick={handleSignOut}>
                Logout
              </Button>
              </div>
              </CardBody>
              </ModalBody>
              <ModalFooter>
                <div style={{margin: '10px auto'}}>
              <Button color="secondary" onClick={toggleModal}>
                Close
              </Button>
              </div>
              </ModalFooter>
          </Modal>
        </>
      )}
    </>
  );
}

export default Admin;
