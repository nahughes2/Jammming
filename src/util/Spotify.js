
let accessToken;
const clientID = '7857f64c28bf4fdaba3762b0f26caed7';
const redirectURI = 'http://localhost:3000/';


const Spotify = {

  getAccessToken() {
    if(accessToken !== undefined) {
      return accessToken;
    } else {
      let url = window.location.href;
      let expiresIn = url.match(/expires_in=([^&]*)/);
      let newToken = url.match(/access_token=([^&]*)/);
      if (expiresIn !== null && newToken !== null) {
        accessToken = newToken[1];
        window.setTimeout(() => newToken = '', expiresIn[1] * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        const scope = 'user-read-private playlist-modify-public';
        const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=token`;
        window.location = redirectUrl;
      }

    }

  },

  search(term) {
    if (accessToken === undefined) {
      Spotify.getAccessToken();
    }

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        console.log(jsonResponse.tracks)
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },

  savePlaylist(playlistName, playlistTracks) {
    if(playlistName === undefined || playlistTracks.length === 0 ) {
      return;
    }

    let currentToken = accessToken;
    let headers = {
      Authorization: 'Bearer ' + accessToken
    }
    let userID;

    return fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }).then(response => response.json()
     ).then(jsonResponse => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
              name: playlistName
            })
      }).then(response => response.json()
      ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({
                uris: playlistTracks
              })
          });
        });
        });

  }

}

export default Spotify;
