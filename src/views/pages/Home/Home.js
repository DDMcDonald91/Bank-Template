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
            <h4 className='section-subtitle'>Learn about our business.</h4>
          </div>
            <Row align='left'>
                <Col md='6'>
                  <p>Welcome to Got Teacakes?, where our passion for exquisite teacakes takes center stage! As a dedicated small business, Got Teacakes? takes pride in crafting delectable teacakes that are more than just desserts – they're an experience. Nestled in the heart of [Location], our journey began with a simple mission: to bring joy to your tea time with our signature teacakes. Handcrafted with love and the finest ingredients, each teacake is a testament to our commitment to quality and flavor. Whether you're savoring a classic vanilla teacake or indulging in our unique seasonal creations, every bite is a moment of pure bliss. Join us on this sweet adventure, and let Got Teacakes? be your go-to destination for irresistible teacakes that elevate your tea-drinking experience.</p> 
                </Col>
                <Col md='6' className='section-image-lg'>
                </Col>
            </Row>
        </div>
        
        <div className='section'>
            <div className='section-title-container'>
                <h2 className='section-title'>What We Do</h2>
                <h4 className='section-subtitle'>Proving delcious teacakes.</h4>
            </div>
            <Row align='left'>
            <Col md='8'>
                  <p>At Got Teacakes?, we specialize in curating a delightful range of teacakes that are as diverse as they are delicious. Our skilled bakers infuse passion into every step of the baking process, creating teacakes that are not just sweet treats but a celebration of flavors. From timeless classics to innovative and seasonal creations, we pride ourselves on offering a teacake for every palate.</p>
                </Col>
              <Col md='4' className='section-image-sm'>
                </Col>
                
            </Row>
        </div>
        <div className='section'>
            <div className='section-title-container'>
                <h2 className='section-title'>Flavors</h2>
                <h4 className='section-subtitle'>Check out our featured flavors.</h4>
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
