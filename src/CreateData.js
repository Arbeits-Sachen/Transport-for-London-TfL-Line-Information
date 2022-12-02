import { useState } from "react";

function CreateData(props)
{
  const [Transport, setTransport] = useState("");

  const change = (event) =>
  {
    setTransport(event.target.value);
  }

  const select = (Transport) =>
  {
    if (Transport === "Choose a Mode of Transport...")
    {
      setTransport("");
    }
  }

  return (
    <div>
      <select onChange={change}>
        <option>Choose a Mode of Transport...</option>
        {props.Data.map(eachData =>
        {
          return <option>{eachData.modeName}</option>
        })}
      </select>
      <div onChange={select(Transport)}>Selected Value: {Transport}</div>
    </div>
  );
}

export default CreateData;
