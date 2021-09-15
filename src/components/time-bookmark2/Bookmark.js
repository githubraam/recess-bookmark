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
	//const [startTime,setStartTime] = useState('');
	const [times,setTimes] = useState(parseTimes);
	const [startTimeId,setStartTimeId] = useState(getLocalStartId);
	const [delWarningMsg,setDelWarningMsg] = useState(false);



	const startRecess = () =>{
		
		const newTimeArray = {
			id: new Date().getTime().toString(),
			startTime: new Date().getHours().toString()+'hr ' + new Date().getMinutes().toString() + 'm',
			endTime: '',
		}

		setTimes([...times,newTimeArray]);

		setStartTimeId(newTimeArray.id);
			
	}


	const stopRecess = () =>{
		const update = times.map((time)=>{
			if (parseInt(time.id) == parseInt(startTimeId)) {
			
				return {...time, endTime: new Date().getHours().toString()+'hr ' + new Date().getMinutes().toString() + 'm'}
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

		localStorage.setItem('lstartId',startTimeId)
	},[times])

	const handleDelAll = () =>{
		setDelWarningMsg(true);
	}

	const confirmYes  = () =>{
		setTimes([]);
		setDelWarningMsg(false);
	}
	const confirmNo = () =>{
		setDelWarningMsg(false);
	}
	return (
		<div className="container">
		<h2 className="title">Record your recess</h2>
			<div className="btn-group">
				
				{ startTimeId=='' ? <button className="btn add" onClick={startRecess}>Start</button> : <button className="btn stop" onClick={stopRecess}>Stop</button>}
			</div>

			<ul className="timeList">
			{
				times.map((time)=>{
					return (
						<li key={time.id}>Start: {time.startTime} :: End: {time.endTime}</li>
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