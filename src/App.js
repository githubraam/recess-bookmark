import './components/style.css'
import List from './components/List'
import { TimeContext } from './context/TimeContext';
import { useState } from 'react';

function App() {
    const [startId, setStartId] = useState()
    const [tempTime, setTempTime] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [times, setTimes] = useState([])
    const [sureDelTime, setSureDelTime] = useState(false)
    return (
        <TimeContext.Provider value={{startId,setStartId, tempTime, setTempTime, isEdit, setIsEdit, times, setTimes, sureDelTime,setSureDelTime}}>
        <List />
        </TimeContext.Provider>
    );
}

export default App;