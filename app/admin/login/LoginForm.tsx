'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BadgeAlert, Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="card bg-base-100 w-[90%] sm:w-full max-w-sm shadow-md rounded-3xl">
        <div className="card-body space-y-4">
          <h1 className="text-xl font-bold text-center">登入</h1>

          {error && (
            <div className="alert alert-error justify-center text-sm bg-[#FF9BC1] text-white rounded-2xl">
              <BadgeAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-control space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-white rounded-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* 密碼欄位 + 眼睛 */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="密碼"
                className="input input-bordered w-full pr-12 bg-white rounded-2xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C48AA3] hover:text-[#FF6FA7] transition"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary w-full rounded-2xl"
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