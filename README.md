# Стартовая страница Sea Patrol

Страница проекта Sea Patrol (морской MMO RPG игры)

## Что внутри

- **React** — библиотека для создания интерфейса
- **Vite** — быстрый сборщик проекта
- **Three.js + React Three Fiber** — 3D-графика в браузере

## Быстрый старт

### 1. Установите Node.js

Скачайте с [nodejs.org](https://nodejs.org/) (версия 18 или новее).

### 2. Установите зависимости

```bash
npm install
```

### 3. Запустите проект

```bash
npm run dev
```

Откройте ссылку из терминала (обычно `http://localhost:5173`).

## Доступные команды

| Команда | Описание |
|---------|----------|
| `npm install` | Установить все зависимости |
| `npm run dev` | Запустить сервер разработки |
| `npm run build` | Собрать проект для продакшена |
| `npm run preview` | Посмотреть продакшен-сборку локально |
| `npm test` | Запустить тесты |
| `npm run lint` | Проверить код на ошибки |

## Используемые пакеты

### Основные

```bash
# React и ReactDOM
npm install react react-dom

# Vite и плагин для React
npm install -D vite @vitejs/plugin-react

# Three.js и React Three Fiber
npm install three @react-three/fiber @react-three/drei
```

### Для тестирования

```bash
# Vitest и Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Тестирование 3D-сцен
npm install -D @react-three/test-renderer

# Полифилл для ResizeObserver (нужен для тестов)
npm install -D @juggle/resize-observer
```

### Для линтинга

```bash
npm install -D eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

## Структура проекта

```
sea_patrol_start_page/
├── public/              # Статические файлы (картинки)
│   ├── sea.png          # Фон моря
│   └── ship.png         # Изображение корабля
├── src/
│   ├── App.jsx          # Главный компонент
│   ├── SeaPlane.jsx     # Компонент моря
│   ├── Ship.jsx         # Компонент корабля
│   ├── main.jsx         # Точка входа
│   └── index.css        # Стили
├── index.html           # HTML-шаблон
└── package.json         # Зависимости и скрипты
```

## Как это работает

1. **SeaPlane** — плоскость с текстурой моря на заднем плане (z: -10)
2. **Ship** — плоскость с кораблём на переднем плане (z: -5)

Корабль перекрывает море, создавая эффект плавания по волнам.

## Разработка

Проект использует **ES Modules** — все импорты/экспорты через `import`/`export`.

Компоненты пишутся на **JSX** — JavaScript с HTML-подобным синтаксисом.

```jsx
// Пример компонента
function MyComponent() {
  return <div>Привет!</div>
}

export default MyComponent
```
