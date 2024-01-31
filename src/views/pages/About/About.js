/* eslint-disable */

import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import React from 'react';
import { Container } from 'reactstrap';
import LayoutHeader from '../../../components/Headers/LayoutHeader';
import '../../../assets/css/custom.css'
import DemoFooter from 'components/Footers/DemoFooter';

export default function About() {
  return (
    <div>
      <ExamplesNavbar />
      <LayoutHeader title="About Us" image={"url(" + require(`assets/img/4sons-header5.jpg`) + ")"} />
      <Container align='center' className='layout-page-content'>
        <div>
        <p>
          Welcome to 4Sons Locksmiths, your go-to 24/7 locksmith service catering to the Shreveport and Bossier City areas in the state of Louisiana. At 4Sons Locksmiths, we recognize that lock and key emergencies can arise at any hour, day or night. Our team of highly skilled and dependable locksmiths is committed to providing continuous assistance to ensure your safety and tranquility.          <br />
          <br />
          Whether you're facing a lockout situation at home, in your car, or at your business, or if you urgently require help with a lock or key problem, count on us. Our adept and professional locksmiths come equipped with cutting-edge tools and technology to efficiently handle a diverse range of locksmith services.
          <br />
          Customer satisfaction ranks high on our list of priorities, and we take pride in delivering top-notch services at competitive rates. With years of experience in the locksmith industry, we've established a reputation for reliability, trustworthiness, and excellence.
        </p>
        </div>
        <br />
        <div>
          <h3>Why opt for 4Sons Locksmiths?</h3>
          <br />
          <ul>
            <li><p>24/7 Emergency Service: We're available around the clock to assist you with any locksmith emergency.</p></li>
            <li><p>Swift Response Time: Our team responds promptly to your calls, ensuring timely assistance.</p></li>
            <li><p>Skilled Professionals: Our locksmiths are highly trained and experienced in addressing various lock and key issues.</p></li>
            <li><p>Comprehensive Services: From lockouts to key replacements and security upgrades, we offer a broad spectrum of locksmith services.</p></li>
          </ul>
        </div>
        <div>
          <p>
            Your security is our paramount concern, and we are dedicated to providing you with the best locksmith solutions tailored to your specific needs. Trust 4Sons Locksmiths for reliable and efficient locksmith services in Shreveport and Bossier City. Contact us at any time, day or night, and experience the peace of mind that comes with having a trusted locksmith partner at your service.
          </p>
        </div>
      </Container>
      <DemoFooter />
    </div>
  );
}
