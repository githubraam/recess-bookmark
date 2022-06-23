import React, { useContext } from "react";
import { TimeContext } from "../../context/TimeContext";
import { calculateTheTime } from "../../utility/utilities";
const Sidebar = (props) => {
    
    const {times} = useContext(TimeContext)
    return <aside className={'asideSidebar '+ (props.toggled ? 'show' : 'hide')}>

            <ul className="dataList">
                {
                times.length && times.map((time,index,arr)=>{

				//calculate total recess in a single time gap
				let totalSlotSec = 0,totalSlotMin = 0,totalSlotHr = 0;


                const [getTotalHrs , getTotalMin, getTotalSec] = calculateTheTime(time.start, time.end);
                totalSlotHr = getTotalHrs
                totalSlotMin = getTotalMin
                totalSlotSec = getTotalSec

                let havePrevDate = true;
                let previousItem = arr[index - 1];
                if(index>0 ){
                    havePrevDate = time.date!==previousItem.date ? true : false;
                }


                return <React.Fragment key={index}>
                {havePrevDate && <li className="mainDate">{ time.date}</li>}
                <li className="timeBreak" >
                    <span className="start">Start: {time.start.hr}hr {time.start.min}min {time.start.sec}sec</span>
                    <span className="end">End: {time.end.hr}hr {time.end.min}min {time.end.sec}sec</span>
                    {time.timeSlotTotal!=='' && <span className="slotTotal">{totalSlotHr}H {totalSlotMin}M {totalSlotSec}S</span>}
                </li>
                </React.Fragment>
                }
                )
                }

            </ul>
        </aside>
}

export default Sidebar;

