// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Korvai from '../components/Korvai';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { userId } = useParams();
  const [korvais, setKorvais] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isOwnProfile = userId === auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's korvais
        const q = query(
          collection(db, 'korvais'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const korvaisData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        
        setKorvais(korvaisData);

        // If it's another user's profile, fetch their basic info
        if (!isOwnProfile && korvaisData.length > 0) {
          setUserData({
            authorName: korvaisData[0].authorName
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, isOwnProfile]);

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
      <div className="p-8">
        <Typography level="h3" className="text-center mb-6">
          {isOwnProfile ? 'Your korvais' : `${userData?.authorName}'s korvais`}
        </Typography>
        
        <div className="flex justify-center my-2">
          <Typography level="h5">
            {korvais.length} korvai{korvais.length !== 1 && 's'}
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
            userId={korvai.userId}
            createdAt={korvai.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
