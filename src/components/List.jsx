import React, { useState, useEffect, useContext } from "react";
import { TimeContext } from "../context/TimeContext";
import EditList from "./Edit";
import Sidebar from "./sidebar/Sidebar";
import TimeSlots from "./TimeSlots";

const List = () => {
	//getting variable from TimeContext, destructuring
	const { startId, setStartId, isEdit, times,  setSureDelTime, sureDelTime, setConfirmDel, setCurrentTimeSet, currentTimeSet, totalData, setTotalData } = useContext(TimeContext)

	const [isDelAll, setIsDelAll] = useState(false);
	const [yesDelAll, setYesDelAll] = useState(false);

	const [consumedMin, setConsumedMin] = useState(0);
	const [totalHr, setTotalHr] = useState(0);

	const [toggleSidebar, setToggleSidebar] = useState(false);

	useEffect(() => {
		if (yesDelAll) {
			setCurrentTimeSet({ ...currentTimeSet, data: [] });
			setYesDelAll(false);
			setIsDelAll(false)
		}
	}, [yesDelAll])



	const startRecess = () => {
		let todayDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
		// checking if lastRecordDate not exist
		if (!localStorage.getItem('lastRecordDate')) {

			if (currentTimeSet.info.lastRecordDate) {
				// last record date exist save it to localstorage
				localStorage.setItem('lastRecordDate', todayDate);
			}
			else {
				// first store current date in times then create localstorage
				currentTimeSet.info.lastRecordDate = todayDate;
				localStorage.setItem('lastRecordDate', todayDate);
			}
		}


		// creating fresh array with start times
		const newTimeArray = {
			id: new Date().getTime(),
			date: todayDate,
			start: {
				hr: new Date().getHours(),
				min: new Date().getMinutes(),
				sec: new Date().getSeconds()
			},
			end: {}
		}

		setStartId(newTimeArray.id);
		setCurrentTimeSet({ ...currentTimeSet, data: [...currentTimeSet.data, newTimeArray] })
	}

	const stopRecess = () => {
		//console.log(startId)
		let lastRecordFound = currentTimeSet.data.filter((time, index) => {
			if (time.id === parseInt(startId)) {



				setCurrentTimeSet(
					{ ...currentTimeSet },
					currentTimeSet.data[index].end.hr = new Date().getHours(),
					currentTimeSet.data[index].end.min = new Date().getMinutes(),
					currentTimeSet.data[index].end.sec = new Date().getSeconds()

				)



				setStartId('')

				return time;
			}
		})



	}



	useEffect(() => {
		localStorage.setItem('localTime', JSON.stringify(currentTimeSet));
		localStorage.setItem('lstartId', startId);

		if(!startId){
			let end = {
				hr: 0,
				min: 0,
				sec: 0
			}
			let start = {
				hr: 0,
				min: 0,
				sec: 0
			}
			currentTimeSet.data.forEach(time => {
				start.hr += time.start.hr;
				start.min += time.start.min;
				start.sec += time.start.sec;

				end.hr += time.end.hr;
				end.min += time.end.min;
				end.sec += time.end.sec;

			});


			let totalStartSec = start.sec + start.min*60 + start.hr*60*60,
			totalEndSec = end.sec + end.min*60 + end.hr*60*60;
		
			let timeDiff = totalEndSec - totalStartSec;
		
			let th = parseInt(String(timeDiff / 3600), 10),
			tm = parseInt(String((timeDiff % 3600) / 60), 10),
			ts = (timeDiff % 3600) % 60;

			setTotalData({...totalData, hour:th, min:th, sec:ts})


		}

	}, [currentTimeSet, startId])


	useEffect(() => {
		localStorage.setItem('timeHistory', JSON.stringify(times));
	}, [times])

	const toggleTheSidebar = () => {
		setToggleSidebar(!toggleSidebar)
	}





	if (isEdit) {
		return <EditList />
	}
	else {
		return (
			<>
				<div className="container">
					<p className="bug">Found bug? <a target="_blank" href="https://github.com/githubraam/recess-bookmark/issues">Report It</a></p>
					{times.length>0 && <button className="toggler" type="button" onClick={toggleTheSidebar}>
						<span>click to toggle menu</span>
					</button>}
					{times.length>0 && <Sidebar toggled={toggleSidebar} />}
					<h1 className="title">Record Your Recess
						<span className="date">{`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</span>
					</h1>
					<h2 className="total">#Time Consumed: {totalData.hour}HR {totalData.min}M {totalData.sec}S </h2>
					
					<div className="btn-group">
						{startId ? <button className="btn stop" onClick={() => { stopRecess() }}>Stop</button> : <button className="btn add" onClick={startRecess}>Start</button>}
					</div>

					<ul className="timeList">
						{<TimeSlots />}
					</ul>
					{startId == '' && currentTimeSet.data.length > 0 && <button className="deleteAll" onClick={() => setIsDelAll(true)}>Delete All</button>}
				</div>

				{sureDelTime && <div className="popup" style={{ padding: '20px' }}>
					<p style={{ padding: '15px', fontSize: '20px' }}>Are you sure? <br />want to delete time slot!</p>
					<div className="btn-group">
						<button className="btn add" onClick={() => setConfirmDel(true)}>Yes</button>
						<button style={{ marginTop: '10px' }} className="deleteAll" onClick={() => setSureDelTime(false)}>No</button>
					</div>

				</div>}


				{isDelAll && <div className="popup" style={{ padding: '20px' }}>
					<p style={{ padding: '15px', fontSize: '20px' }}>Are you sure? <br />want to delete ALL time slot!</p>
					<div className="btn-group">
						<button className="btn add" onClick={() => setYesDelAll(true)}>Yes</button>
						<button style={{ marginTop: '10px' }} className="deleteAll" onClick={() => setIsDelAll(false)}>No</button>
					</div>

				</div>}
			</>


		)
	}
}

export default List;