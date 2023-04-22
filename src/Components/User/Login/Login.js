import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { faUserPlus, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useState, useEffect } from 'react'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import userSlice from '../../../Slices/userSlice'
import { userLogin } from '../../../Slices/userSlice'
import { useNavigate } from 'react-router-dom'

function User() {

    let { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(state => state.user);

    const onLogin = (userObj) => {

        dispatch(userLogin(userObj));
    }

    useEffect(() => {

        if (isSuccess) {
            navigate(`/user/${userObj.username}`);
        }

    }, [isSuccess, isError])

    useEffect(() => {

        let curr = document.querySelector(".settings-nav-link").className;

        document.querySelector(".settings-nav-link").className = curr.replaceAll("active", "");

        curr = document.querySelector(".user-signup-navlink").className;

        document.querySelector(".user-signup-navlink").className = curr.replaceAll("active", "");


    }, [])

    return (
        <div id="user" className='mt-5'>
            <div id="login" className='mx-auto'>
                <Form className='w-100' onSubmit={handleSubmit(onLogin)} >
                    <fieldset disabled="">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-start w-100'>login</Form.Label>

                            <Form.Control type="text" placeholder="username" className='mb-2' {...register("username", { required: true })} />

                            {
                                errors.username && <p className='text-start'>* Email is required</p>
                            }

                            {
                                (isError && errMsg == 'user not found') && <p className='text-start'>* {errMsg}</p>
                            }

                            <Form.Control type="password" placeholder="password" className='mb-2' {...register("password", { required: true })} />

                            {
                                errors.password && <p className='text-start'>* Password is required</p>
                            }

                            {
                                (isError && errMsg == 'Incorrect Password') && <p className='text-start'>* {errMsg}</p>
                            }

                        </Form.Group>
                        <Button type="submit" className='w-100'>
                            <FontAwesomeIcon icon={faArrowRightToBracket} className=" me-2" />Sign In
                        </Button>
                    </fieldset>
                </Form>
                <p className='mt-2' id="logintosignup">Don't have an account ? <a href="signup">Create one</a></p>
            </div>
        </div>
    )
}

export default User