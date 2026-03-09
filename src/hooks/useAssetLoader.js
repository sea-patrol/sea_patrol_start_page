import { TextureLoader } from "three";
import { useState, useEffect } from "react";

// Пути к текстурам для предзагрузки
const TEXTURE_PATHS = {
  sea: "/assets/sea.png",
  ship: "/assets/ship.png",
  wave1: "/assets/wave1.png",
  wave2: "/assets/wave2.png",
  wave3: "/assets/wave3.png",
  wave4: "/assets/wave4.png",
  logo: "/assets/logo.png",
};

/**
 * Хук для предзагрузки текстур с отслеживанием прогресса
 * @returns {{ loaded: boolean, progress: number, total: number, textures: Object }}
 */
export function useAssetLoader() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [textures, setTextures] = useState(null);

  const total = Object.keys(TEXTURE_PATHS).length;

  useEffect(() => {
    let isMounted = true;
    const loadedTextures = {};
    let currentLoaded = 0;

    // Функция обратного вызова для отслеживания прогресса
    const onProgress = () => {
      if (isMounted) {
        currentLoaded++;
        setLoadedCount(currentLoaded);
      }
    };

    // Загружаем все текстуры параллельно
    const loadPromises = Object.entries(TEXTURE_PATHS).map(
      ([key, path]) =>
        new Promise((resolve) => {
          const texture = new TextureLoader().load(
            path,
            () => {
              // onLoad callback
              loadedTextures[key] = texture;
              onProgress();
              resolve(texture);
            },
            undefined, // onProgress (для TextureLoader не всегда доступен)
            () => {
              // onError callback - всё равно продолжаем
              loadedTextures[key] = null;
              onProgress();
              resolve(null);
            }
          );
        })
    );

    Promise.all(loadPromises).then(() => {
      if (isMounted) {
        setTextures(loadedTextures);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const loaded = loadedCount >= total;
  const progress = Math.round((loadedCount / total) * 100);

  return { loaded, progress, total, loadedCount, textures };
}

export default useAssetLoader;
