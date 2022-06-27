export const  calculateTheTime = (start, end) => {
    //console.log(end.hr)
    let ssec = start.sec,
      smin = start.min * 60,
      shr = start.hr * 60 * 60,
      esec = end.sec,
      emin = end.min * 60,
      ehr = end.hr * 60 * 60;




    // calculation per slot
  
    let totalStartSec = ssec + smin + shr,
      totalEndSec = esec + emin + ehr;
  
    let timeDiff = totalEndSec - totalStartSec;
  
    let getTotalHrs = parseInt(String(timeDiff / 3600), 10),
      getTotalMin = parseInt(String((timeDiff % 3600) / 60), 10),
      getTotalSec = (timeDiff % 3600) % 60;



    return [getTotalHrs , getTotalMin, getTotalSec];
    //console.log(getTotalHrs, getTotalMin, getTotalSec);
  }