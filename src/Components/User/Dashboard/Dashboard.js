import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MdEdit } from 'react-icons/md'
import { Button, Table, striped, bordered, hover } from 'react-bootstrap'
import './Dashboard.css'
import avataar from '../../../Images/avataar.svg'
import { useState } from 'react'
import Graph from '../../Graph/Graph'


function Dashboard() {



    const { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(state => state.user);
    let [editModal, setEditModal] = useState(false);

    const editProfile = () => {
        setEditModal(true);
    }

    let [typingTime, setTypingTime] = useState('');

    useEffect(() => {

        // let duration = userObj.timeTyping;
        // let seconds = Math.floor((duration / 1000) % 60);
        // let minutes = Math.floor((duration / (1000 * 60)) % 60);
        // let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        // hours = (hours < 10) ? "0" + hours : hours;
        // minutes = (minutes < 10) ? "0" + minutes : minutes;
        // seconds = (seconds < 10) ? "0" + seconds : seconds;

        var date = new Date(null);
        date.setSeconds(userObj.timeTyping);
        var result = date.toISOString().substr(11, 8);

        setTypingTime(result);


    }, [])


    return (
        <div id="dashboard" className='mt-4'>

            <div id="profile-test" className="d-flex w-100">
                <div id="picture-name" className='d-flex m-1 p-3'>
                    <div id="picture" className='w-25 mx-auto'>
                        <img src={avataar} className="w-100" />
                    </div>
                    <div id="name" className='w-75 h-100 mx-auto'>

                        <div className='h-100 d-flex flex-column justify-content-center'>
                            <h3 className='w-100'>
                                {userObj.username}
                                {/* madhuvembadi */}
                            </h3>
                            <span >{userObj.joinDate}</span>
                        </div>
                    </div>
                </div>
                <div id="stats" className=' m-1 p-3'>
                    <div className='d-flex w-100 h-100 justify-content-around'>
                        <div className='h-100 d-flex flex-column justify-content-center'>
                            <p className='text-start mb-0'>test started</p>
                            <h3 className='text-start mb-2'>{userObj.testStarted}</h3>
                            {/* <h3 className='text-start mb-2'>7</h3> */}
                        </div>
                        <div className='h-100 d-flex flex-column justify-content-center'>
                            <p className='text-start mb-0'>test completed</p>
                            <h3 className='text-start'>{userObj.testsCompleted}</h3>
                            {/* <h3 className='text-start'>7</h3> */}
                        </div>
                        <div className='h-100 d-flex flex-column justify-content-center'>
                            <p className='text-start mb-0'>time typing</p>
                            <h3 className='text-start'>{typingTime}</h3>
                            {/* <h3 className='text-start'>01:20:45</h3> */}
                        </div>
                    </div>
                </div>
                <div id="edit" className='m-1'>
                    <Button variant="none" className='h-100 p-md-3 p-2 d-flex flex-column justify-content-center mx-auto' onClick={editProfile}>
                        <MdEdit className='bg-none' color='#d1d0c5' />
                    </Button>
                </div>
            </div>

            <div id="best">
                <div className='row row-cols-md-4 row-cols-2 w-100 mt-3'>
                    <div className='col mx-auto m-2'>
                        <p className=' mb-1'>15 seconds</p>
                        <h3 className='mt-2 mb-2'>
                            {
                                userObj["15s"].wpm > 0 ? (
                                    <span>{userObj["15s"].wpm}</span>
                                ) : (
                                    <span>-</span>
                                )
                            }

                        </h3>
                        <h4 className=''>
                            {
                                userObj["15s"].acc > 0 ? (
                                    <span>{userObj["15s"].acc}%</span>
                                ) : (
                                    <span>-</span>
                                )
                            }
                        </h4>

                    </div>

                    <div className='col mx-auto m-2'>
                        <p className=' mb-1'>30 seconds</p>
                        <h3 className='mt-2 mb-2'>
                            {
                                userObj["30s"].wpm > 0 ? (
                                    <span>{userObj["30s"].wpm}</span>
                                ) : (
                                    <span>-</span>
                                )
                            }

                        </h3>
                        <h4 className=''>
                            {
                                userObj["30s"].acc > 0 ? (
                                    <span>{userObj["30s"].acc}%</span>
                                ) : (
                                    <span>-</span>
                                )
                            }
                        </h4>


                    </div>

                    <div className='col mx-auto m-2'>
                        <p className=' mb-1'>60 seconds</p>
                        <h3 className='mt-2 mb-2'>
                            {
                                userObj["60s"].wpm > 0 ? (
                                    <span>{userObj["60s"].wpm}</span>
                                ) : (
                                    <span>-</span>
                                )
                            }

                        </h3>
                        <h4 className=''>
                            {
                                userObj["60s"].acc > 0 ? (
                                    <span>{userObj["60s"].acc}%</span>
                                ) : (
                                    <span>-</span>
                                )
                            }
                        </h4>


                    </div>

                    <div className='col mx-auto m-2'>
                        <p className=' mb-1'>120 seconds</p>
                        <h3 className='mt-2 mb-2'>
                            {
                                userObj["120s"].wpm > 0 ? (
                                    <span>{userObj["120s"].wpm}</span>
                                ) : (
                                    <span>-</span>
                                )
                            }

                        </h3>
                        <h4 className=''>
                            {
                                userObj["120s"].acc > 0 ? (
                                    <span>{userObj["120s"].acc}%</span>
                                ) : (
                                    <span>-</span>
                                )
                            }
                        </h4>


                    </div>

                </div>
            </div>

            <div id="timeline" className='mt-5'>
                <Graph />
            </div>

            <div id="history" className='mt-5'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>wpm</th>
                            <th>accuracy</th>
                            <th className='info-on-hover'><span className="info-to-display">correct/incorrect/missed/wrong</span>characters</th>
                            <th>mode</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userObj.tests.map((item, idx) => <tr key={idx}>
                                <td className='position-relative'>
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        {item.wpm}
                                    </div>
                                </td>
                                <td className='position-relative'>
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        {item.accuracy}%
                                    </div>
                                </td>
                                <td className='position-relative'>
                                    <div className="position-absolute top-50 start-50 translate-middle" >
                                        {item.characters}
                                    </div>
                                </td>
                                <td className='position-relative'>
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        {item.mode}
                                    </div>
                                </td>
                                <td className='position-relative'>
                                    {item.date}<br />{item.time}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard