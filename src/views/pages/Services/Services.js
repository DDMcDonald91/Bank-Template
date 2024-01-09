import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import LayoutHeader from '../../../components/Headers/LayoutHeader';
import { FaShoppingCart } from 'react-icons/fa'
import { RiFilePaperLine } from 'react-icons/ri'
import { MdAccessTime } from "react-icons/md";
import '../../../assets/css/custom.css'
import DemoFooter from 'components/Footers/DemoFooter';
import SEO from 'components/SEO/SEO';

export default function Services() {
  return (
    <div>
      <SEO 
        title='Loyal 4 DMV || View Our Services' 
        content='We pride ourselves on being the best marijuana delivery service in the DMV area! Learn more about our delivery services.' 
        page="https://www.loyaldmv.com/our-services" 
      />
      <ExamplesNavbar />
      <LayoutHeader title="Our Services" image='loyal-spare3.jpg' />
      <Container className='layout-page-content'>
          <p>
          We strive to provide cultivation practices that are transparent and consistent. To ensure a high-quality experience, Look for dispensaries or growers with positive reviews and a transparent approach to cultivation.
          </p>
          <br />
          <br />
          <Row align='left'>
            <Col lg='4'>
              <div style={{width: '100%', maxWidth: '35rem'}}>
                  <CardBody>
                    <div className='service-icon-container'>
                      <FaShoppingCart className='service-icon' />
                    </div>
                      <CardTitle className='service-title'>1. Explore Our Catalog</CardTitle>
                      <br />
                      <CardText>
                        <p>Browse our various products available for delivery.</p>
                      </CardText>
                      
                  </CardBody>
              </div>
            </Col>
            <Col lg='4'>
              <div style={{width: '100%', maxWidth: '35rem'}}>
                  <CardBody>
                    <div className='service-icon-container'>
                      <RiFilePaperLine className='service-icon' />
                    </div>
                      <CardTitle className='service-title'>2. Contact Our Team To Order</CardTitle>
                      <br />
                      <CardText>
                        <p>Contact our team to confirm your order for delivery.</p>
                      </CardText>                      
                  </CardBody>
              </div>
            </Col>
            <Col lg='4'>
              <div style={{width: '100%', maxWidth: '35rem'}}>
                  <CardBody>
                    <div className='service-icon-container'>
                      <MdAccessTime className='service-icon'  />
                    </div>
                      <CardTitle className='service-title'>3. Receive Your Order</CardTitle>
                      <br />
                      <CardText>
                        <p>Receive personal delivery of your order from our team.</p>
                      </CardText>                      
                  </CardBody>
              </div>
            </Col>
          </Row>
      </Container>
      <DemoFooter />
    </div>
  );
}
