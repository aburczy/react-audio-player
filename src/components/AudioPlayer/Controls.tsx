import type { ControlsProps } from "../../types/ControlsProps";

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onRestart,
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

      <button
        onClick={onRestart}
        disabled={disabled}
        className="control-button control-button--secondary"
      >
        Restart ↺
      </button>
    </div>
  );
};
