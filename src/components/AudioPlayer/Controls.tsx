import type { ControlsProps } from "../../types/ControlsProps";

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onTogglePlay,
  disabled,
}) => {
  const styles: { [key: string]: React.CSSProperties } = {
    button: {
      padding: "10px 20px",
    },
  };

  return (
    <button onClick={onTogglePlay} disabled={disabled} style={styles.button}>
      {isPlaying ? "Pause ⏸" : "Lecture ▶"}
    </button>
  );
};
