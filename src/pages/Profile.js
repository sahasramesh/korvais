// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Korvai from '../components/Korvai';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';

export default function Profile() {
  const [korvais, setKorvais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserKorvais = async () => {
      try {
        const q = query(
          collection(db, 'korvais'),
          where('userId', '==', auth.currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const korvaisData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        
        setKorvais(korvaisData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching korvais: ", err);
        setError("Failed to load your korvais");
        setLoading(false);
      }
    };

    fetchUserKorvais();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-300">
        <CircularProgress size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-300">
        <Typography color="danger">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="bg-slate-300 min-h-screen">
      <div className="pt-8">
        <Typography level="h3" className="text-center mb-6">
          Your Korvais
        </Typography>
        
        <div className="flex justify-center my-4">
          <Typography level="h5">
            {korvais.length} Korvai{korvais.length !== 1 && 's'}
          </Typography>
        </div>

        {korvais.map((korvai) => (
          <Korvai
            key={korvai.id}
            letters={korvai.letters}
            talam={korvai.talam}
            ragam={korvai.ragam}
            description={korvai.description}
            authorName={korvai.authorName}
            createdAt={korvai.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
