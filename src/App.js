import "./assets/global.css";
import React, { useState } from "react";
import Papa from "papaparse";
import SparkMD5 from 'spark-md5'

function App() {






  const [currentCsvData, setCurrentCsvData] = useState([{}]);
  const csvUploadHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCurrentCsvData(results.data);
        console.log(results.data);
      },
    });
  };



  const [fileHashes, setFileHashes] = useState([]);
  const observableUploadHandler = (event) => {
    const fileList = event.target.files;
    const promises = Array.from(fileList).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileBuffer = new Uint8Array(event.target.result);
          const hash = SparkMD5.ArrayBuffer.hash(fileBuffer);
          resolve({ filename: file.name, hash: hash });
        };
        reader.onerror = (event) => {
          reject(event.target.error);
        };
        reader.readAsArrayBuffer(file);
      });
    });

    Promise.all(promises)
      .then((hashes) => {
        setFileHashes(hashes);
        console.log(hashes)
      })
      .catch((error) => {
        console.error('Error calculating hash:', error);
      });
  };

  var currentdate = new Date();
  var datetime =
    currentdate.getMonth() +
    1 +
    "/" +
    currentdate.getDate() +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    "Z";

  const [operatorInitials, setOperatorInitials] = useState("");
  const [mitreVectors, setMitreVectors] = useState("");
  const [suricataAlerts, setSuricataAlerts] = useState("");
  const [description, setDescription] = useState("");
  const [recommendedRemediation, setRecommendedRemediation] = useState("");

  const [outputText, setOutputText] = useState("No Data Entered");

  function handleFormatOnClick() {
    var uniqueSrcIPs = [];
    var uniqueSrcPorts = [];
    var uniqueDstIPs = [];
    var uniqueDstPorts = [];
    var uniqueCommunityIds = [];
    var formattedFileHashes = [];

    setOperatorInitials(document.getElementById("initials-input").value);
    setMitreVectors(document.getElementById("attack-vector-input").value);
    setSuricataAlerts(document.getElementById("alert-input").value);
    setDescription(document.getElementById("description-input").value);
    setRecommendedRemediation(
      document.getElementById("remediation-input").value
    );

    fileHashes.forEach((entry) => {
      let formattedFileHash = entry["filename"] + ' - ' + entry["hash"]
      formattedFileHashes.push("\n" + formattedFileHash)
    })

    currentCsvData.forEach((entry) => {
      if (!uniqueSrcIPs.includes(" " + entry["Src IP"])) {
        uniqueSrcIPs.push(" " + entry["Src IP"]);
      }
      if (!uniqueSrcPorts.includes(" " + entry[" Src Port"])) {
        uniqueSrcPorts.push(" " + entry[" Src Port"]);
      }
      if (!uniqueDstIPs.includes(" " + entry[" Dst IP"])) {
        uniqueDstIPs.push(" " + entry[" Dst IP"]);
      }
      if (!uniqueDstPorts.includes(" " + entry[" Dst Port"])) {
        uniqueDstPorts.push(" " + entry[" Dst Port"]);
      }
      if (!uniqueCommunityIds.includes("\n" + entry[" Community Id"])) {
        uniqueCommunityIds.push("\n" + entry[" Community Id"]);
      }
    });

    setOutputText(
      "**Time Observed:** " +
      datetime +
      " by: " +
      operatorInitials +
      "\n\n**Src IP:**  " +
      uniqueSrcIPs +
      "\n\n**Src Ports:**  " +
      uniqueSrcPorts +
      "\n\n**Dst IP:**  " +
      uniqueDstIPs +
      "\n\n**Dst Ports:**  " +
      uniqueDstPorts +
      "\n\n**Community IDs:**\n" +
      uniqueCommunityIds +
      "\n\n**Observable MD5 Hashes:**\n" +
      formattedFileHashes +
      "** MITRE Vectors of Attack:**\n\n" +
      mitreVectors +
      "\n\n**Suricata Alerts:**\n\n" +
      suricataAlerts +
      "\n\n**Description:**\n\n" +
      description +
      "\n\n**Recommended Remediation:**\n\n" +
      recommendedRemediation
    );
  }
  function toggleInstructionsModal() {
    document.getElementById("instructions-page").classList.toggle("visible");
  }

  return (
    <div id="content-container" className="content-container">
      <div
        id="instructions-button"
        className="instructions-button"
        title="tooltip"
        onClick={toggleInstructionsModal}
      >
        Instructions
      </div>
      <div id="instructions-page" className="instructions-page">
        <div
          id="x-button"
          className="x-button"
          onClick={toggleInstructionsModal}
        >
          X
        </div>
        <h4>STEP 1</h4>
        <p>In arkime, export the .csv for all sessions.</p>
        <p>Then, drop it in the .csv drop area.</p>
        <h4>STEP 2</h4>
        <p>
          Compile all pcaps into a single pcap in arkime, that way you can pull
          all of the http items and stuff for hashing. This can be done using
          the arrow in the top right of the Arkime window.
        </p>
        <p>a. Save all observables from the .pcap</p>
        <p>b. Drop all observables into the observable drop area.</p>
        <h4>STEP 3</h4>
        <p>Submit, then copy the output into your hive case.</p>
      </div>

      <div className="input-container">
        {/* <button id="background-button">Change background!</button> */}
        <div className="form-container">
          <div className="form-gap">
            <label>Operator Initials:</label>
            <input id="initials-input" type="text" />
          </div>
          <div className="form-gap">
            <label>MITRE ATT&CK Vectors:</label>
            <textarea id="attack-vector-input" />
          </div>
          <div className="form-gap">
            <label>Suricata Alerts:</label>
            <textarea id="alert-input" />
          </div>
          <div className="form-gap">
            <label>Description:</label>
            <textarea id="description-input" />
          </div>
          <div className="form-gap">
            <label>Recommended Remediation:</label>
            <textarea id="remediation-input" />
          </div>
        </div>
        <div className="upload-buttons-wrapper">
          <div className="upload-button">
            <label className="file-upload-label" id="csv-upload-label">
              Click here or Drag a .csv file to upload
              <input
                name="file"
                id="csv-upload"
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={csvUploadHandler}
              />
            </label>
          </div>
          <div className="upload-button">
            <label className="file-upload-label">
              Click or Drag an Observable to upload
              <input
                id="observable-upload"
                type="file"
                style={{ display: "none" }}
                multiple
                onChange={observableUploadHandler}
              />
            </label>
          </div>
        </div>
        <button id="submit-button" onClick={handleFormatOnClick}>
          Format!
        </button>
      </div>
      <div className="output-container">
        <textarea id="formatted-output" value={outputText}></textarea>
      </div>
    </div>
  );
}
export default App;
