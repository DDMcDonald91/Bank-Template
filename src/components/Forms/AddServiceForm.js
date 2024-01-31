/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { doc, getDoc, getDocs, collection, setDoc } from 'firebase/firestore';
import { FormGroup, Label, Input, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';

export default function AddServiceForm() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fallback, setFallback] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(servicesData);
      console.log(servicesData);
    } catch (error) {
      setFallback('Sorry there has been an error retrieving our services.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedIndustry) {
        alert('Please select an industry before adding a service.');
        return;
      }

      const industryDocRef = doc(db, 'services', selectedIndustry);
      const industryDocSnap = await getDoc(industryDocRef);

      if (industryDocSnap.exists()) {
        const existingIndustryData = industryDocSnap.data();

        const newService = {
          service_description: serviceDesc,
          service: serviceName,
        };

        // Add the new service to the industry's services array
        const updatedIndustryServices = [
          ...(existingIndustryData.industry_services || []),
          newService,
        ];

        // Update the 'industry_services' array in the existing industry doc
        await setDoc(industryDocRef, { industry_services: updatedIndustryServices }, { merge: true });

        // update the user that submission was successful
        // setMessage('Your new service has been added!');
        alert('Your new service has been added!');

        // close the modal and reset the form
        toggleModal();
        handleReset();
      } else {
        alert('Selected industry does not exist.');
      }
    } catch (error) {
      setMessage('Error...please contact your developer.');
      console.error('Error adding service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedIndustry('');
    setServiceName('');
    setServiceDesc('');

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // fallback rendering if services collection is unavailable
  if (!loading && !data) {
    return (
      <p>{fallback}</p>
    );
  }

  return (
    <>
      <Button color="primary" onClick={toggleModal}>
        Add Service
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Service</ModalHeader>
        <ModalBody>
          <form id='service-form'>
            {message && <><Alert>{message}</Alert></>}
            <FormGroup>
              <Label for="serviceIndustry">Service Industry</Label>
              <Input
                required
                id="serviceIndustryInput"
                name="serviceIndustry"
                placeholder="Select the service industry"
                type="select"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="" disabled>Select an industry</option>
                {data.map((service) => (
                  <option value={service.id} key={service.id}>
                    {service.industry}
                  </option>
                ))}
              </Input>
            </FormGroup>

            {selectedIndustry && (
              <>
                <FormGroup>
                  <Label for="serviceName">Service Name</Label>
                  <Input
                    required
                    id="serviceNameInput"
                    name="serviceName"
                    placeholder="Enter your service name"
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="serviceDesc">Service Description</Label>
                  <Input
                    required
                    placeholder="Enter your service description"
                    id="serviceDescInput"
                    name="serviceDesc"
                    type="textarea"
                    value={serviceDesc}
                    onChange={(e) => setServiceDesc(e.target.value)}
                  />
                </FormGroup>
                
                <div align='center'>
                    <ButtonGroup>
                <Button onClick={toggleModal}>
                    Close
                </Button>
                <Button color="primary" type='submit' onClick={handleAdd} disabled={loading}>
                  {loading ? 'Adding...' : 'Add'}
                </Button>
                </ButtonGroup>
                </div>
              </>
            )}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
