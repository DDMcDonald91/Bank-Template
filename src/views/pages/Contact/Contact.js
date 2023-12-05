import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import LayoutHeader from 'components/Headers/LayoutHeader'
import React, {useState} from 'react'
import { Container, FormGroup, Label, Input, Button } from 'reactstrap'
import './index.css'

export default function Contact() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true)

        // email and message check
        if(!email || !message){
            alert('Please add missing fields.')
            handleReset();
            return
        }

        alert('Demo functionality active.')

        handleReset();
    } 

    const handleReset = () => {
        setEmail('')
        setMessage('')
        setLoading(false)
    }
    
  return (
    <div>
        <ExamplesNavbar />
        <LayoutHeader title="Contact Us" image='soroush-karimi.jpg'  />
        <Container className='layout-page-content'>
            <div id='contact-page-content'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <br />
            <form id='contact-form' onSubmit={handleSubmit}>
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
                  Contact
                </Button>
                </form>
        </Container>
    </div>
  )
}
