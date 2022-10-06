import React, { useEffect } from 'react'
import './UpdateNotification.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearMessage } from '../../../Slices/userSlice'
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../ScrollToTop/Scrolltotop';

function UpdateNotification(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            dispatch(clearMessage(false));
            if (props.msg === "account deleted") {
                navigate('/test');
            }
        }, 4000)


    }, [])
    return (
        <div id="dynamic-island">
            <ScrollToTop />
            <p className='text-center mb-0 p-1'>{props.msg}</p>
        </div>
    )
}

export default UpdateNotification