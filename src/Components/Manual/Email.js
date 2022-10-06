import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { updateDetails } from '../../Slices/userSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'


function Email(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { userObj } = useSelector(state => state.user);

    let [misMatch, setMisMatch] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFormSubmit = (obj) => {

        if (obj.email !== obj.cemail) {
            setMisMatch(true);
            return;
        }

        let actionObj = updateDetails({ changes: obj, user: userObj });
        dispatch(actionObj);

        props.handleClose('email')
    }

    return (
        <div>
            <Modal show={props.emailShow} onHide={() => props.handleClose('email')} className="settings-modal">
                <Modal.Header>Update email</Modal.Header>
                <Modal.Body className='mb-0'>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>

                        <Form.Control type="password" placeholder="Password" className='mb-4' {...register("password", { required: true })} />

                        {
                            errors.password?.type === 'required' && <p className='text-start' style={{ color: "#e2b714" }}>* This is a required field</p>
                        }


                        <Form.Control type="email" placeholder="New email" className='mb-4' {...register("email", { required: true })} />
                        {
                            errors.password?.type === 'required' && <p className='text-start' style={{ color: "#e2b714" }}>* This is a required field</p>
                        }


                        <Form.Control type="email" placeholder="Confirm new email" className='mb-4' {...register("cemail", { required: true })} />
                        {
                            errors.password?.type === 'required' && <p className='text-start' style={{ color: "#e2b714" }}>* This is a required field</p>
                        }

                        {
                            misMatch &&
                            <p className='text-start mb-3' style={{ color: "#e2b714" }}>
                                * Emails must match
                            </p>
                        }

                        <Button type="submit">Update</Button>

                    </Form>



                </Modal.Body>


            </Modal>
        </div>
    )
}

export default Email