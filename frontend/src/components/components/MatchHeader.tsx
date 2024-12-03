interface MatchHeaderProps {
  title: string;
  commentary: string;
}

export function MatchHeader({ title, commentary }: MatchHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-lg text-green-600 font-medium">{commentary}</p>
    </div>
  );
}