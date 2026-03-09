/**
 * Экран загрузки с индикатором прогресса
 * @param {{ progress: number, loadedCount: number, total: number, loaded: boolean }} props
 */
function LoadingScreen({ progress, loadedCount, total, loaded }) {
  return (
    <div className={`loading-screen ${loaded ? "hidden" : ""}`}>
      <div className="loading-content">
        <div className="loading-subtitle">Загрузка ресурсов...</div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="loading-stats">
          {loadedCount} из {total} загружено
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
