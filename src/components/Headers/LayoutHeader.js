import React from "react";

// reactstrap components

// core components

function ProfilePageHeader(props) {
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
            "url(" + require(`assets/img/${props.image}`) + ")",
        }}
        className="page-header page-header-xs p-2"
        data-parallax={true}
        ref={pageHeader}
      >
        <h1 style={{color: 'white', fontWeight: 'bold', zIndex: '10'}}>{props.title}</h1>
        <div className="filter" />
      </div>
    </>
  );
}

export default ProfilePageHeader;
