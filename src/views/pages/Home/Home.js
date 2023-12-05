import DemoFooter from 'components/Footers/DemoFooter'
import LandingPageHeader from 'components/Headers/LandingPageHeader'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import React, { useState } from 'react'
import { Row, Col, Button, Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink, Container, FormGroup, Label, Input } from 'reactstrap'
import './index.css'
import '../../../assets/css/custom.css'

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
            <h2 className='section-title'>About Us</h2>
            <h4 className='section-subtitle'>Describe your business</h4>
          </div>
            <Row align='left'>
                <Col md='6'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
                </Col>
                <Col md='6' className='section-image-lg'>
                </Col>
            </Row>
        </div>
        
        <div className='section'>
            <div className='section-title-container'>
                <h2 className='section-title'>What We Do</h2>
                <h4 className='section-subtitle'>Describe What You Offer</h4>
            </div>
            <Row align='left'>
            <Col md='8'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Col>
              <Col md='4' className='section-image-sm'>
                </Col>
                
            </Row>
        </div>
        <div className='section'>
            <div className='section-title-container'>
                <h2 className='section-title'>Services</h2>
                <h4 className='section-subtitle'>List Your Services Here</h4>
            </div>
          <Row align='left'>
            <Col lg='4'>
              <Card style={{width: '100%', maxWidth: '35rem'}}>
                  <CardBody>
                      <CardTitle>Service 1</CardTitle>
                      <br />
                      <CardSubtitle className="mb-2 text-muted">Service 1 subtitle</CardSubtitle>
                      <CardText>
                        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </CardText>
                      
                  </CardBody>
              </Card>
            </Col>
            <Col lg='4'>
              <Card style={{width: '100%', maxWidth: '35rem'}}>
                  <CardBody>
                      <CardTitle>Service 2</CardTitle>
                      <br />
                      <CardSubtitle className="mb-2 text-muted">Service 2 subtitle</CardSubtitle>
                      <CardText>
                        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </CardText>                      
                  </CardBody>
              </Card>
            </Col>
            <Col lg='4'>
              <Card style={{width: '100%', maxWidth: '35rem'}}>
                  <CardBody>
                      <CardTitle>Service 3</CardTitle>
                      <br />
                      <CardSubtitle className="mb-2 text-muted">Service 3 subtitle</CardSubtitle>
                      <CardText>
                        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </CardText>                      
                  </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <div className='section'>
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
        </Container>
        <DemoFooter />
    </>
  )
}
