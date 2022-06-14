import React, { useContext } from "react";
import { TimeContext } from "../../context/TimeContext";

const Sidebar = () => {
    
    const {times} = useContext(TimeContext)
    return <aside className="asideSidebar">
            <ul className="dataList">
                {
                times.length && times.map((time,index)=>{
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
                    <span>Start: {time.start.hr}hr {time.start.min}min {time.start.sec}sec</span>
                    <span>End: {time.end.hr}hr {time.end.min}min {time.end.sec}sec</span>
                    {time.timeSlotTotal!=='' && <span className="slotBt">Total {totalSlotHr}H {totalSlotMin}M {totalSlotSec}S</span>
                    }
                </li>
                }
                )
                }

            </ul>
        </aside>
}

export default Sidebar;

