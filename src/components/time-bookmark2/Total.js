import { useEffect } from "react";

const Total = ({data}) =>{

    useEffect(()=>{
        //console.log(data);
    },[data])
    
    let timeOutput = 0;
    data.map((time)=>{
        timeOutput = timeOutput + time.total;
    })
   
    return(<h1 className="total">#Time Consumed: {timeOutput} min</h1>);
}

export default Total;