/* eslint-disable */

import React from "react";
import '../../assets/css/custom.css';

// reactstrap components
import { Container } from "reactstrap";

// core components

function ShortenedLandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/4sons-header.jpg") + ")",
        }}
        id='shortened-header'
        data-parallax={true}
        ref={pageHeader}
      >
        <div id='overlay'>
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1 style={{color: 'white', zIndex: '1000', textTransform: 'uppercase'}}>4Sons Locksmith LLC</h1>
            <h3 style={{color: 'white', zIndex: '1000'}}>The best locksmiths in the Shreveport/Bossier area</h3>
            
          </div>
        </Container>
        </div>
      </div>
    </>
  );
}

export default ShortenedLandingPageHeader;
