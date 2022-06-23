import React, { useContext, useEffect, useState } from "react";
import { TimeContext } from "../context/TimeContext";
import { calculateTheTime } from "../utility/utilities";
const TimeSlots = (props) => {
    const { times, setTimes, setIsEdit, setTempTime, setStartId, startId, setSureDelTime, confirmDel, setConfirmDel, currentTimeSet } = useContext(TimeContext)

    const [delId, setDelId] = useState('');


    const editTimeSlot = (timeID) => {
        setIsEdit(true);
        const timeById = times.filter((time, index) => {
            return time.id === timeID
        })
        setTempTime(timeById);
        setStartId(timeID);

    }

    const delTimeSlot = (id) => {
        if (startId == '') {
            setSureDelTime(true);
            setDelId(id)
        } else { alert('You need to stop TIMER first') }

    }

    useEffect(() => {
        if (confirmDel) {
            const newTimes = times.filter((time) => {
                return time.id !== delId;
            })

            setTimes(newTimes);
            setSureDelTime(false);
            setConfirmDel(false)
            setDelId('');
        }

    }, [confirmDel])

    if (currentTimeSet.data) {
        return (

            currentTimeSet.data.map((time, index) => {

                //calculate total recess in a single time gap
                let totalSlotSec = 0, totalSlotMin = 0, totalSlotHr = 0;

                const [getTotalHrs, getTotalMin, getTotalSec] = calculateTheTime(time.start, time.end);
                totalSlotHr = getTotalHrs
                totalSlotMin = getTotalMin
                totalSlotSec = getTotalSec


                return <li className="timeBreak" key={index} >
                    <span style={slot}>Start: {time.start.hr}hr {time.start.min}min {time.start.sec}sec</span>
                    <span style={slot}>End: {time.end.hr || 0}hr {time.end.min || 0}min {time.end.sec || 0}sec</span>
                    {!time.end.hr && <span className={`slotBt ` + (!time.end.hr ? 'calculating' : '' ) }>Calculating...</span>}
                    {time.end.hr && <span className="slotBt">Total {totalSlotHr}H {totalSlotMin}M {totalSlotSec}S</span>}
                    {time.end.min &&
                        <React.Fragment>
                            <span onClick={() => { delTimeSlot(time.id) }} className="action del">D</span>
                            <span onClick={() => { editTimeSlot(time.id) }} className="action">E</span>
                        </React.Fragment>
                    }
                </li>

            }
            )

        )
    }
    else {
        return "No data"
    }
}

export default TimeSlots;

const slot = {
    display: 'block',
    padding: '5px'
}