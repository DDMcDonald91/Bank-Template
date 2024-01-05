import DemoFooter from 'components/Footers/DemoFooter'
import LandingPageHeader from 'components/Headers/LandingPageHeader'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import React, { useState } from 'react'
import { Row, Col, Button, Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink, CardImg, Container, FormGroup, Label, Input, ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroup } from 'reactstrap'
import './index.css'
import '../../../assets/css/custom.css'
import { Link } from 'react-router-dom'
import FeaturedList from 'components/Products/FeaturedList'
import { FaShoppingCart } from 'react-icons/fa'
import { RiFilePaperLine } from 'react-icons/ri'
import { MdAccessTime } from "react-icons/md";
import SecondaryFeaturedList from 'components/Products/SecondaryFeaturedList'

export default function Home() {
  // state
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)

    //check
    if(!email){
      alert('Missing email address');
      setLoading(false)
      return
    }
    
    alert('Demo email subscription functionality.')

    setEmail('')

    setLoading(false)

  }
  return (
    <>
        <ExamplesNavbar />
        <LandingPageHeader />

        <Container id='home-container' fluid>

        <div className='section'>
            <div className='section-title-container'>
                <h2 className='section-title'>Featured Products</h2>
                <h4 className='section-subtitle'>View our best sellers!</h4>
            </div>
            <FeaturedList />
          <Link to='/products'>
            <Button>
              View Products
            </Button>
          </Link>
        </div>
        <div className='section'>
          <div className='section-title-container'>
            <h2 className='section-title'>About Us</h2>
            <h4 className='section-subtitle'>The BEST Delivery Service in DMV</h4>
          </div>
            <Row align='left'>
                <Col md='6'>
                  <p>We strive to provide cultivation practices that are transparent and consistent. To ensure a high-quality experience, Look for dispensaries or growers with positive reviews and a transparent approach to cultivation. Personal preferences also play a role, so consider your desired effects when evaluating the strain.</p>
                  <div>
                    <br />
                  <Link to='/about-us'>
                    <Button>Learn More</Button>
                  </Link>
                  </div> 
                </Col>
                <Col md='6' className='section-image-lg'>
                </Col>
            </Row>
        </div>
        
        <div className='section'>
            <div className='section-title-container'>
                <h2 className='section-title'>Local Delivery Service</h2>
                <h4 className='section-subtitle'>It doesn't get any easier.</h4>
            </div>
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
                      <CardTitle className='service-title'>2. Place An Online Order</CardTitle>
                      <br />
                      <CardText>
                        <p>Place an order using our website for delivery.</p>
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
        </div>

        <div className='section'>
            <div className='section-title-container'>
                <h2 className='section-title'>Get Started</h2>
                <h4 className='section-subtitle'>Efficient and Quick Local Deliveries</h4>
            </div>
            <Row align='left'>
            <Col md='6'>
                  <p>We offer a variety of products, including flowers, edibles, concentrates, and topicals, to meet the diverse preferences and needs of consumers. Just submit a order form and our team will be with you immediately to assist you with your order.</p>
                  <br />
                  <Link to='/products'>
                    <Button>
                      Order Now
                    </Button>
                  </Link>
                </Col>
              <Col md='6' className='section-image-sm'>
                </Col>
                
            </Row>
        </div>

        </Container>
        <div className='section' id='newsletter-section'>
          <div id='newsletter'>
            <div id='overlay'>
            <div id='newsletter-content'>
              <div className='section-title-container'>
                  <h2 className='section-title'>Stay In Touch</h2>
                  <h4 className='section-subtitle'>Subscribe to our newsletter to get notifications of new products, discounts, deals, and more!</h4>
              </div>
              <div id='newsletter-container'>
                <form id='newsletter-form' onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">
                    Email
                  </Label>
                  <Input
                    id="emailInput"
                    name="email"
                    placeholder="enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </FormGroup>
                <Button type='submit' disabled={loading}>
                  Subscribe
                </Button>
                </form>
              </div>
            </div>
            </div>
          </div>
        </div>
        <DemoFooter />
    </>
  )
}
