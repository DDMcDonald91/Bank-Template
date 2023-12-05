import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import LayoutHeader from '../../../components/Headers/LayoutHeader';
import '../../../assets/css/custom.css'

export default function Services() {
  return (
    <div>
      <ExamplesNavbar />
      <LayoutHeader title="Our Services" image='bruno-abatti.jpg' />
      <Container className='layout-page-content'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique et egestas quis ipsum suspendisse ultrices gravida. Nascetur ridiculus mus mauris vitae. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Ut porttitor leo a diam. Semper feugiat nibh sed pulvinar proin. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Eget mauris pharetra et ultrices neque ornare aenean. Consectetur lorem donec massa sapien faucibus et molestie ac. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Sed sed risus pretium quam vulputate dignissim suspendisse. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Vel quam elementum pulvinar etiam. Cursus mattis molestie a iaculis at. Augue neque gravida in fermentum et sollicitudin ac. Pretium nibh ipsum consequat nisl vel pretium. Sagittis nisl rhoncus mattis rhoncus urna neque viverra.
          </p>
          <br />
          <br />
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
      </Container>
    </div>
  );
}
