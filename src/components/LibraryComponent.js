import React from 'react';
import LibrarySong from './LibrarySong';

const LibraryComponent = ({ songs, setCurrentSong, audioRef, isPlaying }) => {
	return (
		<div className="library">
			<h2>Library</h2>
			<div>
				{songs.map((song) => (
					<LibrarySong
						songs={songs}
						setCurrentSong={setCurrentSong}
						song={song}
						id={song.id}
						key={song.id}
						audioRef={audioRef}
						isPlaying={isPlaying}
					/>
				))}
			</div>
		</div>
	);
};

export default LibraryComponent;
