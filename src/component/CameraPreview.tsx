import * as React from 'react';
import * as Webcam from 'react-webcam';

export default class CameraPreview extends React.Component {
  public render() {
    return (
      <Webcam style={ { width: '100%', height: 'auto' } }/>
    )
  }
}
