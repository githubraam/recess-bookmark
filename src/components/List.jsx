import React, { useState, useEffect, useContext } from "react";
import { TimeContext } from "../context/TimeContext";
import EditList from "./Edit";
import TimeSlots from "./TimeSlots";

const List = () =>{
	//getting variable from TimeContext, destructuring
	const {startId,setStartId, isEdit, times, setTimes, setSureDelTime, sureDelTime, setConfirmDel, setCurrentTimeSet, currentTimeSet} = useContext(TimeContext)

	const [isDelAll, setIsDelAll] = useState(false);
	const [yesDelAll,setYesDelAll] = useState(false);

	const [consumedMin, setConsumedMin] = useState(0);
	const [totalHr, setTotalHr] = useState(0);

	useEffect(()=>{
		if(yesDelAll){
			setTimes([]);
			setYesDelAll(false);
			setIsDelAll(false)
		}
	},[yesDelAll])
	
	

	const startRecess = () =>{
		// checking if lastRecordDate not exist
		if( !localStorage.getItem('lastRecordDate') ){

			if(currentTimeSet[0].info[0].lastRecordDate){
				// last record date exist save it to localstorage
				localStorage.setItem('lastRecordDate',`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
			}
			else{
				// first store current date in times then create localstorage
				currentTimeSet[0].info[0].lastRecordDate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
				localStorage.setItem('lastRecordDate',`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
			}
		}
		
			
		// creating fresh array with start times
		const newTimeArray = {
			id: new Date().getTime(), timeSlotTotal: 0, totalSlotHr:0, start: {hr: new Date().getHours(), min: new Date().getMinutes(), sec: new Date().getSeconds()}, end: {} 
		}

		setStartId(newTimeArray.id);
		setCurrentTimeSet([...currentTimeSet,currentTimeSet[0].data.newTimeArray]);
	}

	const stopRecess = () =>{
		//console.log(startId)
		currentTimeSet.forEach((time,index)=>{
			if(time.id === parseInt(startId)) {
				let emin = new Date().getMinutes(), 
				ehr = new Date().getHours(),
				esec = new Date().getSeconds();

				//calculate total recess in a single time gap
				let totalSlotMin = 0;
				let totalSlotHr = 0;
				
				//calculate min
                if(emin<time.start.min){
                    totalSlotMin += (60 - time.start.min) + emin
                }
                else{
                    totalSlotMin += emin - time.start.min;
                }

				// calculate hour
				if(ehr<time.start.hr){
                    totalSlotHr += (24 - time.start.hr) + ehr
                }
                else{
                    totalSlotHr += ehr - time.start.hr;
                }

				setCurrentTimeSet([...currentTimeSet],currentTimeSet.timeSlotTotal=totalSlotMin, totalSlotHr = totalSlotHr, currentTimeSet.end.hr = ehr, currentTimeSet.end.min = emin,  currentTimeSet.end.sec = esec)

				setStartId('')
			}
		})
		
	}


	useEffect(()=>{
		localStorage.setItem('localTime',JSON.stringify(times));
		localStorage.setItem('lstartId',startId);
		let totalMin = 0;
		let totalHr = 0;
		//let endHr = null
		times.forEach((time)=>{		
			

			//calculate Min
			totalMin +=time.timeSlotTotal
			totalHr +=time.totalSlotHr
			
			
		})
		setConsumedMin(totalMin)
		setTotalHr(totalHr)
	},[times,startId])




	if(isEdit){
		return <EditList />
	}
	else{
		return(
			<>
			<div className="container">
				<h1 className="title">Record Your Recess</h1>
				<h2 className="total">#Time Consumed: {totalHr}Hr {consumedMin}min </h2>
				{/* <h3 className="approaxTime">Consumed Till Now: 0 min (Approx)</h3> */}
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