import { useRef } from "react";
import { useEffect, useState } from "react";
import { extractEmails, hnUserLink } from "./utils/helpers";

export default function JobPost({ jobId }) {
  const [jobPost, setJobPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const postRef = useRef(null);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong: " + res.status);
        return res.json();
      })
      .then((result) => {
        setJobPost(result);

        if (postRef.current) {
          const firstTextNode = postRef.current.childNodes[0];
          if (firstTextNode.length > 80) {
            postRef.current.classList.add("truncate");
            postRef.current.addEventListener("click", function () {
              this.classList.toggle("truncate");
            });
          }
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return <p>Loading...job post</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const datetime = new Date(jobPost.time * 1000).toLocaleDateString();
  const byUserLink = hnUserLink(jobPost.by);
  const emails = extractEmails(jobPost.text);

  let updatedJobPostText = "";
  if (emails) {
    emails?.forEach((e) => {
      updatedJobPostText = jobPost?.text.replace(
        e,
        `<a href="mailto:${e}">${e}</a>`
      );
    });
  }

  return (
    <div className="p-4 border-2 my-4 post max-h-96 overflow-x-auto">
      <div
        ref={postRef}
        className="post-text"
        dangerouslySetInnerHTML={{
          __html: updatedJobPostText || jobPost?.text,
        }}
      />
      <p>
        Posted on: <time dateTime={datetime}>{datetime}</time> by{" "}
        <a
          className="underline decoration-[#ff6600] decoration-2 underline-offset-8"
          href={byUserLink}
        >
          {jobPost.by}
        </a>
      </p>
    </div>
  );
}
