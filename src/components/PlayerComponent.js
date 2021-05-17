import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

function PlayerComponent({
	audioref,
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	songInfo,
	setSongInfo,
	songs,
}) {
	const playSongHandler = () => {
		if (isPlaying) {
			audioref.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioref.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const dragHandler = (e) => {
		audioref.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};
	const skipTrackHandler = (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === 'skip-back') {
			if ((currentIndex - 1) % songs.length === -1) {
				setCurrentSong(songs[songs.length - 1]);
				return;
			}
			setCurrentSong(songs[(currentIndex - 1) % songs.length]);
		}
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					type="range"
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className="skip-back"
					icon={faAngleLeft}
					size="2x"
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					icon={isPlaying ? faPause : faPlay}
					size="2x"
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-forward')}
					className="skip-forward"
					icon={faAngleRight}
					size="2x"
				/>
			</div>
		</div>
	);
}

export default PlayerComponent;
