import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                  Bank
              </li>
              <li>
                <a
                  href="#"
                >
                  About 
                </a>
              </li>
              <li>
                <a
                  href="#"
                >
                  Services
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © 2023 created by DDM Web Designs
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
