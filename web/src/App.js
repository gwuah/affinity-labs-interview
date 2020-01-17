import React from "react";
import Upload from "rc-upload";
import axios from "axios";
import "./App.css";

const uploadProps = {
  name: "csv",
  action: "http://localhost:5888/upload",
  multiple: false,
  data: { a: 1, b: 2 },
  headers: {
    "Content-Type": "multipart/form-data"
  },
  onStart(file) {
    console.log("onStart", file, file.name);
  },
  onSuccess(ret, file) {
    console.log("onSuccess", ret, file.name);
  },
  onError(err) {
    console.log("onError", err);
  },
  onProgress({ percent }, file) {
    console.log("onProgress", `${percent}%`, file.name);
  },
  customRequest({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess
  }) {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    axios
      .post(action, formData, {
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file
          );
        }
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
      })
      .catch(err => {
        console.log("axxxxx");
        onError(err);
      });

    return {
      abort() {
        console.log("upload progress is aborted.");
      }
    };
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="file-input-container">
          <Upload {...uploadProps}>
            <button className="upload-button">Choose File</button>
          </Upload>
          <br />
        </div>
      </div>
    );
  }
}

export default App;
