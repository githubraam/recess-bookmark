import React, { useState, useEffect } from "react";

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

	const [times, setTimes] = useState([])
	const [startId, setStartId] = useState()

	const startRecess = () =>{
		/*setMinutes(0);
		setSeconds(0);
		*/

		// creating fresh array with start times
		const newTimeArray = {
			id: new Date().getTime(), timeSlotTotal: '', start: {hr: new Date().getHours(), min: new Date().getMinutes()}, end: {} 
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


	return(
		<div className="container">
            <h1 className="title">Record Your Recess</h1>
            <h2 className="total">#Time Consumed: 0 min </h2>
            <h3 className="approaxTime">Consumed Till Now: 0 min (Approx)</h3>
            <div className="btn-group">
				{startId ? <button className="btn stop" onClick={()=>{stopRecess()}}>Stop</button> : <button className="btn add" onClick={startRecess}>Start</button>}
				
				
			</div>
            

            <ul className="timeList">
                {/*<li className="totalRecMin">Counting total Min </li>*/}

                {
                	times.map((time) => <li className="timeBreak" key={time.id} >
						<span style={slot}>Start: {time.start.hr}hr {time.start.min}min</span>
						<span style={slot}>End: {time.end.hr}hr {time.end.min}min</span>
						{time.timeSlotTotal && <span className="slotBt">BT {time.timeSlotTotal} min</span>} <span className="action">E</span></li>   )
                }
                
            </ul>
            <button className="deleteAll">Delete All</button>
        </div>
	)
}
const slot = {
	display: 'block',
	padding: '5px'
}
export default List;