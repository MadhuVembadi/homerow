import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../../Slices/userSlice';

function Delete(props) {
    const { userObj } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const deleteData = () => {

        let actionObj = deleteUser({ username: userObj.username });
        dispatch(actionObj);

        props.handleClose('delete');


    }

    return (
        <div>
            <Modal show={props.deleteShow} onHide={() => props.handleClose('delete')} className="settings-modal">

                <Modal.Body className='mb-0'>
                    <h3>Delete Account ?</h3>
                    <p className='text-muted'>Your account will be deleted permanently.</p>
                    <Button variant="none" onClick={deleteData}>Delete</Button>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default Delete