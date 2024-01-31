/* eslint-disable */
import LandingPageHeader from 'components/Headers/LandingPageHeader'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  FormGroup,
  Label,
  Input,
  List
} from "reactstrap";
import './index.css'
import '../../../assets/css/custom.css'
import DemoFooter from 'components/Footers/DemoFooter'
import ShortenedLandingPageHeader from 'components/Headers/ShortenedLandingPageHeader';
import { Link } from 'react-router-dom';
import IndustryList from 'components/IndustryList/IndustryList';

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
        <ShortenedLandingPageHeader />

        <Container id='home-container' fluid>

        <div className='section'>
            <div align='center' className='section-title-container'>
                <h2 className='section-title heading'>Our Services</h2>
                <h4 className='section-subtitle'>Check out our services.</h4>
            </div>
          <IndustryList />
        </div>

        <div className='section'>
          <div align='center' className='section-title-container'>
            <h2 className='section-title heading'>Your Trusted Local Locksmiths</h2>
            <h4 className='section-subtitle'>Servicing the Shreveport/Bossier Area</h4>
          </div>
            <Container align='center'>
                <div>
                  <p>Welcome to 4Sons Locksmiths, your go-to 24/7 locksmith service catering to the Shreveport and Bossier City areas in the state of Louisiana. At 4Sons Locksmiths, we recognize that lock and key emergencies can arise at any hour, day or night. Our team of highly skilled and dependable locksmiths is committed to providing continuous assistance to ensure your safety and tranquility.</p>
                  <br /> 
                  <div className='section-image-lg'>
                  </div> 
                  <br />
                  <p>Whether you're facing a lockout situation at home, in your car, or at your business, or if you urgently require help with a lock or key problem, count on us. Our adept and professional locksmiths come equipped with cutting-edge tools and technology to efficiently handle a diverse range of locksmith services.</p> 
                </div>
            </Container>
        </div>

        <div className='section'>
          <div align='center' className='section-title-container'>
            <h2 className='section-title heading'>Why Choose Us</h2>
            <h4 className='section-subtitle'>Fully Licensed, Bonded, and Insured</h4>
          </div>
          <Container align='center'>
                <Row>
                    <Col xs='12' md='4'>
                      <div>
                        <CardBody>
                        <i class="nc-icon nc-lock-circle-open" style={{fontSize: '40px'}} />
                      <h3>Certified Locksmiths</h3>
                      <br />
                      <p>Offering the expertise of certified locksmiths, ensuring professional and reliable lock and key solutions for your security needs.</p>
                      </CardBody>
                      </div>
                    </Col>
                    <Col xs='12' md='4'>
                    <div>
                        <CardBody>
                        <i class="nc-icon nc-single-02" style={{fontSize: '40px'}} /> 
                      <h3>Customer Support</h3>
                      <br />
                      <p>Our dedicated customer support team is committed to providing exceptional service in the area.</p>
                      </CardBody>
                      </div>
                    </Col>
                    <Col xs='12' md='4'>
                    <div>
                        <CardBody>
                        <i class="nc-icon nc-user-run" style={{fontSize: '40px'}} />
                      <h3>Quickest Response</h3>
                      <br />
                      <p>Count on us for the quickest response times in locksmith services, prioritizing your security and peace of mind.</p>
                      </CardBody>
                      </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </Container>
        <div className='section' style={{background: 'black', color: 'white'}}>
          <div align='center' className='section-title-container'>
            <h2 className='section-title heading'>Our Testimonials</h2>
            <h4 className='section-subtitle'>What our clients say</h4>
          </div>
          <Container align='center'>
                <Row>
                    <Col xs='12' md='4'>
                      <div>
                        <CardBody>
                      <p>"I recently used their locksmith services, and I was thoroughly impressed with their expertise. The locksmith quickly resolved my lockout situation, demonstrating professionalism and skill. Highly recommended!</p>
                      <br />
                      <h3>- John S.</h3>
                      </CardBody>
                      </div>
                    </Col>
                    <Col xs='12' md='4'>
                    <div>
                        <CardBody>
                      <p>"I want to express my gratitude for the exceptional customer service provided by this locksmith company. Their team was friendly, responsive, and went above and beyond to ensure my security needs were met. A top-notch service!"</p>
                      <br />
                      <h3>- Emily R.</h3>
                      </CardBody>
                      </div>
                    </Col>
                    <Col xs='12' md='4'>
                    <div>
                        <CardBody>
                      <p>"In a locksmith emergency, their team delivered a rapid and reliable response. The locksmith arrived promptly, resolved the issue efficiently, and even provided valuable insights for improving overall security. Thank you for the peace of mind!"</p>
                      <br />
                      <h3>- Michael H.</h3>
                      </CardBody>
                      </div>
                    </Col>
                </Row>
            </Container>
        </div>

        <div>
          <div id='newsletter' className='p-0'>
            <div id='overlay'>
            <div align='center' id='newsletter-content'>
              <div className='section-title-container'>
                  <h2 className='section-title heading'>24/7 Support</h2>
                  <h4 className='section-subtitle'>We're here for you whenever you need us!</h4>
              </div>
              <div id='newsletter-container'>
                <Link to='/contact-us'>
                  <Button>
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      <DemoFooter />
    </>
  )
}
