export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F8]">
      <div className="text-center space-y-4">
        <img
          src="https://images.plurk.com/5jRLJ0HcO1oWQ7qesSYxwZ.gif"
          alt="loading"
          className="w-40 mx-auto"
        />
        <p className="text-[#D85D93] font-medium animate-pulse">
          敏想中……
        </p>
      </div>
    </div>
  );
}