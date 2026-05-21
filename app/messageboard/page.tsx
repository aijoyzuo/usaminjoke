'use client';

import { useState } from 'react';
import { Popcorn, Carrot, Croissant, CupSoda, Clover, Send, Sparkle, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';

const MAX_NAME_LENGTH = 10;
const MAX_TEXT_LENGTH = 30;
const PAGE_SIZE = 15;

const iconMap: Record<string, LucideIcon> = {
  Popcorn, Carrot, Croissant, CupSoda, Clover
};

const avatarNames = ['Popcorn', 'Carrot', 'Croissant', 'CupSoda', 'Clover'];

type Message = {
  id: number;
  name: string;
  avatar: string;
  content: string;
  time: string;
};

export default function MessageBoardPage() {

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, name: '兔兔', avatar: 'Popcorn', content: '今天笑到不行 XD', time: '5 分鐘前' },
    { id: 2, name: '倉鼠', avatar: 'Popcorn', content: '這網站太可愛了吧', time: '12 分鐘前' },
    { id: 3, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 4, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 5, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 6, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 7, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 8, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 9, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 10, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 11, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 12, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 13, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 14, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 15, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 16, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
    { id: 17, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
  ]);

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('Carrot');
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);
  const pagedMessages = messages.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSubmit = () => {
    if (!text.trim()) {
      alert('請輸入留言內容！');
      return;
    }
    if (text.length > MAX_TEXT_LENGTH) {
      alert(`留言請勿超過 ${MAX_TEXT_LENGTH} 字！`);
      return;
    }

    const finalName = name.trim() || '匿名兔兔';
    setMessages(prev => [{
      id: Date.now(),
      name: finalName,
      avatar: selectedAvatar,
      content: text.trim(),
      time: '剛剛',
    }, ...prev]);

    setName('');
    setText('');
    setPage(0);  // 新留言後跳回第一頁
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
          <div className='mb-2 font-bold text-[#8B3A62] hidden sm:flex'>選擇頭像：
          </div>
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
            className="px-5 py-3 rounded-2xl bg-[#FF6FA7] text-white flex items-center gap-2 hover:bg-[#FF5B99] transition cursor-pointer"
          >
            <Send size={18} />
            送出留言
          </button>
        </div>
      </div>

      {/* 留言列表 */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {pagedMessages.map(msg => {
            const Avatar = iconMap[msg.avatar];
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
                      <span className="hidden sm:block text-xs text-[#C48AA3]">{msg.time}</span>
                    </div>
                    <p className="text-[#7A5167] mt-2 leading-relaxed break-words">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
                className={`w-8 h-8 rounded-xl text-sm font-medium transition-all ${page === i
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