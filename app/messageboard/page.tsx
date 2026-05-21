'use client';

import { useState } from 'react';
import { Popcorn, Carrot, Croissant, CupSoda, Clover, Send, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Popcorn, Carrot, Croissant, CupSoda, Clover
};

const avatarNames = ['Popcorn', 'Carrot', 'Croissant', 'CupSoda', 'Clover'];

type Message = {
  id: number;
  name: string;
  avatar: string;  // ← 存字串
  content: string;
  time: string;
};

export default function MessageBoardPage() {

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, name: '兔兔', avatar: 'Popcorn', content: '今天笑到不行 XD', time: '5 分鐘前' },
    { id: 2, name: '倉鼠', avatar: 'Popcorn', content: '這網站太可愛了吧', time: '12 分鐘前' },
    { id: 3, name: '狗狗', avatar: 'Croissant', content: '有點太多諧音梗了我快不行', time: '20 分鐘前' },
  ]);

  const [text, setText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('Carrot');

  const handleSubmit = () => {
    if (!text.trim()) return;
    setMessages(prev => [{
      id: Date.now(),
      name: '匿名兔兔',
      avatar: selectedAvatar,
      content: text,
      time: '剛剛',
    }, ...prev]);
    setText('');
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)] bg-[size:28px_28px] p-6">

      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-[#8B3A62]">留言板</h1>
        <p className="text-[#C48AA3] mt-2">留下一句想說的話 ✨</p>
      </div>

      <div className="max-w-6xl mx-auto bg-white border-2 border-[#FFD1E0] rounded-3xl p-5 shadow-md mb-8">

        {/* Avatar Select */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {avatarNames.map(name => {
            const Icon = iconMap[name];
            return (
              <button
                key={name}
                onClick={() => setSelectedAvatar(name)}  // ← 存 name 字串
                className={`
                  w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition
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

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="寫點什麼..."
          className="w-full h-28 rounded-2xl border-2 border-[#FFD1E0] p-4 resize-none focus:outline-none focus:border-[#FF9BC1]"
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-5 py-3 rounded-2xl bg-[#FF6FA7] text-white flex items-center gap-2 hover:bg-[#FF5B99] transition"
          >
            <Send size={18} />
            送出留言
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4">
        {messages.map(msg => {
          const Avatar = iconMap[msg.avatar];  // ← 從 iconMap 取出 component
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

    </div>
  );
}