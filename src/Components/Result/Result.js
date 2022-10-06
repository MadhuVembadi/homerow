import React, { useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts'
import { useSelector } from 'react-redux'
import './Result.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addResult } from '../../Slices/userSlice'

function Result() {

    let result = useSelector(state => state.result);

    let {
        userObj,
        isError,
        isSuccess,
        isLoading,
        errMsg,
        isResError,
        isResSuccess,
        isResLoading,
        resErrMsg
    } = useSelector(state => state.user);

    let { testTime } = useSelector(state => state.manual);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const CustomTooltip = ({ active, payload, label }) => {

        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip p-2" id="hover-indicator">

                    <p className="label text-start" id="inner">
                        <span id="net-indicator" className='d-inline-block me-2 mt-2'></span>
                        {`wpm: ${payload[0].value}`}<br />
                        <span id="raw-indicator" className='d-inline-block me-2 mt-2'></span>
                        {`raw: ${payload[1].value}`}
                    </p>

                </div>
            );
        }

        return null;
    };


    useEffect(() => {
        if (isSuccess) {


            let today = new Date();
            let months = ["JAN", "FEB", "MAR", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            let date = String(today.getDate()).padStart(2, '0') + " ";
            let mon = String(months[today.getMonth()]) + " ";
            let year = String(today.getFullYear());
            let hours = String(today.getHours()).padStart(2, '0');
            let minutes = String(today.getMinutes()).padStart(2, '0');
            let seconds = String(today.getSeconds()).padStart(2, '0');

            let dateStamp = (date + mon + year);

            let timeStamp = (hours + ":" + minutes + ":" + seconds);

            let curr = { wpm: result[0].wpm, accuracy: result[0].accuracy, characters: result[0].correct + "/" + result[0].incorrect + "/" + result[0].missed + "/" + result[0].extra, mode: "time " + String(testTime), date: dateStamp, time: timeStamp, testTime: testTime }

            let actionObj = addResult({ username: userObj.username, result: curr });

            dispatch(actionObj);

            // axios.put('http://localhost:5000/result/add', { username: userObj.username, result: curr })
            //     .then(response => {
            //         console.log("test saved");
            //         //alert(response.data.message);
            //     })
            //     .catch(error => {
            //         //alert(error);
            //         console.log("error")
            //     })


        }

        if (isResError) {
            alert(resErrMsg);
        }

    }, [])
    return (
        <div>
            <>
                <div id="result" className='d-flex flex-md-row flex-column w-100 m-4 mb-2 mx-auto'>
                    <div id="wpm-acc" className='d-flex flex-md-column flex-row justify-content-center'>
                        <div id="wordspermin" className='w-100 text-center '>
                            <h3 className='text-muted m-0'>
                                wpm
                            </h3>
                            {result[0].wpm}
                        </div>
                        <div id="accuracy" className='w-100 text-center m-0'>
                            <h3 className='text-muted m-0'>
                                acc
                            </h3>
                            {result[0].accuracy}%
                        </div>
                    </div>
                    <div id="graph" className='w-100 mx-auto'>
                        <ResponsiveContainer>
                            <LineChart data={result[0].graphData} margin={{ top: 5, right: 20, bottom: 20, left: 40 }}>

                                <XAxis dataKey="sec" dy={10}>
                                    <Label value="Time"
                                        position="outside"
                                        textAnchor='middle' fill="#777" dy={30} />
                                </XAxis>
                                <YAxis dx={-10}>
                                    <Label value="Words per Minute" angle={-90} textAnchor='middle'
                                        position="outside" fill="#777" dx={-25} />
                                </YAxis>

                                <CartesianGrid stroke="#36454F" opacity={0.5} />

                                <Tooltip content={<CustomTooltip />} />

                                <Line type="monotone" dataKey="net" stroke="#e2b714" fill='#000000' dot="true" />

                                <Line type="monotone" dataKey="raw" stroke="#fff" fill='#000000' dot="true" />

                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </div>
                <div className='w-100 mx-auto m-5' aria-label='correct/incorrect/missed/extra' id="characters">
                    <h3 className='text-muted m-0'>Characters</h3>
                    <span>{result[0].correct}/{result[0].incorrect}/{result[0].missed}/{result[0].extra}</span>
                </div>
            </>
        </div>
    )
}

export default Result