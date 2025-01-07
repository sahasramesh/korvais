// src/pages/CreateKorvai.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Card from '@mui/joy/Card';
import Autocomplete from '@mui/joy/Autocomplete';
import Alert from '@mui/joy/Alert';
import { ragas } from '../data/ragas';

export default function CreateKorvai() {
  const navigate = useNavigate();
  const [letters, setLetters] = useState('');
  const [talam, setTalam] = useState('');
  const [ragam, setRagam] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const talamMap = new Map([
    ['adi', 16],
    ['khanda chapu', 10],
    ['misra', 14],
    ['rupakam', 12]
  ]);

  const validateKorvai = (text) => {
    const validChars = new Set(['s', 'r', 'g', 'm', 'p', 'd', 'n', ',', ' ']);
    return text.toLowerCase().split('').every(char => validChars.has(char));
  };

  const handleLettersChange = (e) => {
    const newValue = e.target.value;
    setLetters(newValue);
    setIsValid(validateKorvai(newValue));
  };

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    const numRows = Math.ceil(array.length / size);
    for (let i = 0; i < numRows; i++) {
      const newRow = Array.from({ length: size }, (_, index) => array[i * size + index] || '');
      chunkedArray.push(newRow);
    }
    return chunkedArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setError('Invalid characters in korvai pattern');
      return;
    }
    try {
      const emailUsername = auth.currentUser.email.split('@')[0]; 
      await addDoc(collection(db, 'korvais'), {
        letters,
        talam,
        ragam,
        description,
        userId: auth.currentUser.uid,
        authorName: emailUsername,
        createdAt: new Date(),
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create korvai');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-8">
      <Card className="w-full max-w-4xl p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            placeholder="Select Talam"
            value={talam}
            onChange={(_, value) => setTalam(value)}
            required
          >
            <Option value="adi">Adi</Option>
            <Option value="khanda chapu">Khanda Chapu</Option>
            <Option value="misra">Misra Chapu</Option>
            <Option value="rupakam">Rupakam</Option>
          </Select>

          <Autocomplete
            placeholder="Select Ragam"
            options={ragas}
            value={ragam}
            onChange={(_, newValue) => setRagam(newValue)}
            autoHighlight
            freeSolo
            required
          />

          <Textarea
            placeholder="Description"
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Textarea
            placeholder="Enter korvai pattern"
            minRows={5}
            value={letters}
            onChange={handleLettersChange}
            error={!isValid}
            required
          />

          {!isValid && (
            <Alert color="danger">
              Invalid characters
            </Alert>
          )}

          {error && (
            <Alert color="danger">
              {error}
            </Alert>
          )}

          {talam && letters && isValid && (
            <Card variant="outlined" className="p-4">
              <div className="hidden md:block overflow-auto" style={{ maxHeight: '240px' }}> {/* Adjust height as needed */}
                <div className="sticky top-0 bg-white"> {/* This will show the last 4 lines */}
                  {chunkArray(letters.replace(/\s/g, "").toUpperCase().split(''), talamMap.get(talam))
                    .slice(-4) // Take only the last 4 lines
                    .map((row, rowIndex) => (
                      <div key={rowIndex} className="flex">
                        {row.map((letter, columnIndex) => (
                          <div
                            key={columnIndex}
                            className="border border-none p-2 flex-1 font-swaram font-bold text-center"
                          >
                            {letter}
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className="block md:hidden overflow-auto" style={{ maxHeight: '240px' }}>
                <div className="sticky top-0 bg-white">
                  {chunkArray(letters.replace(/\s/g, "").toUpperCase().split(''), talamMap.get(talam) / 2)
                    .slice(-4)
                    .map((row, rowIndex) => (
                      <div key={rowIndex} className="flex">
                        {row.map((letter, columnIndex) => (
                          <div
                            key={columnIndex}
                            className="border border-none p-2 flex-1 font-swaram font-bold text-center"
                          >
                            {letter}
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="soft"
              color="neutral"
              fullWidth
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              disabled={!isValid}
            >
              Post Korvai
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
