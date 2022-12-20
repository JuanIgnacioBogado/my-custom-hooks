import { useEffect, useState } from 'react';

export const useFetch = url => {
  const [state, setState] = useState({
    data: null,
    hasError: null,
    isLoading: true
  });

  useEffect(() => {
    setState({ ...state, isLoading: true });
    (async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setState({
          data,
          isLoading: false,
          hasError: null
        });
      } catch ({ message }) {
        console.log('error', message);
        setState({
          ...state,
          hasError: message,
          isLoading: false
        });
      }
    })();
  }, [url]);

  return state;
};
