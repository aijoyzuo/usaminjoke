type Meme = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function MemeCard({ meme }: { meme: Meme }) {
  return (
    <div className="card bg-base-100 shadow">
      <figure>
        <img src={meme.imageUrl} alt={meme.title} />
      </figure>
      <div className="card-body p-2">
        <p className="text-sm">{meme.title}</p>
      </div>
    </div>
  );
}