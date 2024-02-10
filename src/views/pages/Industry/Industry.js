/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LayoutHeader from "../../../components/Headers/LayoutHeader.js";
import { Container, Button, Modal } from "reactstrap";
import DemoFooter from "components/Footers/DemoFooter.js";
import SEO from "components/SEO/SEO.js";

export default function Industry() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [modals, setModals] = useState([]);
  const { id } = useParams();

  const toggleModal = (index) => {
    const newModals = [...modals];
    newModals[index] = !newModals[index];
    setModals(newModals);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "services", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data());
        console.log(data);

        // Initialize modal state array with false values for each service
        setModals(Array(docSnap.data().industry_services.length).fill(false));
      }
    } catch (error) {
      console.log("There has been an error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  if (!loading && !data) {
    return <p>Error loading data.</p>;
  }

  return (
    <div>
      {data && (
        <>
              <SEO 
    title={`${data.industry} Locksmith Services by 4Sons LLC || Shreveport/Bossier Area`} 
    content='Explore the comprehensive locksmith services offered by 4Sons LLC in the Shreveport/Bossier area. From residential to commercial locksmith solutions, we have you covered.'
    page="https://www.4sonsllc.com/our-services:id" 
    keywords="Shreveport locksmith services, Bossier City locksmith solutions, residential locksmith, commercial locksmith, automotive locksmith, key duplication, lock repair, lockout service, rekeying locks, master key system, high-security locks, safe installation, access control systems"
/>
          <ExamplesNavbar />
          {data.cover_img  ? <> 
            <LayoutHeader
              title={data.industry}
              image={`url(${data.cover_img})`}
            />
          
          </>
          :
          <>
          <LayoutHeader
              title={data.industry}
              image="url('https://images.unsplash.com/photo-1584985429926-08867327d3a6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            />
          </>}

          <Container align='center' className="layout-page-content">
            <div>
              <p>{data.industry_description}</p>
            </div>
            <br />
            <div>
              {data.industry_services && (
                <>
                  <p>Click on any of our services to learn more information.</p>
                  <ul style={{listStyleType: 'none'}}>
                    {data.industry_services.map((e, index) => (
                      <React.Fragment key={e.service}>
                        <li className="pt-1 pb-1">
                          <h3
                            type="button"
                            onClick={() => toggleModal(index)} // Open modal on click
                            style={{ cursor: "pointer", fontWeight: "bold" }}
                          >
                            {e.service}
                          </h3>
                          {/* Modal */}
                          <Modal
                            align='center'
                            isOpen={modals[index]}
                            toggle={() => toggleModal(index)}
                            className="modal-lg"
                            modalClassName="bd-example-modal-lg"
                          >
                            <div className="modal-header">
                              <h5 className="modal-title">{data.industry}</h5>
                              <button
                                type="button"
                                aria-label="Close"
                                data-dismiss="modal"
                                className="btn-close close"
                                onClick={() => toggleModal(index)}
                              >
                                <span aria-hidden={true}>×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <p>{e.service_description}</p>
                              <div className="mt-5">
                                <Link to="/contact-us">
                                  <Button>Contact Us</Button>
                                </Link>
                              </div>
                            </div>
                          </Modal>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Container>
        </>
      )}
      <DemoFooter />
    </div>
  );
}
