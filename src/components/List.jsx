import React, { useState, useEffect, useContext } from "react";
import { TimeContext } from "../context/TimeContext";
import EditList from "./Edit";
import TimeSlots from "./TimeSlots";

const parseTimes = () =>{
	if (localStorage.getItem('localTime')) {
		return JSON.parse(localStorage.getItem('localTime'));
	}
	else{
		return [];
	}
}

const getLocalStartId = () =>{
	if (localStorage.getItem('lstartId')) {
		return localStorage.getItem('lstartId');
	}
	else{
		return '';
	}
}

const List = () =>{
	//getting variable from TimeContext, destructuring
	const {startId,setStartId, isEdit, times, setTimes, sureDelTime} = useContext(TimeContext)


	
	

	const startRecess = () =>{
		/*setMinutes(0);
		setSeconds(0);
		*/

		// creating fresh array with start times
		const newTimeArray = {
			id: new Date().getTime(), timeSlotTotal: 0, start: {hr: new Date().getHours(), min: new Date().getMinutes()}, end: {} 
		}

		setStartId(newTimeArray.id);
		 
		setTimes([...times,newTimeArray]);
/*
		setStartTimeId(newTimeArray.id); */
	
			
	}

	const stopRecess = () =>{
		console.log(times)
		times.forEach((time,index)=>{
			if(time.id === startId) {
				let emin = new Date().getMinutes(), ehr = new Date().getHours();
				//calculate total recess in a single time gap
				let totalSlotTime = parseInt(emin) - parseInt(time.start.min);

				setTimes([...times],time.timeSlotTotal=totalSlotTime, time.end.hr = ehr, time.end.min = emin)

				setStartId(null)
			}
		})
		
	}

	/* const checkTime = [
		{id: '123', start: {hr: 10, min: 45}, end: {hr: 10, min: 46} },
		{id: '124', start: {hr: 10, min: 47}, end: {hr: 10, min: 48} },
		{id: '125', start: {hr: 10, min: 49}, end: {hr: 10, min: 50} }
	] */

	

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
				<button className="deleteAll">Delete All</button>
			</div>

			{/* {sureDelTime && <div className="popup">
				Are you sure? want to delete time slot!
			</div>} */}
			</>

			
		)
	}
}

export default List;