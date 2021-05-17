import React from 'react';
import LibrarySong from './LibrarySong';

const LibraryComponent = ({
	songs,
	setCurrentSong,
	audioref,
	isPlaying,
	setSongs,
}) => {
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
						audioref={audioref}
						isPlaying={isPlaying}
						setSongs={setSongs}
					/>
				))}
			</div>
		</div>
	);
};

export default LibraryComponent;
