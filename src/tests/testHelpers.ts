export const createDataPoints = (numDataPoints: number) => {
  const data = [];
  const firstDate = new Date();

  firstDate.setMinutes(firstDate.getDate() - numDataPoints);

  // and generate 500 data items
  let value = numDataPoints;

  for (let i = 0; i < numDataPoints; i++) {
    let newDate = new Date(firstDate);
    // each time we add one minute
    newDate.setMinutes(newDate.getMinutes() + i);
    // some random number
    value += Math.round((Math.random() < 0.5 ? 1 : -0.5) * 5);
    // add data item to the array
    data.push({
      date: newDate.getTime(),
      value,
    });
  }

  return data;
};

export default createDataPoints;
