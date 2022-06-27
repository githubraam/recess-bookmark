import { useContext, useEffect, useState } from "react"
import { TimeContext } from "../context/TimeContext"

const EditList = () =>{
    //getting variable from TimeContext, destructuring
    const {tempTime, setIsEdit, setCurrentTimeSet, currentTimeSet, startId,setStartId}  = useContext(TimeContext)


    const [updatedTime, setUpdatedTime] = useState({
        start:{
            hr: tempTime[0].start.hr,
            min: tempTime[0].start.min,
            sec: tempTime[0].start.sec
        },
        end:{
            hr: tempTime[0].end.hr,
            min: tempTime[0].end.min,
            sec: tempTime[0].end.sec
        }
    })


    const [editSuccess, setEditSuccess] = useState(false);

    //console.log(updatedTime);

	const cancelEdit = () =>{
        setIsEdit(false)
        setStartId('')
    }

    const updateTime = () =>{

        currentTimeSet.data.forEach((time, index) => {
            if(time.id === startId){

                //calculate total recess in a single time gap
                let totalSlotMin = 0;
                let totalSlotHr = 0;

                if(updatedTime.end.min<updatedTime.start.min){
                    totalSlotMin += (60 - updatedTime.start.min) + updatedTime.end.min
                }
                else{
                    totalSlotMin += updatedTime.end.min - updatedTime.start.min;
                }

                // calculate hour
				if(updatedTime.end.hr<updatedTime.start.hr){
                    totalSlotHr += (24 - updatedTime.start.hr) + updatedTime.end.hr
                }
                else{
                    totalSlotHr += updatedTime.end.hr - time.start.hr;
                }
                
                

                setCurrentTimeSet(
                        {...currentTimeSet},
                        currentTimeSet.data[index].start.hr = updatedTime.start.hr,
                        currentTimeSet.data[index].start.min = updatedTime.start.min,
                        currentTimeSet.data[index].start.sec = updatedTime.start.sec,
                        currentTimeSet.data[index].end.hr = updatedTime.end.hr,
                        currentTimeSet.data[index].end.min = updatedTime.end.min,
                        currentTimeSet.data[index].end.sec = updatedTime.end.sec,
                    )
                setEditSuccess(true)
            }
        });

        
    } 

    useEffect(()=>{
        if(editSuccess){
            
            setIsEdit(false)
            setStartId('')
        }
            
    },[editSuccess])


	return(
		<div className="container">
            <h1 className="title">Edit Time Slot</h1>
            
            

            <ul className="timeList">

                <li className="timeBreak">
                <span style={slot}>Start: 
                    <select className="formControl" 
                    value={updatedTime.start.hr} 
                    onChange={(e)=>{setUpdatedTime({...updatedTime},updatedTime.start.hr=parseInt(e.target.value))}}>
                        <option value="1">1hr</option>
                        <option value="2">2hr</option>
                        <option value="3">3hr</option>
                        <option value="4">4hr</option>
                        <option value="5">5hr</option>
                        <option value="6">6hr</option>
                        <option value="7">7hr</option>
                        <option value="8">8hr</option>
                        <option value="9">9hr</option>
                        <option value="10">10hr</option>
                        <option value="11">11hr</option>
                        <option value="12">12hr</option>
                        <option value="13">13hr</option>
                        <option value="14">14hr</option>
                        <option value="15">15hr</option>
                        <option value="16">16hr</option>
                        <option value="17">17hr</option>
                        <option value="18">18hr</option>
                        <option value="19">19hr</option>
                        <option value="20">20hr</option>
                        <option value="21">21hr</option>
                        <option value="22">22hr</option>
                        <option value="23">23hr</option>
                        <option value="24">24hr</option>
                    </select> &nbsp;
                    <select className="formControl" 
                    value={updatedTime.start.min} 
                    onChange={(e)=>{setUpdatedTime({...updatedTime},updatedTime.start.min=parseInt(e.target.value))}}
                    >
                        <option value="0">0 min</option>
                        <option value="1">1 min</option>
                        <option value="2">2 min</option>
                        <option value="3">3 min</option>
                        <option value="4">4 min</option>
                        <option value="5">5 min</option>
                        <option value="6">6 min</option>
                        <option value="7">7 min</option>
                        <option value="8">8 min</option>
                        <option value="9">9 min</option>
                        <option value="10">10 min</option>
                        <option value="11">11 min</option>
                        <option value="12">12 min</option>
                        <option value="13">13 min</option>
                        <option value="14">14 min</option>
                        <option value="15">15 min</option>
                        <option value="16">16 min</option>
                        <option value="17">17 min</option>
                        <option value="18">18 min</option>
                        <option value="19">19 min</option>
                        <option value="20">20 min</option>
                        <option value="21">21 min</option>
                        <option value="22">22 min</option>
                        <option value="23">23 min</option>
                        <option value="24">24 min</option>
                        <option value="25">25 min</option>
                        <option value="25">26 min</option>
                        <option value="27">27 min</option>
                        <option value="28">28 min</option>
                        <option value="29">29 min</option>
                        <option value="30">30 min</option>
                        <option value="31">31 min</option>
                        <option value="32">32 min</option>
                        <option value="33">33 min</option>
                        <option value="34">34 min</option>
                        <option value="35">35 min</option>
                        <option value="36">36 min</option>
                        <option value="37">37 min</option>
                        <option value="38">38 min</option>
                        <option value="39">39 min</option>
                        <option value="40">40 min</option>
                        <option value="41">41 min</option>
                        <option value="42">42 min</option>
                        <option value="43">43 min</option>
                        <option value="44">44 min</option>
                        <option value="45">45 min</option>
                        <option value="46">46 min</option>
                        <option value="47">47 min</option>
                        <option value="48">48 min</option>
                        <option value="49">49 min</option>
                        <option value="50">50 min</option>
                        <option value="51">51 min</option>
                        <option value="52">52 min</option>
                        <option value="53">53 min</option>
                        <option value="54">54 min</option>
                        <option value="55">55 min</option>
                        <option value="56">56 min</option>
                        <option value="57">57 min</option>
                        <option value="58">58 min</option>
                        <option value="59">59 min</option>
                    </select> &nbsp;
                    <select className="formControl" 
                    value={updatedTime.start.sec} 
                    onChange={(e)=>{setUpdatedTime({...updatedTime},updatedTime.start.sec=parseInt(e.target.value))}}
                    >
                        <option value="0">0 sec</option>
                        <option value="1">1 sec</option>
                        <option value="2">2 sec</option>
                        <option value="3">3 sec</option>
                        <option value="4">4 sec</option>
                        <option value="5">5 sec</option>
                        <option value="6">6 sec</option>
                        <option value="7">7 sec</option>
                        <option value="8">8 sec</option>
                        <option value="9">9 sec</option>
                        <option value="10">10 sec</option>
                        <option value="11">11 sec</option>
                        <option value="12">12 sec</option>
                        <option value="13">13 sec</option>
                        <option value="14">14 sec</option>
                        <option value="15">15 sec</option>
                        <option value="16">16 sec</option>
                        <option value="17">17 sec</option>
                        <option value="18">18 sec</option>
                        <option value="19">19 sec</option>
                        <option value="20">20 sec</option>
                        <option value="21">21 sec</option>
                        <option value="22">22 sec</option>
                        <option value="23">23 sec</option>
                        <option value="24">24 sec</option>
                        <option value="25">25 sec</option>
                        <option value="25">26 sec</option>
                        <option value="27">27 sec</option>
                        <option value="28">28 sec</option>
                        <option value="29">29 sec</option>
                        <option value="30">30 sec</option>
                        <option value="31">31 sec</option>
                        <option value="32">32 sec</option>
                        <option value="33">33 sec</option>
                        <option value="34">34 sec</option>
                        <option value="35">35 sec</option>
                        <option value="36">36 sec</option>
                        <option value="37">37 sec</option>
                        <option value="38">38 sec</option>
                        <option value="39">39 sec</option>
                        <option value="40">40 sec</option>
                        <option value="41">41 sec</option>
                        <option value="42">42 sec</option>
                        <option value="43">43 sec</option>
                        <option value="44">44 sec</option>
                        <option value="45">45 sec</option>
                        <option value="46">46 sec</option>
                        <option value="47">47 sec</option>
                        <option value="48">48 sec</option>
                        <option value="49">49 sec</option>
                        <option value="50">50 sec</option>
                        <option value="51">51 sec</option>
                        <option value="52">52 sec</option>
                        <option value="53">53 sec</option>
                        <option value="54">54 sec</option>
                        <option value="55">55 sec</option>
                        <option value="56">56 sec</option>
                        <option value="57">57 sec</option>
                        <option value="58">58 sec</option>
                        <option value="59">59 sec</option>
                    </select>
                 </span>
                <span style={slot}>End: &nbsp;
                    <select className="formControl" 
                    value={updatedTime.end.hr} 
                    onChange={(e)=>{setUpdatedTime({...updatedTime},updatedTime.end.hr=parseInt(e.target.value))}}
                    >
                        <option value="1">1hr</option>
                        <option value="2">2hr</option>
                        <option value="3">3hr</option>
                        <option value="4">4hr</option>
                        <option value="5">5hr</option>
                        <option value="6">6hr</option>
                        <option value="7">7hr</option>
                        <option value="8">8hr</option>
                        <option value="9">9hr</option>
                        <option value="10">10hr</option>
                        <option value="11">11hr</option>
                        <option value="12">12hr</option>
                        <option value="13">13hr</option>
                        <option value="14">14hr</option>
                        <option value="15">15hr</option>
                        <option value="16">16hr</option>
                        <option value="17">17hr</option>
                        <option value="18">18hr</option>
                        <option value="19">19hr</option>
                        <option value="20">20hr</option>
                        <option value="21">21hr</option>
                        <option value="22">22hr</option>
                        <option value="23">23hr</option>
                        <option value="24">24hr</option>
                    </select>  &nbsp;
                    <select className="formControl" 
                    value={updatedTime.end.min} 
                    onChange={(e)=>{setUpdatedTime({...updatedTime},updatedTime.end.min=parseInt(e.target.value))}}
                    >
                        <option value="0">0 min</option>
                        <option value="1">1 min</option>
                        <option value="2">2 min</option>
                        <option value="3">3 min</option>
                        <option value="4">4 min</option>
                        <option value="5">5 min</option>
                        <option value="6">6 min</option>
                        <option value="7">7 min</option>
                        <option value="8">8 min</option>
                        <option value="9">9 min</option>
                        <option value="10">10 min</option>
                        <option value="11">11 min</option>
                        <option value="12">12 min</option>
                        <option value="13">13 min</option>
                        <option value="14">14 min</option>
                        <option value="15">15 min</option>
                        <option value="16">16 min</option>
                        <option value="17">17 min</option>
                        <option value="18">18 min</option>
                        <option value="19">19 min</option>
                        <option value="20">20 min</option>
                        <option value="21">21 min</option>
                        <option value="22">22 min</option>
                        <option value="23">23 min</option>
                        <option value="24">24 min</option>
                        <option value="25">25 min</option>
                        <option value="25">26 min</option>
                        <option value="27">27 min</option>
                        <option value="28">28 min</option>
                        <option value="29">29 min</option>
                        <option value="30">30 min</option>
                        <option value="31">31 min</option>
                        <option value="32">32 min</option>
                        <option value="33">33 min</option>
                        <option value="34">34 min</option>
                        <option value="35">35 min</option>
                        <option value="36">36 min</option>
                        <option value="37">37 min</option>
                        <option value="38">38 min</option>
                        <option value="39">39 min</option>
                        <option value="40">40 min</option>
                        <option value="41">41 min</option>
                        <option value="42">42 min</option>
                        <option value="43">43 min</option>
                        <option value="44">44 min</option>
                        <option value="45">45 min</option>
                        <option value="46">46 min</option>
                        <option value="47">47 min</option>
                        <option value="48">48 min</option>
                        <option value="49">49 min</option>
                        <option value="50">50 min</option>
                        <option value="51">51 min</option>
                        <option value="52">52 min</option>
                        <option value="53">53 min</option>
                        <option value="54">54 min</option>
                        <option value="55">55 min</option>
                        <option value="56">56 min</option>
                        <option value="57">57 min</option>
                        <option value="58">58 min</option>
                        <option value="59">59 min</option>
                    </select> &nbsp;
                    <select className="formControl" 
                    value={updatedTime.end.sec} 
                    onChange={(e)=>{setUpdatedTime({...updatedTime},updatedTime.end.sec=parseInt(e.target.value))}}
                    >
                        <option value="0">0 sec</option>
                        <option value="1">1 sec</option>
                        <option value="2">2 sec</option>
                        <option value="3">3 sec</option>
                        <option value="4">4 sec</option>
                        <option value="5">5 sec</option>
                        <option value="6">6 sec</option>
                        <option value="7">7 sec</option>
                        <option value="8">8 sec</option>
                        <option value="9">9 sec</option>
                        <option value="10">10 sec</option>
                        <option value="11">11 sec</option>
                        <option value="12">12 sec</option>
                        <option value="13">13 sec</option>
                        <option value="14">14 sec</option>
                        <option value="15">15 sec</option>
                        <option value="16">16 sec</option>
                        <option value="17">17 sec</option>
                        <option value="18">18 sec</option>
                        <option value="19">19 sec</option>
                        <option value="20">20 sec</option>
                        <option value="21">21 sec</option>
                        <option value="22">22 sec</option>
                        <option value="23">23 sec</option>
                        <option value="24">24 sec</option>
                        <option value="25">25 sec</option>
                        <option value="25">26 sec</option>
                        <option value="27">27 sec</option>
                        <option value="28">28 sec</option>
                        <option value="29">29 sec</option>
                        <option value="30">30 sec</option>
                        <option value="31">31 sec</option>
                        <option value="32">32 sec</option>
                        <option value="33">33 sec</option>
                        <option value="34">34 sec</option>
                        <option value="35">35 sec</option>
                        <option value="36">36 sec</option>
                        <option value="37">37 sec</option>
                        <option value="38">38 sec</option>
                        <option value="39">39 sec</option>
                        <option value="40">40 sec</option>
                        <option value="41">41 sec</option>
                        <option value="42">42 sec</option>
                        <option value="43">43 sec</option>
                        <option value="44">44 sec</option>
                        <option value="45">45 sec</option>
                        <option value="46">46 sec</option>
                        <option value="47">47 sec</option>
                        <option value="48">48 sec</option>
                        <option value="49">49 sec</option>
                        <option value="50">50 sec</option>
                        <option value="51">51 sec</option>
                        <option value="52">52 sec</option>
                        <option value="53">53 sec</option>
                        <option value="54">54 sec</option>
                        <option value="55">55 sec</option>
                        <option value="56">56 sec</option>
                        <option value="57">57 sec</option>
                        <option value="58">58 sec</option>
                        <option value="59">59 sec</option>
                    </select>
                </span>
                </li>                
            </ul>
            <button className="btn add" onClick={updateTime}>Update</button>
            <button className="deleteAll" onClick={cancelEdit} style={{marginTop: "10px"}}>Cancel</button>
        </div>
	)
}
const slot = {
	display: 'block',
	padding: '5px'
}
export default EditList;