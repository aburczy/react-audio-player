import React, { useEffect, useRef } from "react";
import type { WaveformVisualizerProps } from "../../types/WaveformVisualizerProps";

interface AudioElementWithSource extends HTMLAudioElement {
  _mediaElementSource?: MediaElementAudioSourceNode;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  audioRef,
  isPlaying,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current as AudioElementWithSource | null;
    if (!audioEl) return;

    // Créer l'AudioContext une seule fois
    if (!audioContextRef.current) {
      const Ctx = window.AudioContext;
      audioContextRef.current = new Ctx();
    }
    const audioContext = audioContextRef.current;

    if (!audioEl._mediaElementSource) {
      audioEl._mediaElementSource =
        audioContext.createMediaElementSource(audioEl);
    }
    const sourceNode = audioEl._mediaElementSource;

    // Créer l'analyser une fois
    if (!analyserRef.current) {
      const analyser = audioContext!.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      // Connexions : source -> analyser -> destination
      sourceNode.connect(analyser);
      analyser.connect(audioContext!.destination);
    }

    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!canvas || !analyser || !dataArray) return;

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    let isCancelled = false;

    const draw = () => {
      if (isCancelled) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Adapter taille du canvas au conteneur
      canvas.width = width;
      canvas.height = height;

      analyser.getByteTimeDomainData(dataArray);

      // Fond
      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.fillStyle = "rgba(15, 20, 30, 0.95)";
      canvasCtx.fillRect(0, 0, width, height);

      // Ligne centrale
      canvasCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      canvasCtx.lineWidth = 1;
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, height / 2);
      canvasCtx.lineTo(width, height / 2);
      canvasCtx.stroke();

      // Onde
      canvasCtx.lineWidth = 2;
      const grad = canvasCtx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#ffca28");
      grad.addColorStop(0.5, "#ff6f61");
      grad.addColorStop(1, "#ff4081");
      canvasCtx.strokeStyle = grad;

      canvasCtx.beginPath();

      const sliceWidth = (width * 1.0) / dataArray.length;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0; // [0,255] -> ~[0,2]
        const y = (v * height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.stroke();

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      // On arrête juste l'animation, on ne touche pas au graphe audio
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isCancelled = true;
    };
  }, [audioRef]);

  // Quand on lance la lecture, il faut parfois "réveiller" l'AudioContext
  useEffect(() => {
    const audioContext = audioContextRef.current;
    if (isPlaying && audioContext && audioContext.state === "suspended") {
      audioContext.resume();
    }
  }, [isPlaying]);

  return (
    <div className="waveform-container">
      <canvas ref={canvasRef} className="waveform-canvas" />
    </div>
  );
};
