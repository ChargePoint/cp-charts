export const createDataPoints = (numDataPoints: number) => {
    const data = [];
  
    // current date
    const firstDate = new Date();
  
    // now set 500 minutes back
    firstDate.setMinutes(firstDate.getDate() - numDataPoints);
  
    // and generate 500 data items
    let energy = numDataPoints;
  
    for (let i = 0; i < numDataPoints; i++) {
        let newDate = new Date(firstDate);
        // each time we add one minute
        newDate.setMinutes(newDate.getMinutes() + i);
        // some random number
        energy += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
        // add data item to the array
        data.push({
            date: newDate,
            value: energy
        });
    }
  
    return data;
  }
  
  export default createDataPoints;
  