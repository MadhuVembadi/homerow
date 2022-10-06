import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Container, Nav, } from 'react-bootstrap'
import { Routes, Route, NavLink } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div id="user" className='mt-2'>
            <Navbar collapseOnSelect>
                <Container>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto w-100">
                            <Nav.Item className="m-2 w-50">
                                <Nav.Link eventKey="1" as={NavLink} to="login" className='w-100'>
                                    Login
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item className="m-2 w-50">
                                <Nav.Link eventKey="2" as={NavLink} to="signup" className='user-signup-navlink'>
                                    Signup
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div >
    )
}

export default Home