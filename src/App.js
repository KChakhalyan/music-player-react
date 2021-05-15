import React, { useState } from 'react';
import LibraryComponent from './components/LibraryComponent';
import PlayerComponent from './components/PlayerComponent';
import SongComponent from './components/SongComponent';
import './styles/app.scss';
import data from './util';

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[1]);
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<div className="App">
			<SongComponent currentSong={currentSong} />
			<PlayerComponent
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				currentSong={currentSong}
			/>
			<LibraryComponent songs={songs} setCurrentSong={setCurrentSong} />
		</div>
	);
}

export default App;
