// pages/api/command.ts

export default function handler(req, res) {
  res.status(200).json({ output: 'The backend is connected and working!' });
}
