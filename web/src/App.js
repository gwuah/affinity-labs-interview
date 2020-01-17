import React from "react";
import Upload from "rc-upload";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="file-input-container">
          <Upload>
            <button className="upload-button">Choose File</button>
          </Upload>
        </div>
      </div>
    );
  }
}

export default App;
