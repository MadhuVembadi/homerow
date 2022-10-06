import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { faUserPlus, faArrowRightToBracket, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useState, useEffect } from 'react'
import '../Login/Login.css'
import './Signup.css'
import { useNavigate } from 'react-router-dom'


function Signup() {
    let { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    let [notify, setNotify] = useState(false);
    let [status, setStatus] = useState('');
    let [msg, setMsg] = useState('');
    let [usernameError, setUsernameError] = useState(false);
    let [emailError, setEmailError] = useState(false);
    let [passwordError, setPasswordError] = useState(false);

    const onSignup = (userObj) => {

        setEmailError(false);
        setPasswordError(false);
        setMsg('');
        setStatus('');
        setNotify(false);


        //verify emails and passwords
        if (userObj.email !== userObj.vemail) {
            setEmailError(true);
            return;
        }
        if (userObj.password !== userObj.vpassword) {
            setPasswordError(true);
            return;
        }

        delete userObj.vemail;
        delete userObj.vpassword;
        userObj["testStarted"] = 0;
        userObj["testsCompleted"] = 0;
        userObj["timeTyping"] = 0;
        userObj["tests"] = [];
        let today = new Date();

        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        userObj["joinDate"] = today.getDate() + "-" + months[today.getMonth()] + "-" + today.getFullYear();

        userObj["15s"] = { wpm: 0, acc: 0 }
        userObj["30s"] = { wpm: 0, acc: 0 }
        userObj["60s"] = { wpm: 0, acc: 0 }
        userObj["120s"] = { wpm: 0, acc: 0 }



        //http post req
        axios.post('http://localhost:5000/user/create-user', userObj)
            .then(response => {

                if (response.data.message === 'User registration successful') {

                    setMsg('user created')
                    setStatus('success');
                    setNotify(true);
                    setTimeout(() => {

                        navigate('/user/login');

                    }, 4000);
                    console.log("success")
                }
                else if (response.data.message == 'username taken') {
                    setMsg('Username already taken');
                    setStatus('failure')
                    setNotify(true);
                }

            })
            .catch(error => {
                alert(error);
            })

    }

    useEffect(() => {
        console.log(notify);
    }, [])



    return (
        <div className='mt-5'>
            {
                notify &&
                <div id='popup' className={status}>
                    <div className='d-flex'>
                        <div className='w-25 d-flex justify-content-center align-items-center'>
                            {
                                status == 'success' ? (
                                    <FontAwesomeIcon icon={faCheck} className="w-100" size={100} />
                                ) : (
                                    <FontAwesomeIcon icon={faXmark} className="w-100" size={100} />)
                            }
                        </div>
                        <div>
                            <p className='text-start mb-0'>
                                <span className='d-block'>{status}</span>
                                {msg}
                            </p>
                        </div>
                    </div>
                </div>
            }


            <div className='d-flex flex-column flex-md-row '>
                <div id='signup' className='mx-auto mb-md-0 mb-5'>

                    <Form className='w-100' onSubmit={handleSubmit(onSignup)} >
                        <fieldset disabled="">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='text-start w-100'>register</Form.Label>

                                <Form.Control type="text" placeholder="username" className='mb-2' {...register("username", { required: true })} />

                                {
                                    errors.username?.type === 'required' && <p className='text-start'>* Username is required</p>
                                }

                                <Form.Control type="email" placeholder="email" className='mb-2' {...register("email", { required: true })} />

                                {
                                    errors.email && <p className='text-start'>* Email is required</p>
                                }

                                <Form.Control type="email" placeholder="verify email" className='mb-2' {...register("vemail", { required: true })} />
                                {
                                    emailError && <p className='text-start'>* Emails must match</p>
                                }

                                <Form.Control type="password" placeholder="password" className='mb-2' {...register("password", { required: true })} />
                                {
                                    errors.password && <p className='text-start'>* Password is required</p>
                                }

                                <Form.Control type="password" placeholder="verify password" className='mb-2' {...register("vpassword", { required: true })} />
                                {
                                    passwordError && <p className='text-start'>* passwords must match</p>
                                }

                            </Form.Group>
                            <Button type="submit" className='w-100' >
                                <FontAwesomeIcon icon={faUserPlus} className=" me-2" />Sign Up
                            </Button>
                        </fieldset>
                    </Form>
                    <p className='mt-2' id="logintosignup">Already a user ? <a href="login">Login</a></p>
                </div>
            </div>
        </div >
    )
}

export default Signup