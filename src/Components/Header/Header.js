import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { BsFillKeyboardFill, BsKeyboardFill } from 'react-icons/bs'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Test from '../Test/Test'
import Info from '../Info/Info'
import Home from '../User/Home/Home'
import Login from '../User/Login/Login'
import Signup from '../User/Signup/Signup'
import Manual from '../Manual/Manual'
import Result from '../Result/Result'
import Dashboard from '../User/Dashboard/Dashboard'
import { faRankingStar, faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoSettings, IoInformationOutline } from 'react-icons/io5'
import { FaSignOutAlt } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GiPodium } from 'react-icons/gi'
import { MdLeaderboard } from 'react-icons/md'
import './Header.css'
import monketImg from '../../Images/monkey.png'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearLoginStatus } from '../../Slices/userSlice'



function Header() {

    let { userObj, isError, isSuccess, errMsg, isLoading } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.clear();
        dispatch(clearLoginStatus())
        navigate('/user/login')
    }

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
                            <Nav.Link eventKey="2" as={NavLink} to="/info" id="icon">
                                <IoInformationOutline id="symbol" />
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="m-2">
                            <Nav.Link eventKey="3" as={NavLink} to="/settings" id="icon" className='settings-nav-link'>
                                <IoSettings id="symbol" />
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="m-2">
                            <Nav.Link eventKey="4" as={NavLink} to="/user" id="icon">
                                <FiUser id="symbol" className='me-2' />
                                {
                                    isSuccess &&
                                    <span className='mb-0 pb-0'>
                                        {userObj.username}
                                    </span>
                                }
                            </Nav.Link>
                        </Nav.Item>


                        {/* {
                            isSuccess &&
                            <Button onClick={userLogout}>
                                Sign out
                            </Button>
                        } */}

                    </Nav>

                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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

                    </Navbar.Collapse> */}

                </Container>
                {
                    isSuccess &&
                    <Button variant="none" onClick={userLogout} id="signout">
                        <FaSignOutAlt className='me-2' />Sign out
                    </Button>
                }

            </Navbar>


            <Routes>
                <Route path="/" element={<Test />} />
                <Route path="/test" element={<Test />} />
                <Route path="/info" element={<Info />} />
                <Route path="/settings" element={<Manual />} />
                <Route path="/user/:username" element={<Dashboard />} />
                <Route path="/user" element={<Home />} >
                    <Route path="" element={<Navigate replace to="login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
                <Route path='/result' element={<Result />} />
            </Routes>

        </div >
    )
}

export default Header