import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setOutput(data.result || 'No response.');
    } catch (err) {
      setOutput('Error contacting Colossus.');
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Colossus Core Console</h1>
      <div style={{ marginTop: '2rem' }}>
        <div style={{ background: '#111', padding: '1rem', borderRadius: '5px' }}>
          <p>&gt; {output || 'Awaiting command...'}</p>
        </div>
        <input
          style={{ marginTop: '1rem', width: '80%', padding: '0.5rem' }}
          type="text"
          placeholder="Enter command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleExecute}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'limegreen',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '4px'
          }}
        >
          {loading ? 'Running...' : 'Execute'}
        </button>
      </div>
    </div>
  );
}
