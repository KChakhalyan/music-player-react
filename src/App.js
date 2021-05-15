import React, { useState } from 'react';
import PlayerComponent from './components/PlayerComponent';
import SongComponent from './components/SongComponent';
import './styles/app.scss';
import data from './util';

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[1]);
	return (
		<div className="App">
			<SongComponent currentSong={currentSong} />
			<PlayerComponent />
		</div>
	);
}

export default App;
