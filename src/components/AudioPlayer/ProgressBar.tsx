import type { ProgressBarProps } from "../../types/ProgressBarProps";
import { formatTime } from "../../utils/timeFormatter";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  return (
    <div className="progress-container">
      <span className="time-label">{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="progress-bar"
      />
      <span className="time-label">{formatTime(duration)}</span>
    </div>
  );
};
