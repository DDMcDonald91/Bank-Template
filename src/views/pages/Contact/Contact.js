/* eslint-disable */

import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import LayoutHeader from 'components/Headers/LayoutHeader'
import React, {useState, useRef} from 'react'
import { Container, FormGroup, Label, Input, Button } from 'reactstrap'
import emailjs from '@emailjs/browser';
import './index.css'
import DemoFooter from 'components/Footers/DemoFooter';

export default function Contact() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        // secondary validation check
        if(!firstName || !lastName || !email || !message){
            alert('Please add missing fields.')
            handleReset();
            return
        }

        try {
          await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
          .then((result) =>{
            console.log(result)
          })
          alert('Thank you for contacting us! We will be contacting you soon.')
        } catch (error) {
          alert('There has been an error. Please try again.')
        } finally {
          handleReset();
        }
    } 

    const handleReset = () => {
        setEmail('')
        setMessage('')
        setFirstName('')
        setLastName('')
        setLoading(false)
    }
    
  return (
    <div>
        <ExamplesNavbar />
        <LayoutHeader title="Contact Us" image={"url(" + require(`assets/img/4sons-header2.jpg`) + ")"}  />
        <Container align='center' className='layout-page-content'>
            <div id='contact-page-content'>
              <p>
              Ready to enhance your security or address lock-related concerns? Contact us today for reliable and professional locksmith services. Our team is here to assist you promptly and ensure your peace of mind.              </p>
            </div>
            <br />
            <form ref={form} id='contact-form' onSubmit={handleSubmit}>
              <FormGroup>
                  <Label for="firstName">
                    First Name
                  </Label>
                  <Input
                    required
                    id="firstNameInput"
                    name="firstName"
                    placeholder="enter your first name"
                    type="text"
                    value={firstName}
                    onChange={(e) => {setFirstName(e.target.value)}}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="lastName">
                    Last Name
                  </Label>
                  <Input
                    required
                    id="lastNameInput"
                    name="lastName"
                    placeholder="enter your last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => {setLastName(e.target.value)}}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email">
                    Email
                  </Label>
                  <Input
                    required
                    id="emailInput"
                    name="email"
                    placeholder="enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </FormGroup>

                <FormGroup>
                <Label for="message">
                Message
                </Label>
                <Input
                required
                placeholder='describe your problem'
                id="messageInput"
                name="message"
                type="textarea"
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
                />
                </FormGroup>
                <Button value='Send' type='submit' disabled={loading}>
                  {loading ? 'Submitting...' : 'Contact'}
                </Button>
                </form>
        </Container>
        <DemoFooter />
    </div>
  )
}
