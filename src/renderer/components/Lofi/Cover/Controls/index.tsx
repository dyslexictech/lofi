import * as React from 'react';
import './style.scss';

class Controls extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  async pausePlay() {
    if (this.props.parent.getPlayState()) {
      fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Bearer '+ this.props.token
        })
      });
    } else {
      fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Bearer '+ this.props.token
        })
      });
    }
    // Assume original state is correct and make UI a bit snappier
    this.props.parent.togglePlayPause();
  }

  async forward() {
    fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer '+ this.props.token
      })
    });
    this.props.parent.setPlaying(true);
  }

  async backward() {
    fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer '+ this.props.token
      })
    });
    this.props.parent.setPlaying(true);
  }

  render() {
    return (
      <div className='controls centered'>
        <p>
        <a onClick={this.backward.bind(this)} className='control-btn secondary-control not-draggable'><i className="fa fa-step-backward not-draggable"></i></a>
        <a onClick={this.pausePlay.bind(this)} className='control-btn not-draggable' ><i className={"fa not-draggable " + (this.props.parent.getPlayState() ? "fa-pause" : "fa-play") } ></i></a>
        <a onClick={this.forward.bind(this)} className='control-btn secondary-control not-draggable'><i className="fa fa-step-forward not-draggable"></i></a>
        </p>
      </div>
    );
  }
}

export default Controls;
