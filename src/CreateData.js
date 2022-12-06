import { useState, useEffect } from "react";

function CreateData(props)
{
  const [Transport, setTransport] = useState("");
  const [selectLine, setSelectLine] = useState("");
  const [Line, setLine] = useState([]);
  const [Route, setRoute] = useState({});

  useEffect(() =>
  {
    if (Transport !== "")
    {
      fetch("https://api.tfl.gov.uk/Line/Mode/" + Transport)
        .then(response => response.json())
        .then(data => setLine(data))
    }

    else
    {
      setLine([])
    }

  }, [Transport]);



  useEffect(() =>
  {
    if (Transport !== "" && selectLine !== "")
    {
      fetch("https://api.tfl.gov.uk/Line/" + selectLine + "/Route")
        .then(response => response.json())
        .then(data => setRoute(data))
    }

    else
    {
      setRoute({})
    }

  }, [selectLine, Transport]);



  const changeTransport = (event) =>
  {
    setTransport(event.target.value);
  }

  const changeLine = (event) =>
  {
    setSelectLine(event.target.value);
  }

  const select = (Transport, selectLine) =>
  {
    if (Transport === "Choose a Mode of Transport...")
    {
      setTransport("");
      setSelectLine("");
    }

    if (selectLine === "Choose a Line...")
    {
      setSelectLine("");
    }
  }





  return (
    <div>
      <select onChange={changeTransport}>
        <option>Choose a Mode of Transport...</option>
        {props.Data.map(eachData =>
        {
          return <option>{eachData.modeName}</option>
        })}
      </select>

      <select onChange={changeLine}>
        <option>Choose a Line...</option>
        <LineFunction Line={Line} />
      </select>

      <div onChange={select(Transport, selectLine)}>
        <strong>{Transport}: {selectLine}</strong>
      </div>

      <RouteFunction routeSections={Route.routeSections} />
    </div>
  );
}



const LineFunction = ({ Line }) =>
{
  return (
    Line.map(eachDestination =>
    {
      return <option>{eachDestination.id}</option>
    }))
}



const RouteFunction = ({ routeSections }) =>
{
  if (routeSections !== "" && routeSections !== undefined)
  {
    return (
      <div>
        <p>{routeSections[0].originationName}</p>
        <p>{routeSections[routeSections.length - 1].originationName}</p>
      </div>
    )
  }
}

export default CreateData;
