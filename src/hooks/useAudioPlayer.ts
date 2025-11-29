import { useState, useRef } from "react";

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setCurrentSong(url);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const changeVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.currentTime = 0;
    audio.play();
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  };

  const onEnded = () => setIsPlaying(false);

  return {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    audioRef,
    volume,
    changeVolume,
    loadFile,
    togglePlay,
    seek,
    restart,
    stop,
    audioEvents: {
      onTimeUpdate,
      onLoadedMetadata,
      onEnded,
    },
  };
};
