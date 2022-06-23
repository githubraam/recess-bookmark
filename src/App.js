import './components/style.css'
import List from './components/List'
import { TimeContext } from './context/TimeContext';
import { useEffect, useState } from 'react';

function App() {
    const [today] = useState(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`)
    
    const getTimeDataFromLocalStorage = () =>{
        if (localStorage.getItem('localTime')) {
            return JSON.parse(localStorage.getItem('localTime'));
            //let datas = JSON.parse(localStorage.getItem('localTime'));
            //let dateCompare = datas.filter(data=>data.date = today)
            //console.log(dateCompare)
        }
        else{
            return {
                info:{
                    lastRecordDate: ""
                },
                data:[
                ]
            }
            
        }
    }

    const getHistoryFromLocalStorage = () =>{
        if (localStorage.getItem('timeHistory')) {
            return JSON.parse(localStorage.getItem('timeHistory'));
            //let datas = JSON.parse(localStorage.getItem('localTime'));
            //let dateCompare = datas.filter(data=>data.date = today)
            //console.log(dateCompare)
        }
        else{
            return []
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


    useEffect(()=>{
        let todayDate = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;
        if( localStorage.getItem('lastRecordDate') !== todayDate ){
            
            setTimes(  times => [...times,...currentTimeSet.data] )
            setCurrentTimeSet({
                info:{
                    lastRecordDate: ""
                },
                data:[
                ]
            })
            currentTimeSet.info.lastRecordDate = todayDate;
            localStorage.setItem('lastRecordDate',todayDate);
        }
    },[])


    


    const [startId, setStartId] = useState(getLocalStartId)
    const [tempTime, setTempTime] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    
    const [sureDelTime, setSureDelTime] = useState(false)
    const [confirmDel, setConfirmDel] = useState(false)

    const [totalData, setTotalData] = useState({
        hour: 0,
        min: 0,
        sec: 0
    })

    // times will be used to store data of all day / show all history
    const [times, setTimes] = useState(getHistoryFromLocalStorage)
    // curentTimeSet is used to store all current / today's data
    const [currentTimeSet, setCurrentTimeSet] = useState(getTimeDataFromLocalStorage)
    
    return (
        <TimeContext.Provider value={{startId, setStartId, tempTime, setTempTime, isEdit, setIsEdit, times, setTimes, sureDelTime,setSureDelTime, confirmDel, setConfirmDel, currentTimeSet, setCurrentTimeSet, totalData, setTotalData}}>
        <List />
        </TimeContext.Provider>
    );
}

export default App;