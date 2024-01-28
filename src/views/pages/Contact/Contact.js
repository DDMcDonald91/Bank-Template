import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import LayoutHeader from 'components/Headers/LayoutHeader'
import React, { useState, useRef } from 'react'
import { Container, FormGroup, Label, Input, Button } from 'reactstrap'
import emailjs from '@emailjs/browser';
import './index.css'
import DemoFooter from 'components/Footers/DemoFooter';
import SEO from 'components/SEO/SEO';

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        // email and message check
        if(!email || !message){
            alert('Please add missing fields.')
            handleReset();
            return
        }

        await emailjs.sendForm('service_6bweyl6', 'template_jqy36q7', form.current, 'JSioancmTaTHqGHRZ')
        .then((result) => {
          alert('Demo functionality active.')
        }, (error) => {
          alert('Demo functionality active.')
          console.log(error)
        });

        handleReset();
    } 

    const handleReset = () => {
        setName('')
        setEmail('')
        setMessage('')
        setLoading(false)
    }
    
  return (
    <div>
      <SEO 
        title='Loyal 4 DMV || Contact Us Today' 
        content='Reach out to us today for help with placing an order for delivery. If you have any questions or concerns, we are here to help in any way!' 
        page="https://www.loyaldmv.com/contact-us" 
      />
        <ExamplesNavbar />
        <LayoutHeader title="Contact Us" image='loyal-contact.jpg'  />
        <Container className='layout-page-content'>
            <div id='contact-page-content'>
              <p>
                Contact us below for any questions, comments, or concerns. Our team will be with you in a timely fashion!
              </p>
            </div>
            <br />
            <form id='contact-form' ref={form} onSubmit={handleSubmit}>
              <FormGroup>
                  <Label for="name">
                    Name
                  </Label>
                  <Input
                    id="nameInput"
                    name="name"
                    placeholder="enter your name"
                    type="text"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email">
                    Email
                  </Label>
                  <Input
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
                Text Area
                </Label>
                <Input
                id="messageInput"
                name="message"
                type="textarea"
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
                />
                </FormGroup>

                <Button type='submit' disabled={loading}>
                  Submit
                </Button>
                </form>
        </Container>
        <DemoFooter />
    </div>
  )
}
