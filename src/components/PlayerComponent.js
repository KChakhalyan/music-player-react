import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

const PlayerComponent = ({
	audioref,
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	songInfo,
	setSongInfo,
	songs,
	setSongs,
}) => {
	const activeLibraryhandler = (nextPrev) => {
		const newSongs = songs.map((song) => {
			if (song.id === nextPrev.id) {
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
	};

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
	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryhandler(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === 'skip-back') {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryhandler(songs[songs.length - 1]);
				if (isPlaying) audioref.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activeLibraryhandler(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioref.current.play();
	};
	// Add the styles
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
						onChange={dragHandler}
					/>
					<div style={trackAnim} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
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
};

export default PlayerComponent;
