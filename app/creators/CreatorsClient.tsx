// app/creators/page.tsx
'use client';

import Link from 'next/link';
import { Rabbit, Code2, Sparkle } from 'lucide-react';

export const metadata = {
  title: "創作者介紹",  
};

type Creator = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  description: string;
  tags: string[];
  socials: { label: string; href: string }[];
  shopHref: string;
  avatar: React.ElementType;
};

type Member = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  socials: { label: string; href: string }[];
  shopHref: string;
  avatar: React.ElementType;
};

const creators: Creator[] = [
  {
    id: 'usamin',
    name: '吳莎敏',
    nameEn: 'usaminjoke',
    role: '諧音梗圖創作者',
    description:
      '專門製作台灣諧音梗圖的創作者，但是無斷轉載的帳號讚數都比本人多，想想又覺得大家開心也好，又哭又笑地過每一天。',
    tags: ['諧音梗', '台灣創作', '圖文', 'Threads'],
    socials: [
      { label: 'Threads', href: 'https://www.threads.com/@usaminjoke' },
    ],
    shopHref: '#',
    avatar: Rabbit,
  },
  {
    id: 'aijoyzuo',
    name: '佐降',
    nameEn: 'zuo',
    role: '網頁開發者',
    description:
      '一名愛台人士，Happy End Engineer',
    tags: ['Next.js', 'TypeScript', 'Supabase', '前端開發'],
    socials: [{ label: 'Plurk', href: 'https://www.plurk.com/Gitto' }, { label: 'Threads', href: 'https://www.threads.com/@zuo_aot?igshid=NTc4MTIwNjQ2YQ==' }],
    shopHref: '#',
    avatar: Code2,
  },
];

const members: Member[] = [
  {
    id: 'rnio1',
    name: '尼歐',
    nameEn: 'Rnio',
    description:
      '經營胖胖咪復育中心。',
    socials: [
      { label: 'Threads', href: 'https://www.threads.com/@usaminjoke' },
    ],
    shopHref: '#',
    avatar: Rabbit,
  },
  {
    id: 'rnio2',
    name: 'woffy',
    nameEn: 'woffymilk',
    description:
      '知名podcaster。',
    socials: [
      { label: 'Threads', href: 'https://www.threads.com/@usaminjoke' },
    ],
    shopHref: '#',
    avatar: Rabbit,
  },
  {
    id: 'rnio3',
    name: '阿慈',
    nameEn: 'daymimeda',
    description:
      '台北如同不乾的乾麵，在盆底擁有過多的水分。',
    socials: [
      { label: 'Threads', href: 'https://www.threads.com/@usaminjoke' },
    ],
    shopHref: '#',
    avatar: Rabbit,
  },
   {
    id: 'rnio4',
    name: '牛志郎',
    nameEn: '億載京城午',
    description:
      '府城里維老師',
    socials: [
      { label: 'Threads', href: 'https://www.threads.com/@usaminjoke' },
    ],
    shopHref: '#',
    avatar: Rabbit,
  },
   {
    id: 'rnio5',
    name: '不妙',
    nameEn: 'prmyau',
    description:
      '亞洲最大漢化組',
    socials: [
      { label: 'Threads', href: 'https://www.threads.com/@usaminjoke' },
    ],
    shopHref: '#',
    avatar: Rabbit,
  },
];

export default function CreatorsClient() {
  return (
    <div className="min-h-screen bg-[#FFF5F8] bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)]
    bg-[size:28px_28px] p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center  mb-6 sm:mb-10">
          <h1 className="text-4xl font-bold text-[#8B3A62]">
            創作者介紹
          </h1>
          <div className="text-[#B76E8A] mt-3 font-semibold flex items-center gap-2 justify-center">
            <Sparkle size={16} />
            <p className="text-lg">
              小棧員工
            </p>
            <Sparkle size={16} />
          </div>

        </div>

        {/* Creator Cards */}
        {creators.map((c) => (
          <div
            key={c.id}
            className="rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="sm:p-8 p-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-3xl text-[#8B3A62] bg-[#FFE9F1] border-2 border-[#FFB8D2] flex items-center justify-center text-5xl shadow-sm">
                    <c.avatar size={42} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">

                  {/* Name */}
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-bold text-[#8B3A62] mt-1">
                        {c.name}
                      </h2>
                      <span className="text-sm text-[#C48AA3]">
                        @{c.nameEn}
                      </span>
                    </div>

                    <p className="text-[#FF6FA7] font-semibold mt-1">
                      {c.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[#7A5167] leading-relaxed">
                    {c.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#FFE9F1] text-[#D85D93] text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap sm:justify-between justify-end gap-3 pt-2">
                    <div className='flex flex-wrap gap-2'>
                      {c.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl border-2 border-[#FF9BC1] text-[#D85D93] hover:bg-[#FFE9F1] transition"
                        >
                          {s.label}
                        </a>
                      ))}

                    </div>

                    <a
                      href={c.shopHref}
                      className={`px-3 py-1.5 rounded-xl font-medium transition
                        ${c.shopHref === '#'
                          ? 'bg-[#FFDDE8] text-[#C8A6B5] cursor-not-allowed'
                          : 'bg-[#FF6FA7] text-white hover:bg-[#FF5B99]'
                        }`}
                    >
                      賣場
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">              <div className="sm:p-8 p-4 h-full flex flex-col">

                {/* Header */}
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl text-[#8B3A62] bg-[#FFE9F1] border-2 border-[#FFB8D2] flex items-center justify-center shadow-sm">
                      <m.avatar size={30} strokeWidth={2.2} />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#8B3A62] mt-1">
                      {m.name}
                    </h2>
                    <span className="text-sm text-[#C48AA3]">
                      @{m.nameEn}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1 mt-2">
                  <p className="text-[#7A5167] leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Buttons 固定右下 */}
                <div className="flex flex-wrap justify-end gap-3 pt-2 mt-auto">
                  {m.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl border-2 border-[#FF9BC1] text-[#D85D93] hover:bg-[#FFE9F1] transition"
                    >
                      {s.label}
                    </a>
                  ))}

                  <a
                    href={m.shopHref}
                    className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center justify-center ${m.shopHref === '#'
                      ? 'bg-[#FFDDE8] text-[#C8A6B5] cursor-not-allowed'
                      : 'bg-[#FF6FA7] text-white hover:bg-[#FF5B99]'
                      }`}
                  >
                    賣場
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}