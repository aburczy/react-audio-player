import type { ControlsProps } from "../../types/ControlsProps";

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onTogglePlay,
  disabled,
}) => {
  return (
    <div className="controls">
      <button
        onClick={onTogglePlay}
        disabled={disabled}
        className="control-button"
      >
        {isPlaying ? "Pause ⏸" : "Lecture ▶"}
      </button>
    </div>
  );
};
