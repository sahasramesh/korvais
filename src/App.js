import * as React from 'react';
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Chip from '@mui/joy/Chip';
import SearchIcon from '@mui/icons-material/Search';
import Korvai from './components/Korvai';
import { korvai1, korvai2, korvai3, korvai4, korvai5, korvai6 } from './korvais';
import { description1, description2, description3, description4, description5, description6 } from './descriptions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import Button from '@mui/joy/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';

export default function App() {
  const [searchText, setSearchText] = React.useState('');

  const customTheme = extendTheme({
    fontFamily: {
      body: 'Be Vietnam Pro',
    },
  });

  const korvais = [
    { letters: korvai1, talam: 'adi', ragam: 'sankarabharanam', description: description1 },
    { letters: korvai2, talam: 'khanda chapu', ragam: 'gowri manohari', description: description2 },
    { letters: korvai3, talam: 'khanda chapu', ragam: 'latangi', description: description3 },
    { letters: korvai4, talam: 'adi', ragam: 'kharaharapriya', description: description4 },
    { letters: korvai5, talam: 'adi', ragam: 'kaapi', description: description5 },
    { letters: korvai6, talam: 'adi', ragam: 'abheri', description: description6 },
  ];

  const filteredKorvais = korvais.filter(korvai =>
    korvai.letters.includes(searchText) ||
    korvai.talam.includes(searchText) ||
    korvai.ragam.includes(searchText) ||
    korvai.description.includes(searchText)
  );

  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CssVarsProvider theme={customTheme}>
    { user ? (
      <div className="bg-slate-300">
        <div className="flex justify-between items-center p-4">
          <div className='text-4xl font-viet font-bold'>Korvais Collection</div>
          {user && (
            <Button
              variant="soft"
              color="neutral"
              startDecorator={<LogoutIcon />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </div>
        <div className="flex justify-center">
          <div className="m-4 bg-zinc-50 rounded-3xl drop-shadow-lg">
            <div className="flex items-center justify-center gap-10 p-6 flex-wrap">
              <FormControl>
                <Input
                  startDecorator={<SearchIcon />}
                  placeholder="Search"
                  variant='soft'
                  color='primary'
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <FormHelperText>Filter korvais by talam, ragam, and description.</FormHelperText>
              </FormControl>
            </div>
          </div>
        </div>
        <div className='flex justify-center my-4'>
          <Chip variant="contained" color="primary">
            {filteredKorvais.length} result{filteredKorvais.length !== 1 && 's'}
          </Chip>
        </div>
        {filteredKorvais.map((korvai, index) => (
          <Korvai
            key={index}
            letters={korvai.letters}
            talam={korvai.talam}
            ragam={korvai.ragam}
            description={korvai.description}
          />
        ))}
      </div>
      ) : (
        <Auth />
      )}
    </CssVarsProvider>
  );
}
