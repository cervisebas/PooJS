import React, { PureComponent } from 'react';
import './App.scss';
import Render from './scripts/Render';

type IProps = {};
type IState = {};

const RenderCanvas = new Render();

export default class App extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  componentDidMount(): void {
    RenderCanvas.init();
  }
  render(): React.ReactNode {
    return(<div id={'content-app'}>
      <canvas
        id={'canvas-game'}
        width={1280}
        height={720}
      />
    </div>);
  }
}