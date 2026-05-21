'use client';

import { useState } from 'react';
import {  Popcorn, Carrot, Croissant, CupSoda, Clover, Send,} from 'lucide-react';

type Message = {
  id: number;
  name: string;
  avatar: any;
  content: string;
  time: string;
};

export default function MessageBoardPage() {

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: '兔兔',
      avatar: Popcorn,
      content: '今天笑到不行 XD',
      time: '5 分鐘前',
    },
    {
      id: 2,
      name: '倉鼠',
      avatar: Popcorn,
      content: '這網站太可愛了吧',
      time: '12 分鐘前',
    },
    {
      id: 3,
      name: '狗狗',
      avatar: Croissant,
      content: '有點太多諧音梗了我快不行',
      time: '20 分鐘前',
    },
  ]);

  const [text, setText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(Carrot);

  const avatars = [Popcorn, Carrot, Croissant,CupSoda,Clover];

  const handleSubmit = () => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      name: '匿名兔兔',
      avatar: selectedAvatar,
      content: text,
      time: '剛剛',
    };

    setMessages(prev => [newMessage, ...prev]);
    setText('');
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#FFF5F8]
        bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)]
        bg-[size:28px_28px]
        p-6
      "
    >

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-[#8B3A62]">
          留言板
        </h1>

        <p className="text-[#C48AA3] mt-2">
          留下一句想說的話 ✨
        </p>
      </div>

      {/* Input Area */}
      <div
        className="
          max-w-6xl mx-auto
          bg-white
          border-2 border-[#FFD1E0]
          rounded-3xl
          p-5
          shadow-md
          mb-8
        "
      >

        {/* Avatar Select */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {avatars.map((Icon, index) => (
            <button
              key={index}
              onClick={() => setSelectedAvatar(() => Icon)}
              className="
                w-12 h-12 rounded-2xl
                border-2 border-[#FFD1E0]
                flex items-center justify-center
                hover:bg-[#FFE9F1]
                transition
              "
            >
              <Icon size={22} className="text-[#D85D93]" />
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="寫點什麼..."
          className="
            w-full h-28
            rounded-2xl
            border-2 border-[#FFD1E0]
            p-4
            resize-none
            focus:outline-none
            focus:border-[#FF9BC1]
          "
        />

        {/* Submit */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="
              px-5 py-3 rounded-2xl
              bg-[#FF6FA7]
              text-white
              flex items-center gap-2
              hover:bg-[#FF5B99]
              transition
            "
          >
            <Send size={18} />
            送出留言
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="
          max-w-6xl mx-auto
          columns-1
          sm:columns-2
          lg:columns-3
          gap-4
        "
      >
        {messages.map((msg) => {
          const Avatar = msg.avatar;

          return (
            <div
              key={msg.id}
              className="
                break-inside-avoid
                mb-4
                bg-white
                rounded-3xl
                border-2 border-[#FFD1E0]
                p-4
                shadow-sm
                hover:-translate-y-1
                hover:shadow-lg
                transition-all
              "
            >
              <div className="flex items-start gap-3">

                {/* Avatar */}
                <div
                  className="
                    w-12 h-12 rounded-2xl
                    bg-[#FFE9F1]
                    border border-[#FFD1E0]
                    flex items-center justify-center
                    flex-shrink-0
                  "
                >
                  <Avatar
                    size={22}
                    className="text-[#D85D93]"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  <div className="flex justify-between items-center gap-2">
                    <p className="font-bold text-[#8B3A62]">
                      {msg.name}
                    </p>

                    <span
                      className="
                        hidden sm:block
                        text-xs text-[#C48AA3]
                      "
                    >
                      {msg.time}
                    </span>
                  </div>

                  <p
                    className="
                      text-[#7A5167]
                      mt-2
                      leading-relaxed
                      break-words
                    "
                  >
                    {msg.content}
                  </p>

                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}