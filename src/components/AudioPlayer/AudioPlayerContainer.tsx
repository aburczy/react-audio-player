import React from "react";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";
import { FileUploader } from "./FileUploader";
import { WaveformVisualizer } from "./WaveformVisualizer";
import { VolumeControl } from "./VolumeControl";

export const AudioPlayerContainer: React.FC = () => {
  const {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    audioRef,
    volume,
    loadFile,
    togglePlay,
    seek,
    restart,
    changeVolume,
    audioEvents,
  } = useAudioPlayer();

  const controlsDisabled = !currentSong;

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} src={currentSong || undefined} {...audioEvents} />

      <FileUploader onFileSelect={loadFile} />

      {currentSong && (
        <>
          <WaveformVisualizer audioRef={audioRef} isPlaying={isPlaying} />

          <Controls
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onRestart={restart}
            disabled={controlsDisabled}
          />

          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />

          <VolumeControl volume={volume} onChangeVolume={changeVolume} />
        </>
      )}
    </div>
  );
};
