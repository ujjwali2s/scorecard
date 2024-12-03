import { Trophy } from 'lucide-react';

interface TeamInningsProps {
  teamName: string;
  score: string;
  overs: string;
  target?: number;
  isCurrentInnings: boolean;
}

export function TeamInnings({ teamName, score, overs, target, isCurrentInnings }: TeamInningsProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${isCurrentInnings ? 'ring-2 ring-green-500' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{teamName}</h2>
        {target !== undefined && target > 0 && (
          <div className="flex items-center text-amber-600">
            <Trophy className="w-4 h-4 mr-1" />
            <span>Target: {target}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-gray-900">{score}</div>
        <div className="text-gray-600 mt-1">Overs: {overs}</div>
      </div>
    </div>
  );
}
