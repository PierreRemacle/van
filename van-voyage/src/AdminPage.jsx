import { useEffect, useState } from 'react';
import { Lock, Unlock, Loader2 } from 'lucide-react';
import { CHAPTERS, fetchUnlockedChapters, writeUnlockedChapters } from './lib/unlock';

const TOKEN_STORAGE_KEY = 'vanVoyageAdminToken';

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) || '');
  const [unlocked, setUnlocked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchUnlockedChapters().then(u => {
      setUnlocked(u);
      setLoading(false);
    });
  }, []);

  const handleTokenChange = (e) => {
    const value = e.target.value;
    setToken(value);
    localStorage.setItem(TOKEN_STORAGE_KEY, value);
  };

  const toggle = (chapter) => {
    setUnlocked(u => u.includes(chapter) ? u.filter(c => c !== chapter) : [...u, chapter]);
  };

  const save = async () => {
    if (!token) {
      setStatus('Paste your write token first.');
      return;
    }
    setSaving(true);
    setStatus('Saving…');
    try {
      await writeUnlockedChapters(token, unlocked);
      setStatus('Saved — her phone will see this next time she loads the page.');
    } catch (e) {
      setStatus(`Failed to save: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2c231a] text-stone-200 flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-serif text-amber-100">Van Voyage — Admin</h1>

      {loading ? (
        <Loader2 className="w-6 h-6 animate-spin text-stone-500" />
      ) : (
        <div className="w-full max-w-sm bg-stone-900/60 border border-stone-800 rounded-xl p-5 flex flex-col gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-stone-500 mb-1 block">Write token</label>
            <input
              type="password"
              value={token}
              onChange={handleTokenChange}
              placeholder="github_pat_..."
              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-stone-100 text-sm outline-none focus:border-amber-700"
            />
            <p className="text-[11px] text-stone-500 mt-1">Saved only on this device, never shipped in the site.</p>
          </div>

          <div className="flex flex-col gap-2">
            {CHAPTERS.map(chapter => {
              const isOn = unlocked.includes(chapter);
              return (
                <button
                  key={chapter}
                  onClick={() => toggle(chapter)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition ${
                    isOn
                      ? 'bg-amber-800/20 border-amber-800 text-amber-100'
                      : 'bg-stone-800/40 border-stone-700 text-stone-400'
                  }`}
                >
                  <span className="font-bold text-sm">{chapter}</span>
                  {isOn ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-700 transition rounded-lg text-white text-sm font-bold disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>

          {status && <p className="text-xs text-stone-400">{status}</p>}
        </div>
      )}
    </div>
  );
}
