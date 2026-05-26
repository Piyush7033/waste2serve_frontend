import React, { useState, useEffect } from 'react';
import '../styles/modal.css';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return { toasts, showToast };
};

const Toast = ({ message, type }) => {
  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
};

export default Toast;