export interface VolumeControlProps {
  volume: number; // 0 -> 1
  onChangeVolume: (value: number) => void;
}
