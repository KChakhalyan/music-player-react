import React from 'react';

function LibrarySong({
	id,
	songs,
	song,
	currentSong,
	setCurrentSong,
	audioref,
	isPlaying,
	setSongs,
}) {
	const songSelectHandler = async () => {
		const selectedSong = songs.filter((state) => state.id === id);
		await setCurrentSong(selectedSong[0]);
		// Add active State
		const newSongs = songs.map((song) => {
			if (song.id === id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);

		if (isPlaying) audioref.current.play();
	};
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? 'selected' : ''}`}
		>
			<img src={song.cover} alt={song.name} />
			<div className="song-desc">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
}

export default LibrarySong;
