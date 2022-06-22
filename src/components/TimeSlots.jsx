import React, { useContext, useEffect, useState } from "react";
import { TimeContext } from "../context/TimeContext";

const TimeSlots = (props) =>{
    const {times, setTimes,setIsEdit,setTempTime,setStartId, startId, setSureDelTime, confirmDel, setConfirmDel, currentTimeSet} = useContext(TimeContext)
    
    const [delId, setDelId] = useState('');

    // calculate the total output time // all time slots
    const calculateTotalTime = () =>{
        let hour, min, sec;
        

    }

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

    if( currentTimeSet.data  ){
        return(
        
        currentTimeSet.data.map((time,index) => {
            let emin = time.end.min, 
				ehr = time.end.hr,
				esec = time.end.sec;

				//calculate total recess in a single time gap
				let totalSlotSec = 0,totalSlotMin = 0,totalSlotHr = 0;


				// calculate hour
				if(ehr<time.start.hr){
                    totalSlotHr += (24 - time.start.hr) + ehr
                }
                else{
                    totalSlotHr += ehr - time.start.hr;
                }
				
				//calculate min
                if(emin<time.start.min){
                    totalSlotMin += (60 - time.start.min) + emin
                }
                else{
                    totalSlotMin += emin - time.start.min;
                }

                //calculate sec
                if(esec < time.start.sec){
                    
                    totalSlotSec = ((60 - time.start.sec) + time.end.sec)
                   
                }
                else{
                    totalSlotSec = esec - time.start.sec;
                }


                return <li className="timeBreak" key={index} >
                    <span style={slot}>Start: {time.start.hr}hr {time.start.min}min {time.start.sec}sec</span>
                    <span style={slot}>End: {time.end.hr}hr {time.end.min}min {time.end.sec}sec</span>
                    {time.timeSlotTotal!=='' && <span className="slotBt">Total {totalSlotHr}H {totalSlotMin}M {totalSlotSec}S</span>
                    }
                    {time.end.min &&
                    <React.Fragment>
                    <span onClick={()=>{delTimeSlot(time.id)}} className="action del">D</span>
                    <span onClick={()=>{editTimeSlot(time.id)}} className="action">E</span>
                    </React.Fragment>
                    }
                </li>
            
            }
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