import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
      super(props);

      this.state = {searchResults: [{name:'foo', artist:'foo', album:'foo', id:"5"}]};
      this.state.playlistName = 'Cool List';
      this.state.playlistTracks = [{name:'1', artist:'1', album:'1', id:'1'}];
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
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

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistTracks: [], playlistName: 'New Playlist'
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
      .then(tracks => {
        this.setState({ searchResults: tracks })
      });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}
                           onRemove={this.removeTrack} />
            <Playlist playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                name={this.state.playlistName}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
                onAdd={this.addTrack}
                onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
