import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
      setHistory(history.slice(0));
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  };

  const back = () => {
    if (history.length > 0) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    } 
  };

  return {
    mode,
    transition,
    back
  };
}