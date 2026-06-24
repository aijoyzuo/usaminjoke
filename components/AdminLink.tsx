'use client';

import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLink() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

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