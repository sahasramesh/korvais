// src/pages/Feed.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Button from '@mui/joy/Button';
import Icon from '@mdi/react';
import AddIcon from '@mui/icons-material/Add';
// import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import Korvai from '../components/Korvai';
import CircularProgress from '@mui/joy/CircularProgress';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { mdiMenu } from '@mdi/js';

export default function Feed() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [korvais, setKorvais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      showToast('Signed out', 'success');
      navigate('/signin');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const fetchKorvais = async () => {
      try {
        const q = query(collection(db, 'korvais'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const korvaisData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        setKorvais(korvaisData);
        for (let korvai of korvaisData) {
          console.log(korvai);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching korvais: ", err);
        setError("Failed to load korvais");
        setLoading(false);
      }
    };

    fetchKorvais();
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
        <div color="danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-300 min-h-screen">
      <div className="flex justify-between items-center p-4">
        <div className='text-2xl font-viet'>korvais.com</div>
        <div className="flex gap-4">
        {user ? (
            <>
              <Button
                variant="soft"
                color="primary"
                onClick={() => navigate('/create')}
              >
                <AddIcon />
              </Button>
              <Dropdown>
                <MenuButton
                  variant="soft"
                  color="neutral"
                >
                  <Icon path={mdiMenu} size={1} />
                </MenuButton>
                <Menu>
                  <MenuItem onClick={() => navigate(`/profile/${auth.currentUser.uid}`)}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    Sign Out
                  </MenuItem>
                </Menu>
              </Dropdown>
            </>
          ) : (
            <Button
              variant="soft"
              color="primary"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
          )}
        </div>
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
  );
}
