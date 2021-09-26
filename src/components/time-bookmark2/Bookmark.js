import React, { useState, useEffect } from "react";
import "./style.css";

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



const Bookmark = () =>{
	const [times,setTimes] = useState(parseTimes);
	const [startTimeId,setStartTimeId] = useState(getLocalStartId);
	const [delWarningMsg,setDelWarningMsg] = useState(false);
	const [totalMin,setTotalMin] = useState([]);


	const startRecess = () =>{
		
		const newTimeArray = {
			id: new Date().getTime(),
			start:[
				{hr: new Date().getHours()},
				{min: new Date().getMinutes()}
			],
			end:[
				{hr: ''},
				{min: ''}
			],
		}

	
		
		setTimes([...times,newTimeArray]);

		setStartTimeId(newTimeArray.id);
	
			
	}

	

	const stopRecess = () =>{
		const update = times.map((time)=>{
			if (parseInt(time.id) == parseInt(startTimeId)) {
			
				return {...time, end: [{hr:new Date().getHours().toString()},{min:new Date().getMinutes().toString()}]}
			}
			else{
				return time;
			}
			
		});

		setTimes(update);
		setStartTimeId('');
	}

	useEffect(()=>{
		localStorage.setItem('localTime',JSON.stringify(times));
		localStorage.setItem('lstartId',startTimeId);
	},[times])





	const handleDelAll = () =>{
		setDelWarningMsg(true);
	}

	const confirmYes  = () =>{
		setTimes([]);
		setDelWarningMsg(false);
		setStartTimeId('');
	}
	const confirmNo = () =>{
		setDelWarningMsg(false);
	}



	return (
		<div className="container">
		<h2 className="title">Record your recess</h2>

			<p style={{color: 'white'}}>
			</p>
			<div className="btn-group">
				
				{ startTimeId=='' ? <button className="btn add" onClick={startRecess}>Start</button> : <button className="btn stop" onClick={stopRecess}>Stop</button>}
			</div>

			{/* <div className="timeCounter">{parseInt(startSec/60)}<span className="sec">{startSec}s</span></div> */}

			<ul className="timeList">
			{
				times.map((time)=>{
					let minDiff = (time.end[1].min - time.start[1].min);
					let hoursDiff = 0;

					if (minDiff<59){
						hoursDiff = (time.end[0].hr - time.start[0].hr)*60
					}

					let recessMin =  hoursDiff  + (time.end[1].min - time.start[1].min);


					return (
						<>
						<li	key={time.id} className="totalRecMin">	{recessMin < 0 ? 'Counting total Min' : recessMin+' min'} </li>
						
						<li	key={time.id+1} className="timeBreak">
						Start: {time.start[0].hr+'hr '}  
						{ time.start[1].min+'min'} :: 

						End: {time.end[0].hr}{time.end[0].hr && 'hr '}
						{time.end[1].min}{time.end[0].hr && 'min'}
						</li>
						</>
						)
				})
				
			}
			</ul>
			{
				delWarningMsg &&
				<div className="alert">
				<br />
				<br />
					Are you sure want to delete all records?<br />once deleted , you will not able to restore.<br /><br />
					<button className="btn" onClick={confirmYes}>Yes</button>
					<button className="btn" onClick={confirmNo}>No</button>
				</div>
			}
			{times.length>0 && <button className="deleteAll" onClick={handleDelAll}>Delete All</button>}			
		</div>
		);
}


export default Bookmark;