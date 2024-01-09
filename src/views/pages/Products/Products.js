import ProductsList from 'components/Products/ProductsList'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import LayoutHeader from '../../../components/Headers/LayoutHeader';
import OrderSheetWidget from 'components/OrderSheet/OrderSheetWidget';
import OrderSheet from 'components/OrderSheet/OrderSheet';
import './index.css'
import DemoFooter from 'components/Footers/DemoFooter';
import SEO from 'components/SEO/SEO';

export default function Products() {
  return (
    <div>
      <SEO 
        title='Loyal 4 DMV || View Our Products' 
        content='View our various products and place an order for local delivery!' 
        page="https://www.loyaldmv.com/products" 
      />
        <ExamplesNavbar />
        <LayoutHeader title="Our Products" image='loyal-spare4.jpg' />
        <Container className='layout-page-content'>
          <Row>
            <Col xs='12' md='9' className='col order-xs-2'>
            <ProductsList />
            </Col>
            <Col xs='12' md='3' className='col order-xs-1'>
              <div id='order-sheet-container'>
            <OrderSheet />
            </div>
            </Col>
          </Row>
        </Container>
        <DemoFooter />
    </div>
  )
}
