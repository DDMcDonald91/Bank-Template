import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase.js"
import { Button, CardBody, CardText, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function IndustryList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fallback, setFallback] = useState("");
  // Function to limit characters
  const limitCharacters = (text, limit) => {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  // Function to fetch list of services
  const fetchData = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = [];

      querySnapshot.forEach((doc) => {
        // Collect the data from each document and limit characters
        const limitedDescription = limitCharacters(doc.data().industry_description, 150);

        servicesData.push({ id: doc.id, ...doc.data(), industry_description: limitedDescription });
      });

      // Update the state with the collected data
      setData(servicesData);
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
    <>
    {data.length > 0 && (
        <Row align="center">
        {data.map((service) => (
        <Col xs='12' md='6' key={service.id}>
            <div style={{width: '100%', maxWidth: '30rem'}}>
                <CardBody>
                  <div style={{height: '350px', width: '100%', backgroundImage: `url(${service.cover_img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
                    <CardTitle>
                        <h4>{service.industry}</h4>
                    </CardTitle>
                    <CardText>
                        <p>{service.industry_description}</p>
                    </CardText>
                    <br />
                    <Link to={`/our-services/${service.id}`}>
                      <Button>
                        Learn More
                      </Button>
                    </Link>
                </CardBody>
            </div>
        </Col>
      ))}
    </Row>
    )}
    </>
  )
}
