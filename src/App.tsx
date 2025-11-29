import { AudioPlayerContainer } from "./components/AudioPlayer/AudioPlayerContainer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="player-card">
        <header className="player-header">
          <h1 className="player-title">Audio Player</h1>
          <p className="player-subtitle">
            Sélectionne un fichier audio et contrôle la lecture.
          </p>
        </header>

        <AudioPlayerContainer />
      </div>
    </div>
  );
}

export default App;
