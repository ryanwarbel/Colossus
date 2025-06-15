import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { command } = req.body;

  if (!command || typeof command !== 'string') {
    return res.status(400).json({ error: 'Invalid command input' });
  }

  // Replace with real logic later
  const reply = `You said: "${command}". Colossus is still booting up.`;

  res.status(200).json({ reply });
}
