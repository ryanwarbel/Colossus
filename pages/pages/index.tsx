// Colossus Core Console v1
// Frontend (React + Tailwind) - Vercel Ready

import React, { useState } from 'react';

export default function ColossusConsole() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCommand = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const response = await fetch('/api/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: input }),
    });
    const data = await response.json();
    setHistory([...history, { input, output: data.result }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Colossus Core Console</h1>
      <div>
        {history.map((entry, idx) => (
          <div key={idx} style={{ marginBottom: '1rem', border: '1px solid #444', padding: '1rem' }}>
            <p><strong>&gt;</strong> {entry.input}</p>
            <p style={{ color: '#00ff99' }}>{entry.output}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          style={{ flexGrow: 1, backgroundColor: '#222', color: '#fff', padding: '0.5rem', borderRadius: '4px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
        />
        <button
          onClick={handleCommand}
          disabled={loading}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#00ff99', color: '#000', borderRadius: '4px' }}
        >
          {loading ? 'Running...' : 'Execute'}
        </button>
      </div>
    </div>
  );
}
