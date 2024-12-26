// ingredients-agent/cli/src/App.jsx
import React, { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Fetch from your FastAPI root endpoint (adjust URL/port as needed)
    fetch('http://localhost:8080/')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response is { "message": "Hello from FastAPI!" }
        setMessage(data.message)
      })
      .catch((err) => {
        console.error('Error fetching message:', err)
      })
  }, [])

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h1>FastAPI + React Starter</h1>
      {message ? (
        <p>Server says: <strong>{message}</strong></p>
      ) : (
        <p>Loading message from server...</p>
      )}
    </div>
  )
}

export default App
