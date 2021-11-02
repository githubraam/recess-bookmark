import { useEffect, useState } from "react";
import Sound from 'react-sound';

const Total = ({time,counter}) =>{
    
    let timeOutput = 0;
    time.map((time)=>{
        timeOutput = timeOutput + time.total;
    })

    let appxTime = parseInt(timeOutput)+parseInt(counter);

    return(
        <>
        <h1 className="total">#Time Consumed: {timeOutput} min </h1>
        { counter >=0 && <h3 className="approaxTime">Consumed Till Now: {appxTime} min (Approx)</h3>}

        {<Sound
            url="audio/alarm.wav"
            playStatus={appxTime>36 && counter>=0 ? Sound.status.PLAYING : Sound.status.STOPPED}
            loop={true}
        />  }
        </>
    );
}

export default Total;