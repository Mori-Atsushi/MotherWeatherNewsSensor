import * as React from 'react';

import CameraPreview from '../component/CameraPreview';

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <CameraPreview />
      </div>
    );
  }
}