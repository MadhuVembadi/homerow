import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { faUserPlus, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './User.css'

function User() {
    return (
        <div id="user" className='mt-5'>
            <div className='d-flex flex-column flex-md-row '>
                <div id='singup' className='mx-auto mb-md-0 mb-5 '>
                    <Form className='w-100'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-start w-100'>register</Form.Label>
                            <Form.Control type="text" placeholder="username" className='mb-2' />
                            <Form.Control type="email" placeholder="email" className='mb-2' />
                            <Form.Control type="email" placeholder="verify email" className='mb-2' />
                            <Form.Control type="password" placeholder="password" className='mb-2' />
                            <Form.Control type="password" placeholder="verify password" className='mb-2' />
                        </Form.Group>
                        <button type="button" className='w-100'>
                            <FontAwesomeIcon icon={faUserPlus} className=" me-2" />Sign Up
                        </button>
                    </Form>
                </div>
                <div id="login" className='mx-auto'>
                    <Form className='w-100'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-start w-100'>login</Form.Label>

                            <Form.Control type="email" placeholder="email" className='mb-2' />
                            <Form.Control type="password" placeholder="password" className='mb-2' />

                        </Form.Group>
                        <button type="button" className='w-100'>
                            <FontAwesomeIcon icon={faArrowRightToBracket} className=" me-2" />Sign In
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default User