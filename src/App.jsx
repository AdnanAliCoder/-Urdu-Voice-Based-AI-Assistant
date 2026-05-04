import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="assistant-card" aria-label="Urdu Voice AI Assistant">
        <div className="scroll-track" aria-hidden="true">
          <span />
        </div>

        <h1>Urdu Voice AI Assistant</h1>
        <p className="subtitle">
          Speak in Urdu-the Assistant will listen and reply in urdu
        </p>

        <form className="assistant-form">
          <label htmlFor="api-key">OpenAI API Key</label>
          <input id="api-key" type="password" placeholder="sk-..." />

          <div className="actions" aria-label="Microphone controls">
            <button className="start-btn" type="button">
              Start Mic <span aria-hidden="true">🎙</span>
            </button>
            <button className="stop-btn" type="button">
              <span aria-hidden="true" className="stop-icon" /> Stop
            </button>
          </div>
        </form>

        <section className="listen-card">
          <div>
            <p className="listen-heading">
              You said <strong>listen:</strong>
            </p>
            <p className="english-line">Assalam-o-Alaikum</p>
          </div>
          <div className="urdu-lines">
            <p dir="rtl">السلام-و-علیکم! کریں اور مئین بولیں</p>
            <p>Assalam-o-Alaikum ...</p>
          </div>
        </section>

        <section className="response-card">
          <div className="wave" aria-hidden="true">
            {Array.from({ length: 42 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <h2>Assistant Response</h2>
          <p>assalam-o-alaikum ! microphone on karein aur urdu mein bolein</p>
        </section>

        <p className="status">
          <strong>Status:</strong> <span>Ready</span>
          <span className="signal" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
      </section>
    </main>
  )
}

export default App
