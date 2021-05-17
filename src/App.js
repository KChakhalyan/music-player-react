import React, { useState, useRef } from 'react';
import LibraryComponent from './components/LibraryComponent';
import PlayerComponent from './components/PlayerComponent';
import SongComponent from './components/SongComponent';
import './styles/app.scss';
import data from './util';

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[1]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	const audioRef = useRef(null);

	const timeUpdatehandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
		});
	};

	return (
		<div className="App">
			<SongComponent currentSong={currentSong} />
			<PlayerComponent
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				currentSong={currentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				audioRef={audioRef}
			/>
			<LibraryComponent
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
			/>
			<audio
				audioRef={audioRef}
				onLoadedMetadata={timeUpdatehandler}
				onTimeUpdate={timeUpdatehandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);
}

export default App;
