import React, { useState, useEffect } from 'react';
import './VaultBreaker.css';

// Example sentences with encrypted words
const sentences = [
    {
      encrypted: [
        { encrypted: 'Unwfyjx', answer: 'Pirates' },
        { encrypted: 'wfniji', answer: 'raided' },
        { encrypted: 'xmnux', answer: 'ships' },
        { encrypted: 'sjfw', answer: 'near' },
        { encrypted: 'Hzgf', answer: 'Cuba' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Xrzllqjwx', answer: 'Smugglers' },
        { encrypted: 'hwtxxji', answer: 'crossed' },
        { encrypted: 'gtwijwx', answer: 'borders' },
        { encrypted: 'bnym', answer: 'with' },
        { encrypted: 'ltqi', answer: 'gold' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Ymnjajx', answer: 'Thieves' },
        { encrypted: 'jxhfuji', answer: 'escaped' },
        { encrypted: 'ymwtzlm', answer: 'through' },
        { encrypted: 'xjhwjy', answer: 'secret' },
        { encrypted: 'yzssjq', answer: 'tunnel' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Ijyjhynajx', answer: 'Detectives' },
        { encrypted: 'zshtajwji', answer: 'uncovered' },
        { encrypted: 'xytqjs', answer: 'stolen' },
        { encrypted: 'fwy', answer: 'art' },
        { encrypted: 'unjhjx', answer: 'pieces' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Mjnxy', answer: 'Heist' },
        { encrypted: 'thhzwji', answer: 'occurred' },
        { encrypted: 'izwnsl', answer: 'during' },
        { encrypted: 'wtdfq', answer: 'royal' },
        { encrypted: 'gfsvzjy', answer: 'banquet' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Uwnxtsjw', answer: 'Prisoner' },
        { encrypted: 'jxhfuji', answer: 'escaped' },
        { encrypted: 'zxnsl', answer: 'using' },
        { encrypted: 'mniijs', answer: 'hidden' },
        { encrypted: 'pjd', answer: 'key' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'afzqy', answer: 'Vault' },
        { encrypted: 'gwjfhmji', answer: 'breached' },
        { encrypted: 'zsijw', answer: 'under' },
        { encrypted: 'mjfad', answer: 'heavy' },
        { encrypted: 'xytwr', answer: 'storm' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Hzwxji', answer: 'Cursed' },
        { encrypted: 'htns', answer: 'coin' },
        { encrypted: 'ywnlljwji', answer: 'triggered' },
        { encrypted: 'ijfiqd', answer: 'deadly' },
        { encrypted: 'hzwxj', answer: 'curse' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Tzyqfbx', answer: 'Outlaws' },
        { encrypted: 'mfi', answer: 'had' },
        { encrypted: 'lfymjwji', answer: 'gathered' },
        { encrypted: 'fy', answer: 'at' },
        { encrypted: 'rnisnlmy', answer: 'midnight' },
      ]
    },
    {
      encrypted: [
        { encrypted: 'Xud', answer: 'Spy' },
        { encrypted: 'ijhtiji', answer: 'decoded' },
        { encrypted: 'rjxxflj', answer: 'message' },
        { encrypted: 'kwtr', answer: 'from' },
        { encrypted: 'jsjrd', answer: 'enemy' },
      ]
    },
  ];

const atbashMapping = {
  kozgrmfn: 'Platinum',
  tlow: 'Gold',
  wrznlmw: 'Diamond',
  yilmav: 'Bronze',
  hroevi: 'Silver',
};

// Correct order for Stage 2
const stage2CorrectOrder = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];

// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to assign random numbers between 1 and 9 to words
function assignRandomNumbers(words) {
  const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffledNumbers = shuffleArray(availableNumbers);

  return words.map((word, index) => ({
    ...word,
    number: shuffledNumbers[index],
  }));
}

const VaultBreaker = () => {
  const [level, setLevel] = useState(1);
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');
  const [shuffledSentence, setShuffledSentence] = useState([]);
  const [decryptedWords, setDecryptedWords] = useState({});
  const [originalSentence, setOriginalSentence] = useState([]);
  const [stage2Items, setStage2Items] = useState([]);
  const [stage2Decrypted, setStage2Decrypted] = useState({});
  const [isVaultOpened, setIsVaultOpened] = useState(false); // Correct placement of useState

  useEffect(() => {
    if (level === 1) {
      const selectedSentence = sentences[Math.floor(Math.random() * sentences.length)].encrypted;
      const assignedNumbers = assignRandomNumbers(selectedSentence);
      setOriginalSentence(assignedNumbers); // Ensure `originalSentence` has `number` properties
      const shuffled = shuffleArray(assignedNumbers);
      setShuffledSentence(shuffled);
      setDecryptedWords(
        shuffled.reduce((acc, item) => ({ ...acc, [item.number]: '' }), {})
      );
      setInputCode('');
    }

    if (level === 2) {
      const stage2Keys = Object.keys(atbashMapping).map((key) => ({
        encrypted: key,
        answer: atbashMapping[key],
      }));
      const shuffledStage2 = assignRandomNumbers(stage2Keys); // Assign shuffled numbers
      setStage2Items(shuffledStage2);
      setStage2Decrypted(
        shuffledStage2.reduce((acc, item) => ({ ...acc, [item.number]: '' }), {})
      );
      console.log('Stage 2 Items:', shuffledStage2); // Debugging log
      setInputCode('');
    }
  }, [level]);

  console.log('Original Sentence (with numbers):', originalSentence);
  console.log('Shuffled Sentence:', shuffledSentence);

  const handleSubmitStage1 = () => {
    console.log('Decrypted words:', decryptedWords);
    console.log('Original sentence before sorting:', originalSentence);

    const correctDecryption = originalSentence.every((item) => {
      const decryptedWord = decryptedWords[item.number]?.trim().toLowerCase(); // Convert to lowercase
      const correctAnswer = item.answer.toLowerCase(); // Convert to lowercase
      console.log(
        `Checking decrypted word for #${item.number}: '${decryptedWord}' === '${correctAnswer}'`
      );
      return decryptedWord === correctAnswer; // Case-insensitive comparison
    });

    if (!correctDecryption) {
      setMessage('One or more decrypted words are incorrect.');
      return;
    }

    const correctCode = originalSentence.map((item) => item.number).join('');
    const userCode = inputCode.trim();

    console.log(`User code: '${userCode}', Correct code: '${correctCode}'`);

    if (userCode === correctCode) {
      setMessage('Correct! Proceeding to Stage 2.');
      setLevel(2);
    } else {
      setMessage('Incorrect order. Try again.');
    }
  };

  const handleSubmitStage2 = () => {
    const correctDecryption = stage2Items.every((item) => {
      const decryptedWord = stage2Decrypted[item.number]?.trim().toLowerCase(); // Ensure trimming and lowercase
      const correctAnswer = item.answer.toLowerCase(); // Convert to lowercase for comparison
      console.log(
        `Checking decrypted word for #${item.number}: '${decryptedWord}' === '${correctAnswer}'`
      );
      return decryptedWord === correctAnswer;
    });
  
    if (!correctDecryption) {
      setMessage('One or more decrypted words are incorrect.');
      return;
    }
  
    // Sort the items according to the correct order and map to numbers
    const correctCode = stage2Items
      .sort((a, b) => stage2CorrectOrder.indexOf(a.answer) - stage2CorrectOrder.indexOf(b.answer))
      .map((item) => item.number)
      .join('');
  
    const userCode = inputCode.trim();
  
    console.log(`User code: '${userCode}', Correct code: '${correctCode}'`);
  
    if (userCode === correctCode) {
      setMessage('Vault Opened! Congratulations!');
      setIsVaultOpened(true); // Show the pop-up when the vault is opened
    } else {
      setMessage('Incorrect order. Try again.');
    }
  };
  

  const handleDecryptionChange = (number, value) => {
    if (level === 1) {
      setDecryptedWords((prev) => ({
        ...prev,
        [number]: value,
      }));
    } else if (level === 2) {
      setStage2Decrypted((prev) => ({
        ...prev,
        [number]: value,
      }));
    }
  };

  return (
    <div className="vault-container">
      <h1 className="vault-title">Vault Breaker</h1>

      {level === 1 && (
        <div className="vault-card">
          <p className="vault-subtitle">Level 1: The vault hums: Step back 5 times to unlock the door</p>
          <ul>
            {shuffledSentence.map((q, i) => (
              <li key={i}>
                <strong>{q.encrypted}</strong> (#{q.number})<br />
                <input
                  type="text"
                  className="vault-input"
                  placeholder="Decrypted word"
                  value={decryptedWords[q.number] || ''}
                  onChange={(e) => handleDecryptionChange(q.number, e.target.value)}
                />
              </li>
            ))}
          </ul>
          <input
            className="vault-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter correct number order (e.g. 51342)"
          />
          <button className="vault-button" onClick={handleSubmitStage1}>
            Submit
          </button>
          {message && <p className="hint-message">{message}</p>}
        </div>
      )}

      {level === 2 && (
        <div className="vault-card">
          <p className="vault-subtitle">Level 2: Mirror, mirror on the wall... find what’s reflected in the opposite</p>
          <ul>
            {stage2Items.map((q, i) => (
              <li key={i}>
                <strong>{q.encrypted}</strong> (#{q.number})<br />
                <input
                  type="text"
                  className="vault-input"
                  placeholder="Decrypted word"
                  value={stage2Decrypted[q.number] || ''}
                  onChange={(e) => handleDecryptionChange(q.number, e.target.value)}
                />
              </li>
            ))}
          </ul>
          <input
            className="vault-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter correct number order (e.g. 51342)"
          />
          <button className="vault-button" onClick={handleSubmitStage2}>
            Submit
          </button>
          {message && <p className="hint-message">{message}</p>}
        </div>
      )}

      {isVaultOpened && (
        <div className="vault-popup">
          <div className="vault-popup-content">
            <h2>Vault Opened! 🎉</h2>
            <p>Congratulations! You've successfully cracked the code!</p>
            <button onClick={() => setIsVaultOpened(false)} className="vault-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultBreaker;
