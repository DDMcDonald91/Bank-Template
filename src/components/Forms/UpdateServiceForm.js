/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { doc, getDoc, getDocs, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FormGroup, Label, Input, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';

const UpdateServiceForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fallback, setFallback] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedService, setSelectedService] = useState(null);
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
      console.log(data)
    } catch (error) {
      setFallback('Sorry there has been an error retrieving our services.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (!selectedService || !selectedIndustry) {
        alert('Please select a service and industry to update.');
        return;
      }
  
      console.log('Selected Industry:', selectedIndustry);
      console.log('Selected Service:', selectedService);
  
      const serviceDocRef = doc(
        db,
        'services',
        selectedIndustry
      );
  
      const serviceDocSnap = await getDoc(serviceDocRef);
  
      if (serviceDocSnap.exists()) {
        const industryServices = serviceDocSnap.data().industry_services;
  
        if (industryServices) {
          const updatedServices = industryServices.map((service) =>
            service.service === selectedService.service
              ? {
                  ...service,
                  service_description: serviceDesc,
                  service: serviceName,
                }
              : service
          );
  
          try {
            await updateDoc(serviceDocRef, {
              industry_services: updatedServices,
            });
            console.log('just checking if this is working')
            //setMessage('Your service has been updated!');            
            alert('Your service has been updated!');
            fetchData()
          } catch (error) {
            console.log(error);
            setMessage('Error');
          }
        } else {
          alert('The industry_services array does not exist.');
        }
      } else {
        alert('The doc does not exist.');
      }
    } catch (error) {
      console.error('Error updating service:', error);
    } finally {
      handleReset();
      setLoading(false);
    }
  };
  
  
  
  
  
  

  const handleReset = () => {
    setSelectedIndustry('');
    setSelectedService(null);
    setServiceName('');
    setServiceDesc('');
    setModalOpen(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleModal = (service) => {
    setSelectedService(service);
    setServiceName(service.service);
    setServiceDesc(service.service_description);
    setModalOpen(!modalOpen);
  };

  if (!loading && !data) {
    return (
      <p>{fallback}</p>
    );
  }

  return (
    <>
      {data && (
        <>
          <FormGroup style={{maxWidth: '30rem', margin: 'auto auto'}}>
            <Label for="serviceIndustry">
              Service Industry
            </Label>
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
        </>
      )}

      {selectedIndustry && (
        <>
        <div className='pb-5'>
            <p>
                <span style={{fontStyle: 'italic'}}>Now choose the service you want to update.</span>
            </p>
        </div>
          {data
  .find((service) => service.id === selectedIndustry)
  .industry_services.map((service) => (
    <div key={service.id} onClick={() => toggleModal(service)}>
      <p>
        <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{service.service}</span>
        </p>
              </div>
            ))}
        </>
      )}

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Update Service</ModalHeader>
        <ModalBody>
          <form id='service-form'>
            {message && <><Alert>{message}</Alert></>}
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

            
          </form>
            <div align='center'>
                <ButtonGroup>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button color="primary" onClick={handleUpdate} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </ButtonGroup>
          </div>
          </ModalBody>      
          </Modal>
    </>
  );
};

export default UpdateServiceForm;
