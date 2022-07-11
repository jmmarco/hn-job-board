import { useState } from "react";
import { useEffect } from "react";

export default function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(results => setData(results))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [url]);

  return {
    data,
    error,
    loading,
  };
}
