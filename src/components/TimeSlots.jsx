import React, { useContext, useEffect, useState } from "react";
import { TimeContext } from "../context/TimeContext";

const TimeSlots = (props) =>{
    const {times, setTimes,setIsEdit,setTempTime,setStartId, startId, setSureDelTime, confirmDel, setConfirmDel, currentTimeSet} = useContext(TimeContext)
    
    const [delId, setDelId] = useState('');


    const editTimeSlot = (timeID) =>{
		setIsEdit(true);
		const timeById = times.filter((time,index)=>{
			return time.id === timeID
		})
		setTempTime(timeById);
		setStartId(timeID);

	}

    const delTimeSlot = (id) =>{
        if(startId==''){
            setSureDelTime(true);
            setDelId(id)
        }else{alert('You need to stop TIMER first')}
       
    }

    useEffect(()=>{
        if (confirmDel) {
            const newTimes = times.filter((time)=>{
                return time.id!== delId;
            })

            setTimes(newTimes);
            setSureDelTime(false);
            setConfirmDel(false)
            setDelId('');
        }
        
    },[confirmDel])

    if( currentTimeSet[0].data.length ){
        return(
        
        currentTimeSet[0].data.map((time) => <li className="timeBreak" key={time.id} >
                    <span style={slot}>Start: {time.start.hr}hr {time.start.min}min {time.start.sec}sec</span>
                    <span style={slot}>End: {time.end.hr}hr {time.end.min}min {time.end.sec}sec</span>
                    {time.timeSlotTotal!=='' && <span className="slotBt">Total {time.totalSlotHr}H {time.timeSlotTotal}M</span>
                    }
                    {time.end.min &&
                    <React.Fragment>
                    <span onClick={()=>{delTimeSlot(time.id)}} className="action del">D</span>
                    <span onClick={()=>{editTimeSlot(time.id)}} className="action">E</span>
                    </React.Fragment>
                    }
                    </li>
                )

    )
    }
    else{
        return "No data"
    }
}

export default TimeSlots;

const slot = {
	display: 'block',
	padding: '5px'
}