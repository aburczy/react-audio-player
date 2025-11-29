import React from "react";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";
import { FileUploader } from "./FileUploader";

export const AudioPlayerContainer: React.FC = () => {
  const {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    audioRef,
    loadFile,
    togglePlay,
    seek,
    audioEvents,
  } = useAudioPlayer();

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} src={currentSong || undefined} {...audioEvents} />
      <FileUploader onFileSelect={loadFile} />
      {currentSong && (
        <>
          <Controls
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            disabled={false}
          />
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />
        </>
      )}
    </div>
  );
};
