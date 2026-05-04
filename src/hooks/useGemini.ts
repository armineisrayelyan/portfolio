import { useCallback, useState } from 'react';

import { callGemini } from '../utils/geminiClient';

type Status = 'idle' | 'loading' | 'success' | 'error';

export type GeminiState = {
  status: Status;
  response: string | null;
  error: string | null;
  ask: (prompt: string) => Promise<void>;
  reset: () => void;
};

export function useGemini(): GeminiState {
  const [status, setStatus] = useState<Status>('idle');
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (prompt: string) => {
    setStatus('loading');
    setResponse(null);
    setError(null);
    try {
      const text = await callGemini(prompt);
      console.log(text);
      setResponse(text);
      setStatus('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      setError(message);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResponse(null);
    setError(null);
  }, []);

  return { status, response, error, ask, reset };
}
