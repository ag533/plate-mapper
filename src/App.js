import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Tooltip from "./WellsHelper";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [upload, setUpload] = useState(false);
  const [indexList, setIndexList] = useState([]);
  const [colorList, setColorlist] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const assignColorAndCreateIndex = (arr) => {
    var unColouredArray = arr;
    var knownList = [];
    var indexTable = [];
    arr.forEach((element, index) => {
      if (Object.keys(knownList).includes(element.sample_id)) {
        unColouredArray[index].color = knownList[element.sample_id];
        indexTable[element.sample_id] =
          indexTable[element.sample_id] + "," + element.coordinate;
      } else {
        knownList[element.sample_id] = getRandomColor();
        indexTable[element.sample_id] = element.coordinate;
        unColouredArray[index].color = knownList[element.sample_id];
      }
    });
    setIndexList(indexTable);
    setArray(unColouredArray);
    setColorlist(knownList);
    setUpload(true);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string
      .slice(0, string.indexOf("\n"))
      .split(",")
      .map(function (item) {
        return item.trim();
      });
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object["color"] = "white";
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    assignColorAndCreateIndex(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const table = Object.entries(indexList).map(([key, value]) => {
    return (
      <tr>
        <td>{key}</td>
        <td>{value}</td>
        <td style={{ backgroundColor: colorList[key] }}></td>
      </tr>
    );
  });

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.body);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  const handleRerenderClick = async () => {
    setUpload(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Plate Mapper</p>
      </header>
      <div style={{ textAlign: "center" }}>
        {upload && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="button"
              onClick={(e) => {
                handleCaptureClick(e);
              }}
            >
              Save Configuration
            </button>
            <button
              className="button"
              onClick={(e) => {
                handleRerenderClick(e);
              }}
            >
              <span>Rerender/ Upload new set</span>
            </button>
          </div>
        )}
        {!upload && <h1>Import the plate layout CSV file</h1>}
        {!upload && (
          <form>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />

            <button
              className="button"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              SUBMIT
            </button>
          </form>
        )}

        <br />

        {upload && (
          <div className="grid">
            {array.map((item) => (
              <Tooltip
                content={item.sample_id}
                direction="right"
                key={item.coordinate}
              >
                <div
                  className="cell"
                  key={item.coordinate}
                  style={{ backgroundColor: item.color }}
                >
                  {item.coordinate}
                </div>
              </Tooltip>
            ))}
          </div>
        )}

        {upload && (
          <div className="tableContainer">
            <table className="table">
              <tr>
                <th className="th">Sample</th>
                <th className="th">Location</th>
                <th className="th">Color</th>
              </tr>
              {table}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
