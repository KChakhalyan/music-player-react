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
	isPlaying,
	setIsPlaying,
	songInfo,
	setSongInfo,
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
	// State

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
				<FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					icon={isPlaying ? faPause : faPlay}
					size="2x"
				/>
				<FontAwesomeIcon
					className="skip-forward"
					icon={faAngleRight}
					size="2x"
				/>
			</div>
		</div>
	);
}

export default PlayerComponent;
