import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

/* ── Error Boundary — shows crash message instead of blue/white screen ── */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(err) { return { error: err } }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          background: '#000', color: '#fff',
          fontFamily: 'monospace', padding: 40,
          minHeight: '100vh', boxSizing: 'border-box',
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💀 CRASH</div>
          <div style={{ color: '#E52521', fontSize: 14, marginBottom: 12 }}>
            {this.state.error.message}
          </div>
          <pre style={{
            color: '#aaa', fontSize: 11, whiteSpace: 'pre-wrap',
            maxWidth: 800, lineHeight: 1.6,
          }}>
            {this.state.error.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 24, padding: '10px 24px',
              background: '#E52521', color: '#fff',
              border: '3px solid #fff', fontSize: 12,
              cursor: 'pointer', fontFamily: 'monospace',
            }}
          >
            ↺ RELOAD
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

/* ── Lazy-load App so module errors are caught ── */
async function mount() {
  try {
    const { default: App } = await import('./App.jsx')
    ReactDOM.createRoot(document.getElementById('root')).render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    )
  } catch (err) {
    /* Module-level crash — show it directly in the DOM */
    document.getElementById('root').innerHTML = `
      <div style="background:#000;color:#fff;font-family:monospace;padding:40px;min-height:100vh">
        <div style="font-size:40px;margin-bottom:16px">💀 MODULE CRASH</div>
        <div style="color:#E52521;font-size:14px;margin-bottom:12px">${err.message}</div>
        <pre style="color:#aaa;font-size:11px;white-space:pre-wrap;max-width:800px;line-height:1.6">${err.stack}</pre>
        <button onclick="location.reload()" style="margin-top:24px;padding:10px 24px;background:#E52521;color:#fff;border:3px solid #fff;font-size:12px;cursor:pointer">
          ↺ RELOAD
        </button>
      </div>
    `
  }
}

mount()