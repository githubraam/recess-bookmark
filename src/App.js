import './components/style.css'
import List from './components/List'
import { TimeContext } from './context/TimeContext';
import { useState } from 'react';

function App() {
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
    const [times, setTimes] = useState(parseTimes)
    const [sureDelTime, setSureDelTime] = useState(false)
    const [confirmDel, setConfirmDel] = useState(false)
    return (
        <TimeContext.Provider value={{startId,setStartId, tempTime, setTempTime, isEdit, setIsEdit, times, setTimes, sureDelTime,setSureDelTime, confirmDel, setConfirmDel}}>
        <List />
        </TimeContext.Provider>
    );
}

export default App;