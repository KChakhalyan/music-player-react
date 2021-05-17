import React from 'react';
import LibrarySong from './LibrarySong';

const LibraryComponent = ({
	songs,
	setCurrentSong,
	currentSong,
	audioref,
	isPlaying,
	setSongs,
	libraryStatus,
}) => {
	return (
		<div className={`library ${libraryStatus ? 'active-library' : ''}`}>
			<h2>Library</h2>
			<div>
				{songs.map((song) => (
					<LibrarySong
						songs={songs}
						setCurrentSong={setCurrentSong}
						song={song}
						id={song.id}
						key={song.id}
						audioref={audioref}
						isPlaying={isPlaying}
						setSongs={setSongs}
						currentSong={currentSong}
					/>
				))}
			</div>
		</div>
	);
};

export default LibraryComponent;
