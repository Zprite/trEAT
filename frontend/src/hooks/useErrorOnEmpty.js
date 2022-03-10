import { useEffect } from 'react';

const useErrorOnEmpty = (value, setError) => {
  useEffect(() => {
    if (value == null || value === undefined) setError(true);
    else if (typeof value === 'string') {
      if (!value) setError(true);
      else setError(false);
    } else if (Array.isArray(value)) {
      if (value.length === 0) setError(true);
      else setError(false);
    } else if (typeof value === 'object' && value !== null) {
      if (value.length === 0) setError(true);
      else setError(false);
    }
  }, [value, setError]);
};

export default useErrorOnEmpty;
