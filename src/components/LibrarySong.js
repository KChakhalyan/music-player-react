import React from 'react';

function LibrarySong({ id, songs, song, setCurrentSong, audioRef, isPlaying }) {
	const songSelectHandler = () => {
		const selectedSong = songs.filter((state) => state.id === id);
		setCurrentSong(selectedSong[0]);
		if (isPlaying) {
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.then((audio) => {
					audioRef.current.play();
				});
			}
		}
	};
	return (
		<div onClick={songSelectHandler} className="library-song">
			<img src={song.cover} alt={song.name} />
			<div className="song-desc">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
}

export default LibrarySong;
