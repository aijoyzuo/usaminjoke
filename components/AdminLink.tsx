'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLink() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 檢查目前登入狀態
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    // 監聽登入狀態變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push('/admin');
    } else {
      router.push('/admin/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="管理後台"
      className="
        w-8 h-8
        flex items-center justify-center
        rounded-full
        text-2xl
        text-[#FF6FA7]
        bg-transparent
        hover:text-[#ffffff]
        hover:bg-[#FF6FA7]
        hover:scale-110
        transition-all duration-300
        cursor-pointer
      "
    >
      <Settings size={18} />
    </button>
  );
}