import React from 'react'
import { Navbar, Container, Nav, } from 'react-bootstrap'
import { BsFillKeyboardFill, BsKeyboardFill } from 'react-icons/bs'
import { Routes, Route, NavLink } from 'react-router-dom'
import Test from '../Test/Test'
import Leaderboard from '../Leaderboard/Leaderboard'
import Info from '../Info/Info'
import Settings from '../Manual/Manual'
import User from '../User/User'
import Manual from '../Manual/Manual'
import Result from '../Result/Result'
import { faRankingStar, faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoSettings, IoInformationOutline } from 'react-icons/io5'
import { FiUser } from 'react-icons/fi'
import { GiPodium } from 'react-icons/gi'
import { MdLeaderboard } from 'react-icons/md'
import './Header.css'
import { $CombinedState } from '@reduxjs/toolkit'
import monketImg from '../../Images/monkey.png'




function Header() {


    return (
        <div className='header'>
            <Navbar collapseOnSelect expand="sm">
                <Container>
                    <Navbar.Brand href="/test">
                        <BsKeyboardFill color="#e2b714" style={{ margin: "2%" }} />

                        <span id='superscript' className='text-muted d-none d-md-inline'>monkey see</span>

                        <span id="spanimg"> <img src={monketImg} className='d-inline p-0' id="image" /><span id="typespan">type</span></span>

                    </Navbar.Brand>
                    <Nav className='w-100'>

                        {/* These links can be visible when no user logged in */}

                        <Nav.Item className="m-2">
                            <Nav.Link eventKey="1" as={NavLink} to="/test" id="icon">
                                <BsFillKeyboardFill id="symbol" />
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="m-2">
                            <Nav.Link eventKey="2" as={NavLink} to="/leaderboard" id="icon">
                                <MdLeaderboard id="symbol" />
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="m-2">
                            <Nav.Link eventKey="3" as={NavLink} to="/info" id="icon">
                                <IoInformationOutline id="symbol" />
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="m-2">
                            <Nav.Link eventKey="4" as={NavLink} to="/settings" id="icon">
                                <IoSettings id="symbol" />
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="m-2">
                            <Nav.Link eventKey="5" as={NavLink} to="/user" id="icon">
                                <FiUser id="symbol" />
                            </Nav.Link>
                        </Nav.Item>

                    </Nav>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='w-100 justify-content-end'>

                        <Navbar.Text className='justify-content-end'>
                            <ul className='d-flex list-unstyled w-100 justify-content-end m-0 p-0'>
                                <li className='me-2'>punctuation</li>
                                <li className='me-2'>numbers</li>
                            </ul>
                            <ul className='d-flex list-unstyled'>
                                <li className='me-2'>time</li>
                                <li className='me-2'>words</li>
                                <li className='me-2'>quote</li>
                                <li className='me-2'>zen</li>
                                <li className='me-2'>custom</li>
                            </ul>
                        </Navbar.Text>

                    </Navbar.Collapse>

                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Test />} />
                <Route path="/test" element={<Test />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/info" element={<Info />} />
                <Route path="/settings" element={<Manual />} />
                <Route path="/user" element={<User />} />
                <Route path='/result' element={<Result />} />

            </Routes>

        </div >
    )
}

export default Header