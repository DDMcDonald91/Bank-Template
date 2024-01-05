import React from "react";
import './index.css'

// reactstrap components
import { Row, Container, Nav, NavItem, NavLink, Col } from "reactstrap";
import { Link } from "react-router-dom";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white custom-footer">
      <Container style={{width: '375px'}}>
        <Row>
        <Nav navbar className='footer-nav'>
          <Row>
            <Col xs='3'>
            <NavItem align='center'>
              <NavLink to="/about-us" className="footer-link" tag={Link}>
                About
              </NavLink>
            </NavItem>
            </Col>
            <Col xs='3'>
            <NavItem align='center'>
              <NavLink to="/our-services" className="footer-link" tag={Link}>
                Services
              </NavLink>
            </NavItem>
            </Col>
            <Col xs='3'>
            <NavItem align='center'>
              <NavLink to="/products" className="footer-link" tag={Link}>
                Products
              </NavLink>
            </NavItem>
            </Col>
            <Col xs='3'>
            <NavItem align='center'>
              <NavLink to="/contact-us" className="footer-link" tag={Link}>
                Contact
              </NavLink>
            </NavItem>
            </Col>
            </Row>
          </Nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © 2023 created by <a href='https://www.ddmwebdesigns.com' target='_blank' >DDM Web Designs</a>
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
