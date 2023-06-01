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

  function toggleInstructionsModal() {
    document.getElementById('instructions-page').classList.toggle('visible')
  }
  return (
    <div id="content-container" className="content-container">
      <div id="instructions-button" className="instructions-button" title="tooltip" onClick={toggleInstructionsModal}>Instructions</div>
      <div id="instructions-page" className="instructions-page">
        <div id="x-button" className="x-button" onClick={toggleInstructionsModal}>X</div>
        <h4>STEP 1</h4>
        <p>In arkime, export the .csv for all sessions with columns:</p>
        <p>srcIp,srcPort,dstIp,dstPort,communityId</p>
        <p>Then, drop it in the .csv drop area.</p>
        <h4>STEP 2</h4>
        <p>Compile all pcaps into a single pcap in arkime, that way you can pull all of the http items and stuff for hashing. This can be done using the arrow in the top right of the Arkime window.</p>
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
          <div className="upload-button">
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
