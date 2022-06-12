import './components/style.css'
import List from './components/List'
import { TimeContext } from './context/TimeContext';
import { useState } from 'react';

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
            return [];
        }
    }
    
    const getLocalStartId = () =>{
        if (localStorage.getItem('lstartId')) {
            console.log(localStorage.getItem('lstartId'));
            return localStorage.getItem('lstartId');
            
        }
        else{
            return '';
        }
    }


    


    const [startId, setStartId] = useState(getLocalStartId)
    const [tempTime, setTempTime] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [times, setTimes] = useState(getTimeDataFromLocalStorage)
    const [sureDelTime, setSureDelTime] = useState(false)
    const [confirmDel, setConfirmDel] = useState(false)

    const [currentTimeSet, setCurrentTimeSet] = useState([])
    const [prevTimeSet, setPrevTimeSet] = useState([])
    
    return (
        <TimeContext.Provider value={{startId,setStartId, tempTime, setTempTime, isEdit, setIsEdit, times, setTimes, sureDelTime,setSureDelTime, confirmDel, setConfirmDel, currentTimeSet, setCurrentTimeSet, prevTimeSet, setPrevTimeSet}}>
        <List />
        </TimeContext.Provider>
    );
}


export default App;