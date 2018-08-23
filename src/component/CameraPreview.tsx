import * as React from 'react';
import * as Webcam from 'react-webcam';
import styled from 'styled-components';

import * as Api from '../api';

interface IProps {
  isRuning: boolean
}

export default class CameraPreview extends React.Component<IProps> {
  private ref: Webcam;
  private timer: number;

  constructor(props: IProps) {
    super(props);
    this._setRef = this._setRef.bind(this);
    this._postImage = this._postImage.bind(this);
  }

  public componentWillReceiveProps(nexProps: IProps) {
    if (this.props.isRuning !== nexProps.isRuning) {
      if (nexProps.isRuning) {
        this.timer = window.setInterval(this._postImage, 10 * 1000);
      } else {
        window.clearInterval(this.timer);
      }
    }
  }

  public render() {
    return (
      <Wrapper>
        <Webcam
          screenshotFormat='image/jpeg'
          ref={this._setRef}
          style={ { width: '100%', height: 'auto' } }
        />
      </Wrapper>
    )
  }

  private _setRef(webcam: Webcam) {
    this.ref = webcam;
  }

  private _postImage() {
    const image = this.ref.getScreenshot();
    if (image) {
      Api.postImage(image);
    }
  }
}

const Wrapper = styled.div`
`;
