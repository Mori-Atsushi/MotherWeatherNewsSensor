import * as React from 'react';
import styled from 'styled-components';

import CameraPreview from '../component/CameraPreview';
import SpearchRecognizer from '../component/SpearchRecognizer';

interface IState {
  isRuning: boolean
}

export default class App extends React.Component<{}, IState> {
  constructor() {
    super({});
    this.state = ({
      isRuning: false
    });
    this._handleClick = this._handleClick.bind(this);
  }

  public render() {
    return (
      <div>
        <Button onClick={this._handleClick}>
          { this.state.isRuning ? 'Stop' : 'Start'}
        </Button>
        <CameraPreview />
        <SpearchRecognizer />
      </div>
    );
  }

  private _handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({ isRuning: !this.state.isRuning })
  }
}

const Button = styled.button`
  margin: 10px;
`;
