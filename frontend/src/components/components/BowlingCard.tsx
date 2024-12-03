interface Bowler {
  bowlerName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  isActiveBowler: boolean;
}

interface BowlingCardProps {
  innings: {
    bowlers: Bowler[];
  };
}

export function BowlingCard({ innings }: BowlingCardProps) {
  if (!innings || !innings.bowlers || innings.bowlers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Bowling</h3>
        <div className="text-gray-500">No bowling data available</div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Bowling</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="text-left py-2">Bowler</th>
              <th className="text-right py-2">O</th>
              <th className="text-right py-2">M</th>
              <th className="text-right py-2">R</th>
              <th className="text-right py-2">W</th>
              <th className="text-right py-2">Econ</th>
            </tr>
          </thead>
          <tbody>
            {innings.bowlers
              .filter(bowler => bowler.overs > 0 && bowler.runs !== undefined) // Ensure valid data
              .map((bowler, index) => (
                <tr key={index} className={`border-b last:border-0 ${bowler.isActiveBowler ? 'bg-green-50' : ''}`}>
                  <td className="py-2 text-left">
                    <div className="flex items-center">
                      <span>{bowler.bowlerName}</span>
                      {bowler.isActiveBowler && <span className="ml-2 text-green-500">*</span>}
                    </div>
                  </td>
                  <td className="py-2 text-right">{bowler.overs}</td>
                  <td className="py-2 text-right">{bowler.maidens}</td>
                  <td className="py-2 text-right">{bowler.runs}</td>
                  <td className="py-2 text-right">{bowler.wickets}</td>
                  <td className="py-2 text-right">
                    {bowler.overs > 0 ? (bowler.runs / bowler.overs).toFixed(1) : '0.0'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
