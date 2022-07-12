export function hnUserLink(hnUser = "") {
  return `https://news.ycombinator.com/user?id=${hnUser}`;
}

export function extractEmails(text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}
