import { useState, useEffect } from "react";

function CreateData(props)
{
  const [Transport, setTransport] = useState("");
  const [Destination, setDestination] = useState([]);

  useEffect(() =>
  {
    if (Transport !== "Choose a Mode of Transport..." && Transport !== "")
    {
      fetch("https://api.tfl.gov.uk/Line/Mode/" + Transport)
        .then(response => response.json())
        .then(data => setDestination(data))
    }

    else
    {
      setDestination([])
    }

  }, [Transport]);



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

      <select>
        <option>Choose a Destination...</option>
        <DestinationFunction Destination={Destination} />
      </select>

      <div onChange={select(Transport)}>Selected Value: {Transport}</div>
    </div>
  );
}

const DestinationFunction = ({ Destination }) =>
{
  return (
    Destination.map(eachDestination =>
    {
      return <option>{eachDestination.id}</option>
    }))

}

export default CreateData;
