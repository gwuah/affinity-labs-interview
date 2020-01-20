import React from "react";
import Upload from "rc-upload";
import axios from "axios";
import Table from "./Table";

import "./App.css";

const uploadProps = {
  name: "csv",
  action: "http://localhost:5888/upload",
  multiple: false,
  data: { a: 1, b: 2 },
  headers: {
    "Content-Type": "multipart/form-data"
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], response: {} };
  }

  // parseResponse = () => {
  //   const { response } = this.state;
  //   Object.keys(response).forEach(key => {
  //     const newContainer = [];
  //     for (const record of response[key]) {
  //       newContainer.push({

  //       })
  //     }
  //   });
  // };

  httpRequest = ({ action, headers, data, filename, file }) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    axios
      .post(action, formData, {
        headers
      })
      .then(({ data: response }) => {
        this.setState({ response: response.results });
      })
      .catch(err => {
        console.log("err");
      });

    return {
      abort() {
        console.log("upload progress is aborted.");
      }
    };
  };

  render() {
    console.log(this.state.results);
    const { response } = this.state;
    const props = { ...uploadProps, customRequest: this.httpRequest };
    return (
      <div className="container">
        <div className="file-input-container">
          <Upload {...props}>
            <button className="upload-button">Choose File</button>
          </Upload>
          {Object.keys(response).map(key => {
            console.log(key);
            console.log(response[key]);
            return (
              <div>
                <h1>{key}</h1>
                <Table data={response[key]} />
              </div>
            );
          })}
          <br />
        </div>
      </div>
    );
  }
}

export default App;
