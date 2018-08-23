import * as React from 'react';
import styled from 'styled-components';

import * as Api from '../api';

interface IProps {
  isRuning: boolean
}

interface IState {
  result: string
}

export default class CameraPreview extends React.Component<IProps, IState> {
  private recognition = new webkitSpeechRecognition();
  private timer: number;

  constructor(props: IProps) {
    super(props);
    this.state = {
      result: ''
    }
    this._postText = this._postText.bind(this);
    this._handleSpeechRecognitionEvent = this._handleSpeechRecognitionEvent.bind(this);
    this._handleSpeachRecognizationFinish = this._handleSpeachRecognizationFinish.bind(this);
    this.recognition.onresult = this._handleSpeechRecognitionEvent;
    this.recognition.onend = this._handleSpeachRecognizationFinish;
    this.recognition.onerror = this._handleSpeachRecognizationFinish;
  }

  public componentWillReceiveProps(nexProps: IProps) {
    if (this.props.isRuning !== nexProps.isRuning) {
      if (nexProps.isRuning) {
        this.recognition.start();
        this.timer = window.setInterval(this._postText, 10 * 1000);
      } else {
        this.recognition.stop();
        window.clearInterval(this.timer);
        this.setState({ result: '' });
      }
    }
  }

  public render() {
    return (
      <Wrapper>
        <div>
          { this.state.result }
        </div>
      </Wrapper>
    )
  }

  private _postText() {
    if(this.state.result) {
      Api.postText(this.state.result);
    }
    this.setState({ result: '' })
  }

  private _handleSpeechRecognitionEvent(e: SpeechRecognitionEvent) {
    this.recognition.stop();
    const index = e.results.length - 1;
    if (e.results[index].isFinal) {
      const result = `${this.state.result} ${e.results[index][0].transcript}`;
      this.setState({ result });
    }
  }

  private _handleSpeachRecognizationFinish() {
    if(this.props.isRuning) {
      this.recognition.start();
    }
  }
}

const Wrapper = styled.div`
`;
