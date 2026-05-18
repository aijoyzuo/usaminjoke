'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('帳號或密碼錯誤');
      setLoading(false);
      return;
    }

    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F8] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#8B3A62] flex justify-center items-center gap-2">
            ⚙️ 創作者專區
          </h1>
          <p className="text-[#C48AA3] mt-2">
            登入 UsaminJoke 管理後台
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-[#FFE9F1] border border-[#FF9BC1] px-4 py-3 text-sm text-[#D85D93]">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full px-4 py-3 rounded-2xl
              border-2 border-[#FFD1E0]
              text-[#8B3A62]
              placeholder:text-[#C48AA3]
              focus:outline-none
              focus:border-[#FF9BC1]
              focus:ring-4 focus:ring-[#FFE9F1]
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="密碼"
            className="
              w-full px-4 py-3 rounded-2xl
              border-2 border-[#FFD1E0]
              text-[#8B3A62]
              placeholder:text-[#C48AA3]
              focus:outline-none
              focus:border-[#FF9BC1]
              focus:ring-4 focus:ring-[#FFE9F1]
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          <button
            className="
              w-full py-3 rounded-2xl
              bg-[#FF6FA7]
              text-white font-semibold
              hover:bg-[#FF5B99]
              shadow-md hover:shadow-lg
              transition-all
              disabled:opacity-50
            "
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