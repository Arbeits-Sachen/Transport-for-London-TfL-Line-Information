import './App.css';
import { useState, useEffect } from "react";
import CreateData from "./CreateData"

function App()
{
  const [Data, setData] = useState([]);

  useEffect(() =>
  {
    fetch("https://api.tfl.gov.uk/Line/Meta/Modes")
      .then(response => response.json())
      .then(data => setData(data))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Transport For Londom Line Information</h1>
        <CreateData Data={Data} />
      </header>
    </div>
  );
}

export default App;
