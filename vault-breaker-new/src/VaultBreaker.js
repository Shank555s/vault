// VaultBreaker.jsx
import React, { useState, useEffect } from 'react';
import './VaultBreaker.css';

const caesarQuestions = [
  { encrypted: 'Fyyfhpx', answer: 'Attacks' },
  { encrypted: 'Gwjfpnsl', answer: 'Breaking' },
  { encrypted: 'Wnhmjxy', answer: 'Richest' },
  { encrypted: 'Ymwnaj', answer: 'Thrive' },
  { encrypted: 'Gzwlqfw', answer: 'Burglar' },
  { encrypted: 'Anxzfqx', answer: 'Visuals' },
];

const atbashQuestions = [
  { encrypted: 'Nlmvb svrhg', answer: 'Money heist' },
  { encrypted: 'Tizmw gsvug', answer: 'Grand theft' },
  { encrypted: 'Nlmvb hgzhs', answer: 'Money stash' },
  { encrypted: 'Tlow hsrmv', answer: 'Gold shine' },
  { encrypted: 'Nlmvb oliw', answer: 'Money lord' },
  { encrypted: 'Srts wloozi', answer: 'High dollar' },
];

const VaultBreaker = () => {
  const [stage, setStage] = useState(1);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);
  const [hintUsed, setHintUsed] = useState(false);
  const [usedCaesarIndexes, setUsedCaesarIndexes] = useState([]);
  const [usedAtbashIndexes, setUsedAtbashIndexes] = useState([]);
  const [currentCaesar, setCurrentCaesar] = useState(null);
  const [currentAtbash, setCurrentAtbash] = useState(null);
  const [finalCode, setFinalCode] = useState('');
  const [codes, setCodes] = useState([]);
  const [gameCount, setGameCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (stage !== 5 && stage !== 6 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, stage]);

  // 🛑 End game if time runs out
  useEffect(() => {
    if (timeLeft <= 0 && stage !== 5 && stage !== 6) {
      setStage(6);
      setMessage('Time is up! Game Over.');
    }
  }, [timeLeft, stage]);

  useEffect(() => {
    if (stage === 1) {
      let index;
      do {
        index = Math.floor(Math.random() * caesarQuestions.length);
      } while (usedCaesarIndexes.includes(index));
      setCurrentCaesar(caesarQuestions[index]);
      setUsedCaesarIndexes(prev => [...prev, index]);
    } else if (stage === 2) {
      let index;
      do {
        index = Math.floor(Math.random() * atbashQuestions.length);
      } while (usedAtbashIndexes.includes(index));
      setCurrentAtbash(atbashQuestions[index]);
      setUsedAtbashIndexes(prev => [...prev, index]);
    } else if (stage === 3) {
      const code = (Math.floor(1000 + Math.random() * 9000)).toString();
      setFinalCode(code);
      setMessage(`Remember this code: ${code}`);
    }
  }, [stage]);

  const handleSubmit = () => {
    if (stage === 1 && input.trim().toLowerCase() === currentCaesar.answer.toLowerCase()) {
      setStage(2);
      setInput('');
      setHintUsed(false);
      setMessage('');
    } else if (stage === 2 && input.trim().toLowerCase() === currentAtbash.answer.toLowerCase()) {
      setStage(3);
      setInput('');
      setHintUsed(false);
      setMessage('');
    } else if (stage === 3 && input.trim() === finalCode) {
      setCodes(prev => [...prev, finalCode]);
      if (gameCount === 0) {
        setGameCount(1);
        setStage(1);
        setInput('');
        setHintUsed(false);
        setMessage('');
      } else {
        setStage(4);
        setInput('');
        setHintUsed(false);
        setMessage('');
      }
    } else if (stage === 4 && input.trim() === codes.join('-')) {
      setStage(5);
      setMessage('Vault opened successfully!');
    } else {
      setMessage('Incorrect code. Try again.');
      setTimeLeft(t => Math.max(t - 10, 0));
    }
  };

  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      setTimeLeft(t => Math.max(t - 30, 0));
    }
  };

  const getClue = () => {
    if (stage === 1) return 'Clue: The vault hums: Step back 5 times to unlock the door.';
    if (stage === 2) return 'Clue: Mirror, mirror on the wall... find what’s reflected in the opposite.';
    return '';
  };

  const getHint = () => {
    if (!hintUsed) return null;
    if (stage === 1) return 'Hint: Each letter hides behind a simple shift. Use the provided number.';
    if (stage === 2) return 'Hint: To unlock this, look at the alphabet backward. What you see at the beginning, lies at the end.';
    return null;
  };

  return (
    <div className="vault-container">
      <div className="rules-box">
        <strong>Rules:</strong>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Incorrect submission - 10s penalty</li>
          <li>Using a hint - 30s penalty</li>
        </ul>
      </div>

      <h1 className="vault-title">Vault Breaker</h1>

      {stage !== 5 && stage !== 6 && (
        <div className={`timer ${timeLeft <= 100 ? 'low-time' : ''}`}>
          Time Left: {timeLeft}s
        </div>
      )}

      {(stage >= 1 && stage <= 4) && (
        <div className="vault-card">
          <p className="vault-subtitle">
            {stage === 1 && 'Stage 1: Caesar Cipher'}
            {stage === 2 && 'Stage 2: Atbash Cipher'}
            {stage === 3 && 'Stage 3: Final Code'}
            {stage === 4 && 'Stage 4: Final Vault'}
          </p>

          <p className="vault-question">
            {stage === 1 && currentCaesar?.encrypted}
            {stage === 2 && currentAtbash?.encrypted}
            {stage === 3 && 'Enter the 4-digit code shown earlier'}
            {stage === 4 && 'Enter both codes in format: XXXX-YYYY'}
          </p>

          <p className="vault-clue">{getClue()}</p>

          <input
            className="vault-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter code"
          />

          <button className="vault-button" onClick={handleSubmit}>Submit</button>

          {message && <p className="hint-message">{message}</p>}
        </div>
      )}

      {stage !== 3 && stage !== 4 && stage !== 5 && stage !== 6 && (
        <div className="hint-container">
          <button className="hint-button" onClick={handleHint}>Get Hint</button>
          {getHint() && <p className="hint-message">{getHint()}</p>}
        </div>
      )}

      {stage === 3 && message && <p className="vault-clue">{message}</p>}
      {stage === 5 && <h2 className="vault-subtitle">Vault Unlocked! 🎉</h2>}
      {stage === 6 && (
        <div className="vault-card">
          <h2 className="vault-subtitle">⏱️ Time's Up!</h2>
          <p className="vault-clue">{message}</p>
        </div>
      )}
    </div>
  );
};

export default VaultBreaker;
