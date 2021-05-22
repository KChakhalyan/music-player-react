import React, { useState, useRef } from 'react';
import LibraryComponent from './components/LibraryComponent';
import Nav from './components/Nav';
import PlayerComponent from './components/PlayerComponent';
import SongComponent from './components/SongComponent';
import './styles/app.scss';
import data from './data';

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[1]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);
	const audioRef = useRef(null);

	const timeUpdatehandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		// calculate Percentage
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animation = Math.round((roundedCurrent / roundedDuration) * 100);

		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			animationPercentage: animation,
		});
	};

	const songEndHanler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div className="App">
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<SongComponent currentSong={currentSong} />
			<PlayerComponent
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				audioref={audioRef}
				songs={songs}
				setSongs={setSongs}
			/>
			<LibraryComponent
				audioref={audioRef}
				songs={songs}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
			/>
			<audio
				audioref={audioRef}
				onLoadedMetadata={timeUpdatehandler}
				onTimeUpdate={timeUpdatehandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={songEndHanler}
			></audio>
		</div>
	);
}

export default App;
