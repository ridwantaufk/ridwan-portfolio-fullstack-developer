import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by Ridwan Taufik</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year}</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons-footer">
              <a
                className="whatsapp"
                // href="javascript:void(0)"
                href="https://wa.me/6281312025217"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
            <li className="social-icons-footer">
              <a
                className="github"
                // href="javascript:void(0)"
                href="https://github.com/ridwantaufk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="social-icons-footer">
              <a
                className="linkedin"
                // href="javascript:void(0)"
                href="https://linkedin.com/in/ridwan-taufik-b3624325a"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li className="social-icons-footer">
              <a
                className="instagram"
                // href="javascript:void(0)"
                href="https://instagram.com/ridwantaufk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
