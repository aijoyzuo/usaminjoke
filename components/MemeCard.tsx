type Meme = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function MemeCard({ meme }: { meme: Meme }) {
  return (
    <div
      className="
        rounded-3xl overflow-hidden
        bg-white
        border-2 border-[#FFD1E0]
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      <figure className="overflow-hidden">
        <img
          src={meme.imageUrl}
          alt={meme.title}
          className="w-full object-cover hover:scale-105 transition duration-500"
        />
      </figure>

      <div className="p-4">
        <p className="text-sm font-medium text-[#8B3A62] truncate">
          {meme.title}
        </p>
      </div>
    </div>
  );
}