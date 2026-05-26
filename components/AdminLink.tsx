'use client';//監聽登入

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLink() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    
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
        text-[#8B3A62]
        bg-transparent
        hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition
        hover:scale-110
        transition-all duration-300
        cursor-pointer
      "
    >
      <Settings size={18} />
    </button>
  );
}