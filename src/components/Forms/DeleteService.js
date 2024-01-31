/* eslint-disable */

import React, { useState, useEffect } from "react";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  ButtonGroup,
} from "reactstrap";
import { db } from "../../firebase"; // Make sure to import your firebase instance

export default function DeleteService() {
  const [data, setData] = useState([]);
  const [fallback, setFallback] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // handle fetching docs for structured dynamic upload
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const servicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(servicesData);
      console.log(servicesData);
    } catch (error) {
      setFallback("Sorry there has been an error retrieving our services.");
    }
  };

  const handleDeleteService = async () => {
    try {

      const serviceDocRef = doc(db, "services", selectedIndustryId);
      const serviceDoc = await getDoc(serviceDocRef);

      if (serviceDoc.exists()) {
        const existingServices = serviceDoc.data().industry_services;

        // Use filter to create a new array without the service to be deleted
        const updatedServices = existingServices.filter(
          (service, index) => index !== selectedServiceIndex
        );

        // Now we need to update the correct document path
        await updateDoc(serviceDocRef, {
          industry_services: updatedServices,
        });

        console.log("Service deleted successfully.");
        fetchData(); // Fetch updated data after deletion
        toggleModal(); // Close the modal after deletion
      } else {
        console.log("Service document does not exist.");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const openModal = (service, industryId, serviceIndex) => {
    setSelectedService(service);
    setSelectedIndustryId(industryId);
    setSelectedServiceIndex(serviceIndex);
    toggleModal();
  };

  return (
    <Container>
      {data.map((industry) => (
        <div key={industry.id}>
          <h3>{industry.industry}</h3>
          {industry.industry_services.map((service, index) => (
            <div key={service.id}>
              <p
                onClick={() => openModal(service, industry.id, index)}
                style={{ cursor: "pointer" }}
              >
                {service.service}
              </p>
            </div>
          ))}
        </div>
      ))}

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Delete Service</ModalHeader>
        <ModalBody>
        <p><span style={{fontStyle: 'italic'}}>Are you sure you want to delete the following service?</span></p>
        <br />
          <p><span style={{textDecoration: 'underline', fontWeight: 'bold'}}>{selectedService?.service}</span></p>
        
        <div align='center'>
            <ButtonGroup>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleDeleteService}>
            Confirm Delete
          </Button>
          </ButtonGroup>
          </div>
          </ModalBody>
      </Modal>
    </Container>
  );
}
