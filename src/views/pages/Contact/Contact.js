/* eslint-disable */

import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import LayoutHeader from "components/Headers/LayoutHeader";
import React, { useState, useRef, useEffect } from "react";
import { Container, FormGroup, Label, Input, Button, Alert, Row, Col } from "reactstrap";
import emailjs from "@emailjs/browser";
import "./index.css";
import DemoFooter from "components/Footers/DemoFooter";
import { db } from "../../../firebase.js";
import { getDocs, collection } from "firebase/firestore";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [result, setResult] = useState({
    color: '',
    message: '',
  })
  const [fallback, setFallback] = useState("");

  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // secondary validation check
    if (!firstName || !lastName || !email || !message || !selectedService || !phoneNumber) {
      alert("Please add missing fields.");
      setLoading(false)
      return;
    }

    try {
      await emailjs
        .sendForm(
          "service_2b91gd6",
          "template_0oowrqx",
          form.current,
          "PTlBsI4n0YeI2TuiQ"
        )
        .then((result) => {
          console.log(result);
        });
      setResult(
          {
            message: "Thank you for contacting us! We will be contacting you soon.",
            color: 'primary'
          }
        );
    } catch (error) {
      setResult(
        {
          message: "Sorry there has been an issue. Please try again.",
          color: 'danger'
        }
      );
    } finally {
      handleReset();
    }
  };

  const handleReset = () => {
    setEmail("");
    setMessage("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setSelectedService("")
    setTimeout(() => {setResult({
      color: '',
      message: '',
    })}, 3000)
    setLoading(false);
  };


  // Function to fetch list of services
  const fetchData = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const servicesData = [];

      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() });
      });

      // Update the state with the collected data
      setData(servicesData);
      console.log(servicesData);
    } catch (error) {
      setFallback("Sorry there has been an error retrieving our services.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect call to fetch data on render/load
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedService);
  }, [selectedService]);

  return (
    <div>
      <ExamplesNavbar />
      <LayoutHeader
        title="Contact Us"
        image={"url(" + require(`assets/img/4sons-header2.jpg`) + ")"}
      />
      <Container align="center" className="layout-page-content">
        <div id="contact-page-content">
          <p>
            Ready to enhance your security or address lock-related concerns?
            Contact us today for reliable and professional locksmith services.
            Our team is here to assist you promptly and ensure your peace of
            mind.{" "}
          </p>
        </div>
        <br />
        <form ref={form} id="contact-form" onSubmit={handleSubmit}>
          {result.message && result.color && (<Alert color={result.color}>{result.message}</Alert>)}
          <Row>
          <Col xs='12' md='6'>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              required
              id="firstNameInput"
              name="firstName"
              placeholder="enter your first name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </FormGroup>
          </Col>
          <Col xs='12' md='6'>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              required
              id="lastNameInput"
              name="lastName"
              placeholder="enter your last name"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </FormGroup>
          </Col>
          </Row>
              
                <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              required
              id="phoneNumberInput"
              name="phoneNumber"
              placeholder="enter your phone number"
              type="tel" // Using type="tel" for phone numbers
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </FormGroup>

                <FormGroup>
            <Label for="email">Email</Label>
            <Input
              required
              id="emailInput"
              name="email"
              placeholder="enter your email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>

          
          
          <FormGroup>
            <Label for="serviceSelect">Select Service</Label>
            <Input
              type="select"
              name="selectedService"
              id="selectedServiceInput"
              onChange={(e) => setSelectedService(e.target.value)}
              value={selectedService} // Assuming message is the value for all service messages
              required
            >
              <option value="">Select a service</option>
              {data.map((item) =>
                item.industry_services.map((service, index) => (
                  <option key={index} value={service.service}>
                    {service.service}
                  </option>
                ))
              )}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              required
              placeholder="describe your problem"
              id="messageInput"
              name="message"
              type="textarea"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </FormGroup>
          <Button value="Send" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Contact"}
          </Button>
        </form>
      </Container>
      <DemoFooter />
    </div>
  );
}
