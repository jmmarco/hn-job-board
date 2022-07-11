import { useEffect, useState } from "react";

export default function JobPost({ jobId }) {
  const [jobPost, setJobPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong: " + res.status);
        return res.json();
      })
      .then((result) => setJobPost(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [jobId]);

  if (loading) {
    return <p>Loading...job post</p>
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 border-2 m-2">
      <div dangerouslySetInnerHTML={{ __html: jobPost?.text }} />
      <time>
        Posted on: {new Date(jobPost.time * 1000).toLocaleDateString()}
      </time>
    </div>
  );
}
