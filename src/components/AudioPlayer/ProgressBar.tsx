import type { ProgressBarProps } from "../../types/ProgressBarProps";
import { formatTime } from "../../utils/timeFormatter";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const styles: { [key: string]: React.CSSProperties } = {
    progressContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      gap: "10px",
    },
    progressBar: { flex: 1, cursor: "pointer" },
  };

  return (
    <div style={styles.progressContainer}>
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        style={styles.progressBar}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};
