import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
      // setHistory(prev => (history.slice(0)));
    } else {
      setMode(mode);
      setHistory(prev => ([...history, mode]));
    }
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((history.slice(0, -1)));
    } else {
      setMode(history[0]);
    }
  };
  // function back() {
  //  if (history.length > 1) {
  //    const previousHistory = history.slice(0,-1);
  //    setHistory(previousHistory);
  //    setMode(previousHistory[previousHistory.length - 1]);
  //  } else {
  //    setMode(history[0]);
  //  }
  // }

  return {
    mode,
    transition,
    back
  };
}