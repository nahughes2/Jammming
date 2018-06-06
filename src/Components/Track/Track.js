import React from 'react';
import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack.bind(this);
    this.removeTrack.bind(this);
  }

  render() {
    return (
      <div className="Track" key={this.props.track.id} >
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action"> + or - will go here </a>
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
                onClick={this.removeTrack} > - </a>
    } else {
      return <a className="Track-action"
                onClick={this.addTrack} > + </a>
    }
  }

}

export default Track;
