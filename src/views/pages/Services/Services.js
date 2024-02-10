/* eslint-disable */

import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import React, { useState, useEffect }from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../../firebase.js"
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import LayoutHeader from '../../../components/Headers/LayoutHeader';
import '../../../assets/css/custom.css'
import { Link } from 'react-router-dom';
import DemoFooter from 'components/Footers/DemoFooter.js';
import SEO from 'components/SEO/SEO.js';

export default function Services() {
  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fallback, setFallback] = useState("");


  // Function to fetch list of services
  const fetchData = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = [];

      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() });
      });

      // Update the state with the collected data
      setData(servicesData);
      console.log(servicesData)
    } catch (error) {
      setFallback('Sorry there has been an error retrieving our services.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect call to fetch data on render/load
  useEffect(() => {
    fetchData();
  }, []);



  if(loading || !data) {
    return(
        <>
        <p>
            Loading...
        </p>
        </>
    )
  }

  if(!loading && !data) {
    return(
        <p>{fallback}</p>
    )
  }

  return (
    <div>
      <SEO 
    title='Locksmith Services by 4Sons LLC || Shreveport/Bossier Area' 
    content='Explore the comprehensive locksmith services offered by 4Sons LLC in the Shreveport/Bossier area. From residential to commercial locksmith solutions, we have you covered.'
    page="https://www.4sonsllc.com/our-services" 
    keywords="Shreveport locksmith services, Bossier City locksmith solutions, residential locksmith, commercial locksmith, automotive locksmith, key duplication, lock repair, lockout service, rekeying locks, master key system, high-security locks, safe installation, access control systems"
/>

      <ExamplesNavbar />
      <LayoutHeader title="Our Services" image={"url(" + require(`assets/img/4sons-header3.jpg`) + ")"} />
      <Container align='center' className='layout-page-content'>
          <p>At 4Sons Locksmiths, we pride ourselves as a reliable source for locksmith services. From securing homes to ensuring on-the-road assistance, we specialize in addressing both residential and automotive locksmith needs. Explore our range of comprehensive services designed to enhance security, providing swift and reliable solutions for our valued customers.</p>
          <br />
          {data.length > 0 && (
            <Row align="center">
            {data.map((service) => (
            <Col xs='12' md='6' key={service.id}>
                <div style={{width: '100%', maxWidth: '35rem', color: 'black'}}>
                    <CardBody>
                        <CardTitle>
                            <h3><span style={{textDecoration: 'underline'}}>{service.industry}</span></h3>
                        </CardTitle>
                        <CardText>
                          <ul style={{listStyleType: 'none'}}>
                          {service.industry_services.map((e) => {
                            return(
                              <li>
                                  <p>{e.service}</p>
                              </li>
                            )
                          })}
                          </ul>
                        </CardText>
                        <Link to={`/our-services/${service.id}`}>
                      <Button>Learn More</Button>
                    </Link>
                    </CardBody>
                </div>
            </Col>
          ))}
        </Row>
        )}
      </Container>
      <DemoFooter />
    </div>
  );
}
