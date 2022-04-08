import './App.css';

import { useEffect, useState } from 'react';

import List from './components/list/List';
import SearchBar from './components/search-bar/SearchBar';

const API_URL = 'https://itunes.apple.com/search?term=';

function isBlank(str) {
  return !str || str === '' || str.length === 0 || !str.trim();
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);

  function deriveAlbumNamesFromSongList(songList) {
    const albumList = songList
      .map((songObj) => songObj.collectionName)
      .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    const withoutDuplicates = [...new Set(albumList)];
    const topFiveAlbums = withoutDuplicates.splice(0, 5);
    return topFiveAlbums;
  }

  useEffect(() => {
    if (isBlank(searchTerm)) {
      setAlbums([]);
    } else {
      const encodedSearchTerm = encodeURI(`${API_URL}${searchTerm} `);
      fetch(encodedSearchTerm)
        .then((res) => res.json())
        .then((data) => deriveAlbumNamesFromSongList(data?.results || []))
        .then(setAlbums);
    }
  }, [searchTerm]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <SearchBar onSearch={setSearchTerm} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <List albums={albums} />
        </div>
      </div>
    </div>
  );
}

export default App;
