import type { ProgressBarProps } from "../../types/ProgressBarProps";
import { formatTime } from "../../utils/timeFormatter";
import { useCallback, useRef } from "react";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const barRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current || duration === 0) return;

      const rect = barRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      const newTime = percent * duration;

      onSeek(newTime);
    },
    [duration, onSeek]
  );

  const percentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="progress-container">
      <span className="time-label">{formatTime(currentTime)}</span>

      <div ref={barRef} className="progress-wrapper" onClick={handleClick}>
        <div className="progress-filled" style={{ width: `${percentage}%` }} />
      </div>

      <span className="time-label">{formatTime(duration)}</span>
    </div>
  );
};
