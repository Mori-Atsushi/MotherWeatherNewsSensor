import * as React from 'react';
import styled from 'styled-components';

import * as Api from '../api';

interface IState {
  isRecognizing: boolean,
  result: string
}

export default class CameraPreview extends React.Component<{}, IState> {
  private recognition = new webkitSpeechRecognition();

  constructor() {
    super({});
    this.state = {
      isRecognizing: false,
      result: ''
    }
    this._handleClick = this._handleClick.bind(this);
    this._handleSpeechRecognitionEvent = this._handleSpeechRecognitionEvent.bind(this);
    this.recognition.continuous = true;
    this.recognition.onresult = this._handleSpeechRecognitionEvent
  }

  public render() {
    return (
      <Wrapper>
        <div>
          { this.state.result }
        </div>
        <Button onClick={this._handleClick} >
          { this.state.isRecognizing ? 'Stop' : 'Start'}
        </Button>
      </Wrapper>
    )
  }

  private _handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if(this.state.isRecognizing) {
      this.recognition.stop();
    } else {
      this.recognition.start();
      this.setState({ result: '' })
    }
    this.setState({ isRecognizing: !this.state.isRecognizing })
  }

  private _handleSpeechRecognitionEvent(e: SpeechRecognitionEvent) {
    const index = e.results.length - 1;
    const result = `${this.state.result} ${e.results[index][0].transcript}`;
    if (!this.state.isRecognizing) {
      Api.postText(result)
    }
    this.setState({ result })
  }
}

const Wrapper = styled.div`
`;

const Button = styled.button`
`;
