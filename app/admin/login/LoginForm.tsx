'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('帳號或密碼錯誤');
      setLoading(false);
      return;
    }

    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-md">
        <div className="card-body space-y-4">
          <h1 className="text-xl font-bold text-center">創作者專區</h1>
          {error && <div className="alert alert-error text-sm">{error}</div>}
          <div className="form-control space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="密碼"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button
            className="btn btn-primary w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </div>
      </div>
    </div>
  );
}