import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
      super(props);

      this.state.searchResults = {track: []};
      this.state.playlistName = '';
      this.state.playlistTracks = {track: []};

      this.addTrack.bind(this);
      this.removeTrack.bind(this);
      this.updatePlaylistName.bind(this);
  }

  addTrack(trackToAdd) {

    if(this.state.playlistTracks.find(currentTrack =>
        trackToAdd.id === currentTrack.id )) {
          return;
    } else {
      var updatedPlayList = this.state.playlistTracks.concat(trackToAdd);
      this.setState({ playlistTracks: updatedPlayList })
    }
  }

  removeTrack(trackToRemove) {
    var updatedPlayList = this.state.playlistTracks.filter(trackToRemove.id)
    this.setState({ playlistTracks: updatedPlayList })
  }

  updatePlaylistName(name) {
      this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist  playlistName={this.state.playlistName}
                       playlistTracks={this.state.playlistTracks}
                       onRemove={this.removeTrack}
                       onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
