import { useState, useEffect, useRef } from 'react';

const useFetch = url => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then(res => res.json())
      .then(
        data =>
          isMounted.current && setState({ data, loading: false, error: null })
      );
  }, [url]);

  useEffect(() => () => (isMounted.current = false), []);

  return state;
};

export default useFetch;
