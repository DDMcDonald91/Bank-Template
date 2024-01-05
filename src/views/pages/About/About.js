import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import React from 'react';
import { Container } from 'reactstrap';
import LayoutHeader from '../../../components/Headers/LayoutHeader';
import '../../../assets/css/custom.css'

export default function About() {
  return (
    <div>
      <ExamplesNavbar />
      <LayoutHeader title="About Us" image='loyal-spare2.jpg' />
      <Container className='layout-page-content'>
        <p>
          We strive to provide cultivation practices that are transparent and consistent. To ensure a high-quality experience, Look for dispensaries or growers with positive reviews and a transparent approach to cultivation.
          <br />
          <br />
          Personal preferences also play a role, so consider your desired effects when evaluating the strain. We want to provide clear and accurate information so we can build trust with our consumers. We also strive for commitment to excellent customer service, including having knowledgeable staff who are responsive to customer inquiries, so we can provide a positive shopping experience.
          <br />
          <br />
          We offer a variety of products, including flowers, edibles, concentrates, and topicals, to meet the diverse preferences and needs of consumers. We do Regular testing for potency, contaminants, and pesticides to ensure the safety and quality of the products
        </p>
      </Container>
    </div>
  );
}
