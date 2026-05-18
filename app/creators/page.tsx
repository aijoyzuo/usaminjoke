// app/creators/page.tsx
'use client';

import Link from 'next/link';

type Creator = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  description: string;
  tags: string[];
  socials: { label: string; href: string }[];
  shopHref: string;
  avatar: string;
};

const creators: Creator[] = [
  {
    id: 'usamin',
    name: '吳莎敏',
    nameEn: 'usaminjoke',
    role: '諧音梗圖創作者',
    description:
      '專門製作台灣諧音梗圖的創作者，在 Threads 上以 @usaminjoke 活躍，用文字與圖像把日常生活中的語言巧合變成讓人噴飯的梗。',
    tags: ['諧音梗', '台灣創作', '圖文', 'Threads'],
    socials: [
      { label: 'Threads', href: 'https://www.threads.com/@usaminjoke' },
    ],
    shopHref: '#',
    avatar: '🐰',
  },
  {
    id: 'aijoyzuo',
    name: '佐降',
    nameEn: 'aijoyzuo',
    role: '網頁開發者',
    description:
      '熱愛把有趣的東西做成網頁的前端開發者，用 Next.js + Tailwind + Supabase 打造這個梗圖宇宙。',
    tags: ['Next.js', 'TypeScript', 'Supabase', '前端開發'],
    socials: [{ label: 'GitHub', href: 'https://github.com/aijoyzuo' }],
    shopHref: '#',
    avatar: '🛠️',
  },
];

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-[#FFF5F8] py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-[#8B3A62]">
            創作者介紹
          </h1>
          <p className="text-[#B76E8A] mt-3 text-lg">
            認識 UsaminJoke 背後的創作者 ✨
          </p>
        </div>

        {/* Creator Cards */}
        {creators.map((c) => (
          <div
            key={c.id}
            className="rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-8">
              <div className="flex flex-col sm:flex-row gap-6">

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-[#FFE9F1] border-2 border-[#FFB8D2] flex items-center justify-center text-5xl shadow-sm">
                    {c.avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">

                  {/* Name */}
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-bold text-[#8B3A62]">
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
                  <div className="flex flex-wrap gap-3 pt-2">
                    {c.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl border-2 border-[#FF9BC1] text-[#D85D93] hover:bg-[#FFE9F1] transition"
                      >
                        {s.label}
                      </a>
                    ))}

                    <a
                      href={c.shopHref}
                      className={`px-4 py-2 rounded-xl font-medium transition
                        ${
                          c.shopHref === '#'
                            ? 'bg-[#FFDDE8] text-[#C8A6B5] cursor-not-allowed'
                            : 'bg-[#FF6FA7] text-white hover:bg-[#FF5B99]'
                        }`}
                    >
                      前往賣場
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}