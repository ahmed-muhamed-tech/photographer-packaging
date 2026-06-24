// Component صغير للـ Loading - بنعيد استخدامه في أي صفحة

export default function LoadingSpinner() {
  return (
    <section className="bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </section>
  );
}
