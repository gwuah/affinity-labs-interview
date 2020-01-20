import React from 'react';

export default function Upload(props) {
  const { action, headers, data, fileName, customRequest } = props;
  return (
    <input
      type='file'
      data-testid='mock-upload-button'
      onChange={e => {
        customRequest({
          action,
          headers,
          data,
          fileName,
          file: e.target.files[0],
        });
      }}
    />
  );
}
