import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { dataErase } from '../../Slices/userSlice';

function Reset(props) {

    const { userObj } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const eraseData = () => {

        let actionObj = dataErase({ username: userObj.username });
        dispatch(actionObj);

        props.handleClose('reset');
    }
    return (
        <div>
            <Modal show={props.resetShow} onHide={() => props.handleClose('reset')} className="settings-modal">

                <Modal.Body className='mb-0'>
                    <h3>Reset Account ?</h3>
                    <p className='text-muted'>All your test results will be erased.</p>
                    <Button variant="none" onClick={eraseData}>Reset</Button>
                </Modal.Body>


            </Modal>
        </div>
    )
}

export default Reset