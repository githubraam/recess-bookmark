import React, { useContext, useEffect, useState } from "react";
import { TimeContext } from "../context/TimeContext";

const TimeSlots = () =>{
    const {times, setTimes,setIsEdit,setTempTime,setStartId, startId, setSureDelTime, confirmDel, setConfirmDel} = useContext(TimeContext)
    
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
        }else{alert('Stop the Time first')}
       
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


    return(
        
        times.map((time) => <li className="timeBreak" key={time.id} >
                    <span style={slot}>Start: {time.start.hr}hr {time.start.min}min</span>
                    <span style={slot}>End: {time.end.hr}hr {time.end.min}min</span>
                    {time.timeSlotTotal!=='' && <span className="slotBt">BT {time.timeSlotTotal} min</span>
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

export default TimeSlots;

const slot = {
	display: 'block',
	padding: '5px'
}