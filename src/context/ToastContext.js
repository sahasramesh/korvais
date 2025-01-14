// src/context/ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/joy/Snackbar';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('primary');

  const showToast = (msg, clr = 'primary') => {
    setMessage(msg);
    setColor(clr);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        color={color}
        variant="outlined"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {message}
      </Snackbar>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
