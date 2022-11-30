import { useState, useEffect } from "react";

function CreateData()
{
  const [Data, setData] = useState();

  useEffect(() =>
  {
      fetch("https://api.tfl.gov.uk/Line/Meta/Modes")
        .then(response => response.json())
        .then(data => setData(data))
  });

  return (
  <div>
    <select>
      {Data.map(eachData =>
      {
        return <option>{eachData}</option>
      })}
    </select>
    <div>Selected Value:</div>
  </div>
  );
}
  
export default CreateData;