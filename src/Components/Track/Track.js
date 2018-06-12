import React from 'react';
import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  render() {
    return (
      <div className="Track" key={this.props.track.id} >
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
         { this.renderAction() }
      </div>
    );
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if(this.props.isRemoval) {
      return <a className="Track-action"
                id={this.props.track.key}
                onClick={this.removeTrack} > - </a>
    } else {
      return <a className="Track-action"
                id={this.props.track.key}
                onClick={this.addTrack} > + </a>
    }
  }

}

export default Track;
