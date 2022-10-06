import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { updateDetails } from '../../Slices/userSlice'
import { useState } from 'react'

function Password(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userObj } = useSelector(state => state.user);

    let [misMatch, setMisMatch] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFormSubmit = (obj) => {

        if (obj.newpassword !== obj.cpassword) {
            setMisMatch(true);
            return;
        }

        let actionObj = updateDetails({ changes: obj, user: userObj });
        dispatch(actionObj);

        props.handleClose('password')
    }

    return (
        <div>
            <Modal show={props.passwordShow} onHide={() => props.handleClose('password')} className="settings-modal">
                <Modal.Header>Update password</Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit(onFormSubmit)}>


                        <Form.Control type="password" className='mb-4' placeholder="Password" {...register("password", { required: true })} />

                        {
                            errors.type?.password === 'required' && <p className='text-start' style={{ color: "#e2b714" }}>
                                * This is a required field
                            </p>
                        }


                        <Form.Control type="password" className='mb-4' placeholder="New password" {...register("newpassword", { required: true })} />
                        {
                            errors.type?.newpassword === 'required' && <p className='text-start' style={{ color: "#e2b714" }}>
                                * This is a required field
                            </p>
                        }



                        <Form.Control type="password" className='mb-4' placeholder="Confirm new password" {...register("cpassword", { required: true })} />
                        {
                            errors.type?.cpassword === 'required' && <p className='text-start' style={{ color: "#e2b714" }}>
                                * This is a required field
                            </p>
                        }
                        {
                            misMatch &&
                            <p className='text-start mb-3' style={{ color: "#e2b714" }}>
                                * Passwords must match
                            </p>
                        }


                        <Button variant="none" type="submit" >Update</Button>

                    </Form>


                </Modal.Body>

            </Modal>
        </div>
    )
}

export default Password