import * as React from 'react';

import CameraPreview from '../component/CameraPreview';
import SpearchRecognizer from '../component/SpearchRecognizer';

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <CameraPreview />
        <SpearchRecognizer />
      </div>
    );
  }
}
