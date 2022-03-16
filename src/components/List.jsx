import React, { useState, useEffect, useContext } from "react";
import { TimeContext } from "../context/TimeContext";
import EditList from "./Edit";
import TimeSlots from "./TimeSlots";

const List = () =>{
	//getting variable from TimeContext, destructuring
	const {startId,setStartId, isEdit, times, setTimes, setSureDelTime, sureDelTime, setConfirmDel} = useContext(TimeContext)

	const [isDelAll, setIsDelAll] = useState(false);
	const [yesDelAll,setYesDelAll] = useState(false);

	useEffect(()=>{
		if(yesDelAll){
			setTimes([]);
			setYesDelAll(false);
			setIsDelAll(false)
		}
	},[yesDelAll])
	
	

	const startRecess = () =>{
		// creating fresh array with start times
		const newTimeArray = {
			id: new Date().getTime(), timeSlotTotal: 0, start: {hr: new Date().getHours(), min: new Date().getMinutes()}, end: {} 
		}

		setStartId(newTimeArray.id);
		 
		setTimes([...times,newTimeArray]);

	
			
	}

	const stopRecess = () =>{
		//console.log(startId)
		times.forEach((time,index)=>{
			if(time.id === parseInt(startId)) {
				let emin = new Date().getMinutes(), ehr = new Date().getHours();
				
				//calculate total recess in a single time gap
				let totalSlotTime = parseInt(emin) - parseInt(time.start.min);

				setTimes([...times],time.timeSlotTotal=totalSlotTime, time.end.hr = ehr, time.end.min = emin)

				setStartId('')
			}
		})
		
	}


	useEffect(()=>{
		localStorage.setItem('localTime',JSON.stringify(times));
		localStorage.setItem('lstartId',startId);
	},[times,startId])




	if(isEdit){
		return <EditList />
	}
	else{
		return(
			<>
			<div className="container">
				<h1 className="title">Record Your Recess</h1>
				<h2 className="total">#Time Consumed: 0 min </h2>
				<h3 className="approaxTime">Consumed Till Now: 0 min (Approx)</h3>
				<div className="btn-group">
					{startId ? <button className="btn stop" onClick={()=>{stopRecess()}}>Stop</button> : <button className="btn add" onClick={startRecess}>Start</button>}
					
					
				</div>
				

				<ul className="timeList">
					

					<TimeSlots />
					
				</ul>
				{startId=='' && times.length>0 && <button className="deleteAll" onClick={()=>setIsDelAll(true)}>Delete All</button>}
			</div>

			{sureDelTime && <div className="popup" style={{padding: '20px'}}>
				<p style={{padding: '15px', fontSize: '20px'}}>Are you sure? <br/>want to delete time slot!</p>
				<div className="btn-group">
					<button className="btn add" onClick={()=>setConfirmDel(true)}>Yes</button>
					<button style={{marginTop: '10px'}} className="deleteAll" onClick={()=>setSureDelTime(false)}>No</button>
				</div>
				
			</div>}


			{isDelAll && <div className="popup" style={{padding: '20px'}}>
				<p style={{padding: '15px', fontSize: '20px'}}>Are you sure? <br/>want to delete ALL time slot!</p>
				<div className="btn-group">
					<button className="btn add" onClick={()=>setYesDelAll(true)}>Yes</button>
					<button style={{marginTop: '10px'}} className="deleteAll" onClick={()=>setIsDelAll(false)}>No</button>
				</div>
				
			</div>}
			</>

			
		)
	}
}

export default List;