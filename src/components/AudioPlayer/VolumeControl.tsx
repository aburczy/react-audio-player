import React from "react";
import type { VolumeControlProps } from "../../types/VolumeControlProps";

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onChangeVolume,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = Number(e.target.value); // 0 -> 100
    const newVolume = percent / 100;
    onChangeVolume(newVolume);
  };

  const percentDisplay = Math.round(volume * 100);

  return (
    <div className="volume-container">
      <span className="volume-icon">
        {volume === 0 ? "🔇" : volume < 0.5 ? "🔈" : "🔊"}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={percentDisplay}
        onChange={handleChange}
        className="volume-slider"
        aria-label="Volume"
      />
      <span className="volume-value">{percentDisplay}%</span>
    </div>
  );
};
