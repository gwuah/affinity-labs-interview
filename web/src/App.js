import React from 'react';
import Upload from 'rc-upload';
import axios from 'axios';
import Table from './Table';

import './App.css';

const uploadProps = {
  name: 'csv',
  action: 'http://localhost:5888/upload',
  multiple: false,
  data: { a: 1, b: 2 },
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: {} };
  }

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
        headers,
      })
      .then(({ data }) => {
        this.setState({ response: data.results });
      })
      .catch(err => {
        console.log('err');
      });

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  };

  render() {
    const { response } = this.state;
    const props = { ...uploadProps, customRequest: this.httpRequest };
    return (
      <div className="container">
        <div className="file-input-container">
          <Upload {...props}>
            <button className="upload-button" style={{ marginBottom: '30px' }}>
              Click Here To Upload File
            </button>
          </Upload>
          {Object.keys(response).map(company => {
            return (
              <div className="table-container">
                <h1>{company.toUpperCase()}</h1>
                <Table bordered data={response[company].logs} />
                <div className="total-heading-container">
                  <span className="total-heading">Total Hours</span> :{' '}
                  {response[company].totalHours}
                </div>
                <div className="total-heading-container">
                  <span className="total-heading">Total Cost</span> :{' '}
                  {response[company].totalCost}
                </div>
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
