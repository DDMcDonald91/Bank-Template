import React, { useState, useEffect } from "react";

// firebase imports
import { auth } from "../../../firebase";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

// react router dom import
import { useNavigate } from "react-router-dom";

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
} from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import LayoutHeader from "components/Headers/LayoutHeader.js"
import AddProductForm from "components/Forms/AddProductForm";
import AdminList from "components/Products/AdminList";

function Admin() {
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

  //custom code
  // state
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

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
      <LayoutHeader title="Admin Dashboard" image='loyal-spare4.jpg' />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/logo2.png")}
              />
            </div>
            <div className="name">
              <h4 className="title">Loyal 4 DMV</h4>
              <br />
              <h6 className="description">DMV Marijuana Delivery Service</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                Admin section for adding, updating, and deleting products.
              </p>
              <br />
              <UncontrolledDropdown>
                <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  className="btn-round"
                  outline
                  color="secondary"
                  data-toggle="dropdown"
                  id="dropdownMenuButton"
                  type="button"
                  style={{ color: "black" }}
                >
                  <i className="fa fa-cog" /> Settings
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  <DropdownItem onClick={handleSignOut}>
                    <p>Sign Out</p>
                  </DropdownItem>
                </DropdownMenu>
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
                    style={{fontWeight: 'bold', color: 'black'}}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    View Current Products
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    style={{fontWeight: 'bold', color: 'black'}}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Add New Products
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>

          
          {/* Tab panes */}
          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
              <AdminList />
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
              <AddProductForm />
            </TabPane>
          </TabContent>

        </Container>
      </div>
    </>
  );
}

export default Admin;
