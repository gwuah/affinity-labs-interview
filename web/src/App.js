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
    this.state = { response: {}, err: null };
  }

  httpRequest = ({ action, headers, data, filename, file }) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    formData.append(filename, file);

    axios
      .post(action, formData, {
        headers,
      })
      .then(({ data }) => {
        this.setState({ response: data.results });
      })
      .catch(() => {
        this.setState({ err: true });
      });
  };

  render() {
    const { response, err } = this.state;
    const props = { ...uploadProps, customRequest: this.httpRequest };
    return (
      <div className='container' data-testid='app'>
        <div className='file-input-container'>
          <Upload {...props} data-testid='upload-component'>
            <button
              data-testid='upload-button'
              className='upload-button'
              style={{ marginBottom: '30px' }}
            >
              Click Here To Upload File
            </button>
          </Upload>
          {err && (
            <h2 data-testid='error-message'>
              An Error Occurred. Make sure your server is up
            </h2>
          )}
          {Object.keys(response).map(company => {
            return (
              <div className='table-container' key={company}>
                <h1>{company.toUpperCase()}</h1>
                <Table bordered data={response[company].logs} />
                <div className='total-heading-container'>
                  <span className='total-heading'>Total Hours</span> :{' '}
                  {response[company].totalHours}
                </div>
                <div className='total-heading-container'>
                  <span className='total-heading'>Total Cost</span> :{' '}
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
