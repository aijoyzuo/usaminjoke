import MemeCard from "./MemeCard";

type Meme = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function MemeGrid({ memes }: { memes: Meme[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {memes.map(m => (
        <MemeCard key={m.id} meme={m} />
      ))}
    </div>
  );
}