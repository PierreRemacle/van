// Cross-device unlock state lives in a GitHub gist. Anyone with the ID can
// read it (no auth needed), which is how the public site checks which tomes
// to show. Writing requires a token, entered only on the admin page.
const GIST_ID = '676c291ae23b08a86d2c569d897952a7';

export const CHAPTERS = ['Friday', 'Saturday', 'Sunday', 'Monday'];
export const DEFAULT_UNLOCKED = ['Friday'];

export async function fetchUnlockedChapters() {
  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const content = data.files?.['unlock.json']?.content;
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed.unlocked)) throw new Error('unexpected shape');
    return parsed.unlocked.filter(ch => CHAPTERS.includes(ch));
  } catch {
    // If the gist is unreachable, fail toward showing the least content.
    return DEFAULT_UNLOCKED;
  }
}

export async function writeUnlockedChapters(token, unlocked) {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files: { 'unlock.json': { content: JSON.stringify({ unlocked }) } } }),
  });
  if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
}
