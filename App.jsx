import { useRef, useState } from 'react'
import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

function App() {
  const recognitionRef = useRef(null)
  const [apiKey, setApiKey] = useState('')
  const [listening, setListening] = useState(false)
  const [status, setStatus] = useState('Ready')
  const [spokenText, setSpokenText] = useState('Assalam-o-Alaikum')
  const [urduText, setUrduText] = useState('السلام-و-علیکم! کریں اور مائک میں بولیں')
  const [reply, setReply] = useState(
    'assalam-o-alaikum ! microphone on karein aur urdu mein bolein',
  )

  const startMic = () => {
    if (!SpeechRecognition) {
      setStatus('Speech recognition not supported')
      setReply('Browser speech recognition support nahi kar raha')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ur-PK'
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onstart = () => {
      setListening(true)
      setStatus('Listening')
    }

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim()

      if (transcript) {
        setSpokenText(transcript)
        setUrduText(transcript)
        setReply(`${transcript} ...`)
      }
    }

    recognition.onerror = () => {
      setStatus('Mic error')
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
      setStatus('Ready')
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopMic = () => {
    recognitionRef.current?.stop()
    setListening(false)
    setStatus('Ready')
  }

  return (
    <main className="page-shell">
      <section className="assistant-panel" aria-label="Urdu Voice AI Assistant">
        <div className="panel-scrollbar" aria-hidden="true" />

        <h1>Urdu Voice AI Assistant</h1>
        <p className="subtitle">
          Speak in Urdu-the Assistant will listen and reply in urdu
        </p>

        <label className="api-label" htmlFor="api-key">
          OpenAI API Key
        </label>
        <input
          id="api-key"
          className="api-input"
          type="password"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          placeholder="sk-..."
        />

        <div className="controls">
          <button
            className="start-button"
            type="button"
            onClick={startMic}
            disabled={listening}
          >
            Start Mic <span aria-hidden="true">♬</span>
          </button>
          <button className="stop-button" type="button" onClick={stopMic}>
            <span className="stop-icon" aria-hidden="true" />
            Stop
          </button>
        </div>

        <div className="speech-card">
          <div className="speech-row">
            <p>
              You said <strong>listen:</strong>
            </p>
            <p className="urdu-line" lang="ur" dir="rtl">
              {urduText}
            </p>
          </div>
          <div className="speech-row second">
            <p>{spokenText}</p>
            <p className="translated-line">Assalam-o-Alaikum ...</p>
          </div>
        </div>

        <div className="response-card">
          <div className="wave" aria-hidden="true">
            {Array.from({ length: 42 }).map((_, index) => (
              <span key={index} style={{ '--i': index }} />
            ))}
          </div>
          <h2>Assistant Response</h2>
          <p>{reply}</p>
        </div>

        <p className="status-line">
          <strong>Status:</strong>{' '}
          <span className={listening ? 'status listening' : 'status'}>
            {status}
          </span>
          <span className="status-bars" aria-hidden="true">
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
