'use client';

import { useState, useEffect } from 'react';
import { Popcorn, Carrot, Croissant, CupSoda, Clover, Send, Sparkle, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: "留言板",
};

const MAX_NAME_LENGTH = 10;
const MAX_TEXT_LENGTH = 30;
const PAGE_SIZE = 15;

const iconMap: Record<string, LucideIcon> = {
  Popcorn, Carrot, Croissant, CupSoda, Clover
};

const avatarNames = ['Popcorn', 'Carrot', 'Croissant', 'CupSoda', 'Clover'];

type Message = {
  id: string;
  name: string;
  avatar: string;
  content: string;
  created_at: string;
};

export default function MessageBoardClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('Carrot');
  const [page, setPage] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const fetchMessages = async (p = 0) => {
    setLoading(true);
    const from = p * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (data) setMessages(data);
    if (count !== null) setTotal(count);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  const formatTime = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return '剛剛';
    if (diff < 3600) return `${Math.floor(diff / 60)} 分鐘前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小時前`;
    return `${Math.floor(diff / 86400)} 天前`;
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('請輸入留言內容！');
      return;
    }
    if (text.length > MAX_TEXT_LENGTH) {
      alert(`留言請勿超過 ${MAX_TEXT_LENGTH} 字！`);
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from('messages').insert({
      name: name.trim() || '匿名兔兔',
      avatar: selectedAvatar,
      content: text.trim(),
    });

    if (error) {
      alert('送出失敗，請再試一次');
      setSubmitting(false);
      return;
    }

    setName('');
    setText('');
    setPage(0);
    fetchMessages(0);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)] bg-[size:28px_28px] p-6">

      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-4xl font-bold text-[#8B3A62]">留言板</h1>
          <div className="text-[#B76E8A] mt-3 font-semibold flex items-center gap-2 justify-center">
            <Sparkle size={16} />
            <p className="text-lg">留下一句想說的話</p>
            <Sparkle size={16} />
          </div>
        </div>
      </div>

      {/* 輸入區 */}
      <div className="max-w-7xl mx-auto bg-white border-2 border-[#FFD1E0] rounded-3xl p-5 sm:p-10 shadow-md mb-8">
        <div className='flex items-center'>
          <div className='mb-2 font-bold text-[#8B3A62] hidden sm:flex'>選擇頭像：</div>
          <div className="flex-1 flex justify-between sm:justify-start gap-3 mb-2">
            {avatarNames.map(name => {
              const Icon = iconMap[name];
              return (
                <button
                  key={name}
                  onClick={() => setSelectedAvatar(name)}
                  className={`
                    w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition cursor-pointer
                    ${selectedAvatar === name
                      ? 'border-[#FF6FA7] bg-[#FFE9F1]'
                      : 'border-[#FFD1E0] hover:bg-[#FFE9F1]'
                    }
                  `}
                >
                  <Icon size={22} className="text-[#D85D93]" />
                </button>
              );
            })}
          </div>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
          placeholder="暱稱"
          className="w-full sm:w-100 h-16 rounded-2xl border-2 border-[#FFD1E0] p-4 resize-none focus:outline-none focus:border-[#FF9BC1] mb-2"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT_LENGTH))}
          placeholder="寫點什麼"
          className="w-full h-16 rounded-2xl border-2 border-[#FFD1E0] p-4 resize-none focus:outline-none focus:border-[#FF9BC1]"
        />
        <p className={`text-xs text-right ${text.length >= MAX_TEXT_LENGTH ? 'text-red-400' : 'text-[#C48AA3]'}`}>
          {text.length}/{MAX_TEXT_LENGTH}
        </p>

        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-5 py-3 rounded-2xl bg-[#FF6FA7] text-white flex items-center gap-2 hover:bg-[#FF5B99] transition cursor-pointer disabled:opacity-50"
          >
            <Send size={18} />
            {submitting ? '送出中...' : '送出留言'}
          </button>
        </div>
      </div>

      {/* 留言列表 */}
      <div className="max-w-7xl mx-auto space-y-6">
        {loading ? (
          <div className="text-center text-[#C48AA3] py-10">載入中...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-[#C48AA3] py-10">還沒有留言，來第一個留言吧！</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {messages.map(msg => {
              const Avatar = iconMap[msg.avatar] ?? Carrot;
              return (
                <div
                  key={msg.id}
                  className="break-inside-avoid mb-4 bg-white rounded-3xl border-2 border-[#FFD1E0] p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFE9F1] border border-[#FFD1E0] flex items-center justify-center flex-shrink-0">
                      <Avatar size={22} className="text-[#D85D93]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <p className="font-bold text-[#8B3A62]">{msg.name}</p>
                        <span className="hidden sm:block text-xs text-[#C48AA3]">
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                      <p className="text-[#7A5167] mt-2 leading-relaxed break-words">{msg.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 分頁 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-xl border-2 border-[#FFD1E0] text-[#D85D93] disabled:opacity-30 hover:bg-[#FFE9F1] transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 rounded-xl text-sm font-medium transition-all ${
                  page === i
                    ? 'bg-[#FF6FA7] text-white'
                    : 'border-2 border-[#FFD1E0] text-[#D85D93] hover:bg-[#FFE9F1]'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-xl border-2 border-[#FFD1E0] text-[#D85D93] disabled:opacity-30 hover:bg-[#FFE9F1] transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}