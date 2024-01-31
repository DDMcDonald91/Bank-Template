/* eslint-disable */
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";
import { Link } from "react-router-dom";

import './index.css'

function DemoFooter() {
  return (
    <footer align='center' className="footer footer-black footer-white" id='footer'>
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                  <Link to='/' className="text-white">Home</Link>
              </li>
              <li>
              <Link to='/about-us' className="text-white">About</Link>
              </li>
              <li>
              <Link to='/our-services' className="text-white">Services</Link>
              </li>
              <li>
              <Link to='/contact-us' className="text-white">Contact Us</Link>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright text-white">
              © 2024 created by <a href="https://www.ddmwebdesigns.com" target='_blank' className="text-white">DDM Web Designs</a>
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
