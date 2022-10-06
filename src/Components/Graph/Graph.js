import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts'
import { useSelector } from 'react-redux'
import './Graph.css'
import { useState, useEffect } from 'react'

function Graph() {

    let {
        userObj,
        isError,
        isSuccess,
        isLoading,
        errMsg,
        isResError,
        isResSuccess,
        isResLoading,
        resErrMsg } = useSelector(state => state.user);

    let [data, setData] = useState([]);

    const CustomTooltip = ({ active, payload, label }) => {

        if (active && payload && payload.length) {

            console.log();

            let idx = payload[0].payload.id;

            let wpm = userObj.tests[idx].wpm;
            let accuracy = userObj.tests[idx].accuracy;
            let mode = userObj.tests[idx].mode;
            let date = userObj.tests[idx].date;
            let time = userObj.tests[idx].time;
            // let wpm, accuracy, mode, date, time;

            return (
                <div className="custom-tooltip p-2" id="hover-indicator">

                    <ul className='list-unstyled text-start'>
                        <li>wpm: {wpm}</li>
                        <li>accuracy: {accuracy}</li>
                        <li>mode: {mode}</li>
                        <li>date: {date}</li>
                        <li>time: {time}</li>
                    </ul>

                </div>
            );
        }

        return null;
    };



    useEffect(() => {

        let gdata = [];
        userObj.tests.forEach((item, idx) => {
            gdata.splice(0,0,{
                "id": idx,
                "wpm": item.wpm,
                "errorRate": 100 - item.accuracy
            })
        })

        setData(gdata);

    }, [])


    return (
        <div id="statsgraph" >

            <ResponsiveContainer>
                {/* Double Axis */}
                {/* <LineChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                    <XAxis dataKey="none" stroke='black' opacity="0.2" />
                    <YAxis yAxisId="left" stroke="#d1d0c5" opacity="0.5" >
                        <Label value="Error Rate (100 - accuracy)"
                            position="outside" angle={-90}
                            textAnchor='middle' fill="#777" dy={30} dx={-5} />
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" stroke="#d1d0c5" opacity="0.5"
                    >
                        <Label value="wpm" angle={-90} textAnchor='middle'
                            position="outside" fill="#777" dx={20} />
                    </YAxis>

                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    <Line yAxisId="right" type="monotone" dataKey="wpm" stroke="#e2b714" />
                    <Line yAxisId="left" type="monotone" dataKey="errorRate" stroke="#d1d0c5" />
                </LineChart> */}

                {/* Single Axis */}
                <LineChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                    <XAxis dataKey="none" stroke='black' opacity="0.2" />
                    <YAxis stroke="#d1d0c5" opacity="0.5" />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    <Line type="monotone" dataKey="wpm" stroke="#e2b714" />
                    <Line type="monotone" dataKey="errorRate" stroke="#d1d0c5" />

                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}

export default Graph