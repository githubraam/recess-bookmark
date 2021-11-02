import React, { useState, useEffect } from "react";
import "./style.css";
import Total from "./Total";


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
    const [ minutes, setMinutes ] = useState(-1);
    const [seconds, setSeconds ] =  useState(-1);
	const [isDuplicate, setIsDuplicate] = useState(false);



	let myInterval;
    useEffect(()=>{
	myInterval = setInterval(() => {
			if (seconds >= 0) {
				setSeconds(seconds + 1);
			}
			if(seconds >= 59){
				setMinutes(minutes + 1);
				setSeconds(0);
			} 
		}, 1000)
		return ()=> {
			clearInterval(myInterval);
		};
	});



	const startRecess = () =>{
		setMinutes(0);
		setSeconds(0);
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
			total: ''
		}

	
		
		setTimes([...times,newTimeArray]);

		setStartTimeId(newTimeArray.id);
	
			
	}

	

	const stopRecess = () =>{
		let recessMin;
		
		
		const update = times.map((time)=>{
			
			if (parseInt(time.id) == parseInt(startTimeId)) {
				let ehr = new Date().getHours().toString();
				let emin = new Date().getMinutes().toString();
			


				times.map((time)=>{
					let minDiff = (emin - time.start[1].min);
					let hoursDiff = 0;

					if (minDiff<59){
						hoursDiff = (ehr - time.start[0].hr)*60
					}

					recessMin =  hoursDiff  + (emin - time.start[1].min);
				})

				if(recessMin === 0){
					setIsDuplicate(true);
					setTimeout(function(){ setIsDuplicate(false); }, 1500);
				}
				
				return {...time, end: [{hr:ehr},{min:emin}], total:recessMin}



				
			}
			else{
				return time;
			}
			
		});
		if(recessMin !== 0){
			setTimes(update);
			setStartTimeId('');
			setMinutes(-1);
			setSeconds(-1);
		}
			
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
		setMinutes(-1);
		setSeconds(-1);
	}
	const confirmNo = () =>{
		setDelWarningMsg(false);
	}


	const TimeList = () =>{
		return(
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
		)
	}


	return (
		<div className="container">
			<h2 className="title">Record Your Recess</h2>
			{ minutes >= 0 && seconds >= 0
				? <div className="timer">{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div>
				:  null
			}
			<Total time={times} counter={minutes} />

			<p style={{color: 'white'}}>
			</p>
			<div className="btn-group">
				
				{ startTimeId=='' ? <button className="btn add" onClick={startRecess}>Start</button> : <button className="btn stop" onClick={stopRecess}>Stop</button>}
			</div>


			<TimeList />
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
			{ isDuplicate &&
				<div className="popup">
					<h4>Dulicate Time</h4>
				</div>
			}
		</div>
	);
}


export default Bookmark;