import logo from "./assets/logo.png";

function InfoPanel() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.85)",
        color: "#1a1a2e",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        borderRadius: "12px",
        zIndex: 1000,
        maxWidth: "500px",
        pointerEvents: "auto",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={logo}
          alt="Sea Patrol Logo"
          style={{
            width: "100%",
            maxWidth: "330px",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
      <p
        style={{
          margin: "0 0 15px 0",
          lineHeight: "1.6",
          fontSize: "15px",
          textAlign: "center",
          color: "#333",
        }}
      >
        Экспериментальный игровой проект, исследующий подходы к созданию
        браузерных многопользовательских игр. Фокус на реактивном стеке Spring
        Framework, веб-разработке с React Three Fiber, а также на конфигурации и
        координации ИИ-агентов для организации их совместной работы над сложными
        задачами.
      </p>
      <div
        style={{
          marginTop: "25px",
          paddingTop: "15px",
          borderTop: "2px solid #ddd",
          textAlign: "center",
        }}
      >
        <a
          href="https://github.com/sea-patrol"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1a5f7a",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            fontSize: "15px",
            padding: "10px 20px",
            border: "2px solid #1a5f7a",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#1a5f7a";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#1a5f7a";
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ verticalAlign: "middle" }}
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
}

export default InfoPanel;
