import React from 'react'
import CustomerForm from 'components/Forms/CustomerForm'
import { useOrders } from 'context/OrdersContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import LayoutHeader from 'components/Headers/LayoutHeader'
import '../../../assets/css/custom.css'



export default function Confirmation() {
    const { orders } = useOrders()

    // Count the occurrences of each product in the order
    const productCounts = orders.reduce((acc, item) => {
     const key = `${item.name}-${item.option}`;
     acc[key] = (acc[key] || 0) + 1;
     return acc;
   }, {});
 
   // Create an array of unique products with quantity
   const uniqueProducts = Object.keys(productCounts).map((key) => ({
     key,
     quantity: productCounts[key],
   }));

       // Calculate the total order price
       const totalOrderPrice = orders.reduce((total, product) => total + product.price, 0);

       
  return (
    <div>
        <ExamplesNavbar />
        <LayoutHeader title="Confirm Your Order" image='loyal-contact.jpg' />
        <Container className='layout-page-content'>
            <Row>
                <Col md='8'>
                    <Card>
                        <CardBody>
                        <CustomerForm />
                        </CardBody>
                    </Card>
                </Col>
                <Col md='4'>
                    <div>
                            <CardBody>
                            {orders.length != 0 ? 
      <>
      <div className='pb-3'>
        <h4>Current Order Sheet</h4>
      </div>
      <ul className='p-0 w-100'>
              {uniqueProducts.map((product, index) => {
                const [productName, productOption] = product.key.split('-');

                return (
                  <li key={index} className='d-flex pt-1 pb-1' style={{fontWeight: 'bold'}}>
                    {productName} - {productOption}
                    {product.quantity > 1 && (
                      <span className="quantity">{`x${product.quantity} `}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className='pt-5'>
            <p>
              <small>Total Order Price: ${totalOrderPrice.toFixed(2)}</small>
            </p>
            <p><small>Need to make changes?</small></p>

              <Link to='/products'>
                <Button>Go Back</Button>
              </Link>
            </div>
      </>
      :
      <><p>No Items Ordered</p>
      <div className='pt-5'>
      <p><small>Order some products!</small></p>
              <Link to='/products'>
                <Button>Go Back</Button>
              </Link>
            </div>
      </>
      }
                            </CardBody>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
