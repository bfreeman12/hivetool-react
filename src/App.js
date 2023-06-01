import "./assets/global.css";

function App() {
  //TODO: TAKE ALL INPUT AND DISPLAY CORRECTLY IN THE OUTPUT TEXTAREA
  // INITIALS
  // ATTACK VECTOR
  // ALERT
  // DESCRIPTION
  // REMEDIATION
  //TODO: PARSE UPLOADED CSV FILES
  //TODO: SHA256 HASH FILES AND RETURN THE HASHES TO TEXT AREA
  return (
    <div id="content-container" className="content-container">
      <div>
        <button id="background-button">Change background!</button>
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
        <div>
          <label className="file-upload-label">
            Click here or Drag a .csv file to upload
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div>
          <label className="file-upload-label">
            Click or Drag an Observable to upload
            <input
              id="observable-upload"
              type="file"
              style={{ display: "none" }}
              multiple
            />
          </label>
        </div>
        <button id="submit-button">Format!</button>
      </div>
      <div className="output-container">
        <div id="formatted-output"></div>
      </div>
    </div>
  );
}
export default App;
