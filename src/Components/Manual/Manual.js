import React, { Children, useEffect } from 'react'
import './Manual.css'
import { Button, Modal, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTimer } from '../../Slices/manualSlice'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Email from './Email'
import Password from './Password'
import Reset from './Reset'
import Delete from './Delete'
import UpdateNotification from './UpdateNotification/UpdateNotification'

function Manual() {


    let { register, handleSubmit, formState: { errors } } = useForm();

    let { testTime } = useSelector(state => state.manual);

    let {
        userObj,
        isSuccess,
        isUpdateError,
        isUpdateSuccess,
        isUpdateLoading,
        updateErrMsg,
        isEraseError,
        isEraseSuccess,
        isEraseLoading,
        eraseErrMsg,
        isDeleteError,
        isDeleteSuccess,
        isDeleteLoading,
        deleteErrMsg
    } = useSelector(state => state.user);

    let [emailShow, setEmailShow] = useState(false);
    let [passwordShow, setPasswordShow] = useState(false);
    let [resetShow, setResetShow] = useState(false);
    let [deleteShow, setDeleteShow] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeMode = (event) => {

        let curr = document.querySelector("#settings .current").className;

        document.querySelector("#settings .current").className = curr.replaceAll(" current", "");

        event.target.parentElement.className += " current";

        let actionObj = setTimer((+event.target.value));

        dispatch(actionObj);

    }

    const handleLogin = () => {
        navigate('/user/login');
    }

    const handleShow = (type) => {

        if (type == 'email') {
            setEmailShow(true);
            setPasswordShow(false);
            setResetShow(false);
            setDeleteShow(false);
        }
        else if (type == 'password') {
            setEmailShow(false);
            setPasswordShow(true);
            setResetShow(false);
            setDeleteShow(false);
        }
        else if (type == 'reset') {
            setResetShow(true);
        }
        else if (type == 'delete') {
            setDeleteShow(true);
        }
    }

    const handleClose = (type) => {
        if (type == 'email') {
            setEmailShow(false);
        }
        else if (type == 'password') {
            setPasswordShow(false);
        }
        else if (type == 'reset') {
            setResetShow(false);
        }
        else if (type == 'delete') {
            setDeleteShow(false);
        }
    }


    useEffect(() => {

        let l = document.querySelectorAll("#settings #testmode .btn");

        let arr = Array.from(l);

        let el = arr.find(item => item.value == testTime)

        el.parentElement.className += " current"

    }, [])
    return (
        <div id="settings" className='text-start m-5'>

            <div id="update-notification">
                {
                    isUpdateSuccess &&
                    <UpdateNotification msg="successfully updated" />
                }
                {
                    isUpdateError &&
                    <UpdateNotification msg={updateErrMsg} />
                }
                {
                    isEraseSuccess &&
                    <UpdateNotification msg="account reset successful" />
                }
                {
                    isEraseError &&
                    <UpdateNotification msg={eraseErrMsg} />
                }
                {
                    isDeleteSuccess &&
                    <UpdateNotification msg="account deleted" />
                }
                {
                    isDeleteError &&
                    <UpdateNotification msg={deleteErrMsg} />
                }
            </div>
            <div id="testmode" className='mb-3'>
                <h3 className='mb-4'>Test Mode</h3>
                <div className='row row-cols-2 row-cols-md-4'>
                    <div className='col mb-2'>
                        <Button variant="none" value={15} onClick={changeMode}>15</Button>
                    </div>
                    <div className='col mb-2'>
                        <Button variant="none" value={30} onClick={changeMode}>30</Button>
                    </div>
                    <div className='col mb-2'>
                        <Button variant="none" value={60} onClick={changeMode}>60</Button>
                    </div>
                    <div className='col mb-2'>
                        <Button variant="none" value={120} onClick={changeMode}>120</Button>
                    </div>
                </div>
            </div>
            <div id="account">
                <h3 className='mb-4'>Account</h3>
                {
                    isSuccess ? (
                        <>
                            <div id="email">

                                <div className='row row-cols-md-2 row-cols-1 mb-4'>

                                    {/*button*/}
                                    <div className='col col-md-8'>
                                        <p className='text-muted mb-0'>Update email</p>
                                        <p>Change the email address connected to your account.</p>
                                    </div>
                                    <div className='col col-md-4'>
                                        <Button onClick={() => handleShow('email')}>update email</Button>
                                    </div>

                                    {/*Email Modal*/}
                                    {
                                        emailShow && <Email handleClose={handleClose} handleShow={handleShow} emailShow={emailShow} />
                                    }

                                </div>
                                <div className='row row-cols-md-2 row-cols-1 mb-4'>
                                    <div className='col col-md-8'>
                                        <p className='text-muted mb-0'>Update Password</p>
                                        <p>Change your password.</p>
                                    </div>
                                    <div className='col col-md-4'>
                                        <Button onClick={() => handleShow('password')}>update password</Button>
                                    </div>

                                    {
                                        passwordShow && <Password handleClose={handleClose} handleShow={handleShow} passwordShow={passwordShow} />
                                    }
                                </div>


                                <div className='row row-cols-md-2 row-cols-1 mb-4'>
                                    <div className='col col-md-8'>
                                        <p className='text-muted mb-0'>Reset Account</p>
                                        <p>Completely resets your account to a blank state.</p>
                                    </div>
                                    <div className='col col-md-4'>
                                        <Button onClick={() => handleShow('reset')}>reset account</Button>
                                    </div>

                                    {
                                        resetShow && <Reset handleClose={handleClose} handleShow={handleShow} resetShow={resetShow} />
                                    }

                                </div>

                                <div className='row row-cols-md-2 row-cols-1 mb-4'>
                                    <div className='col col-md-8'>
                                        <p className='text-muted mb-0'>Delete Account</p>
                                        <p>Deletes your account and all data connected to it.</p>
                                    </div>
                                    <div className='col col-md-4'>
                                        <Button onClick={() => handleShow('delete')}>delete account</Button>
                                    </div>
                                    {
                                        deleteShow && <Delete handleClose={handleClose} handleShow={handleShow} deleteShow={deleteShow} />
                                    }
                                </div>
                            </div>
                        </>
                    ) :
                        (
                            <>
                                <div>
                                    <h4 className='text-center mt-5' style={{ color: "#e2b714" }}>Login to review account settings</h4>
                                </div>
                                <div>
                                    <Button variant="none" onClick={handleLogin} className="d-block mt-4 w-25 mx-auto">Signin</Button>
                                </div>
                            </>
                        )
                }

            </div>
        </div >
    )
}

export default Manual