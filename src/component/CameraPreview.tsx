import * as React from 'react';
import * as Webcam from 'react-webcam';
import styled from 'styled-components';

import * as Api from '../api';

export default class CameraPreview extends React.Component {
  private ref: Webcam;

  constructor() {
    super({});
    this._setRef = this._setRef.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  public render() {
    return (
      <Wrapper>
        <Webcam
          ref={this._setRef}
          style={ { width: '100%', height: 'auto' } }
        />
        <Button onClick={this._handleClick} >
          Submit
        </Button>
      </Wrapper>
    )
  }

  private _setRef(webcam: Webcam) {
    this.ref = webcam;
  }

  private _handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const image = this.ref.getScreenshot();
    if (image) {
      Api.postImage(image);
    }
  }
}

const Wrapper = styled.div`
`;

const Button = styled.button`
`;
