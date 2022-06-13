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
			setCurrentTimeSet({...currentTimeSet,data:[]});
			setYesDelAll(false);
			setIsDelAll(false)
		}
	},[yesDelAll])
	
	

	const startRecess = () =>{
		// checking if lastRecordDate not exist
		if( !localStorage.getItem('lastRecordDate') ){

			if(currentTimeSet.info.lastRecordDate){
				// last record date exist save it to localstorage
				localStorage.setItem('lastRecordDate',`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
			}
			else{
				// first store current date in times then create localstorage
				currentTimeSet.info.lastRecordDate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
				localStorage.setItem('lastRecordDate',`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
			}
		}
		
			
		// creating fresh array with start times
		const newTimeArray = {
			id: new Date().getTime(), timeSlotTotal: 0, totalSlotHr:0, start: {hr: new Date().getHours(), min: new Date().getMinutes(), sec: new Date().getSeconds()}, end: {} 
		}

		setStartId(newTimeArray.id);
		setCurrentTimeSet( {...currentTimeSet,data:[...currentTimeSet.data,newTimeArray]} )
		//console.log(currentTimeSet)
		//setCurrentTimeSet([...currentTimeSet,currentTimeSet.data.newTimeArray]);
	}

	const stopRecess = () =>{
		//console.log(startId)
		currentTimeSet.data.forEach((time,index)=>{
			if(time.id === parseInt(startId)) {

				setCurrentTimeSet(
					{...currentTimeSet},
					/* currentTimeSet.data[index].timeSlotTotal=totalSlotMin,
					currentTimeSet.data[index].totalSlotHr = totalSlotHr, */
					currentTimeSet.data[index].end.hr = new Date().getHours(),
					currentTimeSet.data[index].end.min = new Date().getMinutes(),
					currentTimeSet.data[index].end.sec = new Date().getSeconds()

				)


				setStartId('')
			}
		})
		
	}


	useEffect(()=>{
		localStorage.setItem('localTime',JSON.stringify(currentTimeSet));
		localStorage.setItem('lstartId',startId);
		let totalMin = 0;
		let totalHr = 0;
		//let endHr = null
		currentTimeSet.data.forEach((time)=>{		
			//calculate Min
			totalMin +=time.timeSlotTotal
			totalHr +=time.totalSlotHr
		})
		setConsumedMin(totalMin)
		setTotalHr(totalHr)
	},[currentTimeSet,startId]) //




	if(isEdit){
		return <EditList />
	}
	else{
		return(
			<>
			<div className="container">
				<h1 className="title">Record Your Recess <span className="date">10/5/2022</span></h1>
				<h2 className="total">#Time Consumed: {totalHr}Hr {consumedMin}min </h2>
				{/* <h3 className="approaxTime">Consumed Till Now: 0 min (Approx)</h3> */}
				<div className="btn-group">
					{startId ? <button className="btn stop" onClick={()=>{stopRecess()}}>Stop</button> : <button className="btn add" onClick={startRecess}>Start</button>}
					
					
				</div>
				

				<ul className="timeList">
					

					{<TimeSlots />}
					
				</ul>
				{startId=='' && currentTimeSet.data.length>0 && <button className="deleteAll" onClick={()=>setIsDelAll(true)}>Delete All</button>}
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