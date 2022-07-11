import { useEffect, useRef, useState } from "react";
import "./App.css";
// import useFetch from "./hooks/useFetch";
import JobPost from "./JobPost";


function App() {
  const [jobs, setJobs] = useState(null);
  const hnUser = useRef("whoishiring");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(5);

  const showMore = () => {
    setPage((page) => page + 5);
  };

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/user/${hnUser.current}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong: " + res.status);
        return res.json();
      })
      .then((userdata) => {
        return fetch(
          `https://hacker-news.firebaseio.com/v0/item/${userdata.submitted[0]}.json`
        );
      })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong: " + res.status);
        return res.json();
      })
      .then(({ kids }) => {
        setJobs(kids)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="text-pink-600 text-2xl p-4 ">
      Hello this is HN Job Board
      page: {JSON.stringify(page)}
      <hr/>
      {jobs && jobs?.slice(0, page).map((j) => (
        <JobPost jobId={j} key={j} />
      ))}
      <button
        className="p-4 bg-sky-300 rounded text-white"
        type="button"
        onClick={showMore}
      >
        Show more
      </button>
    </div>
  );
}

export default App;
