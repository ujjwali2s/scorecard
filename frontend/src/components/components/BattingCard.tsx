interface Batsman {
  batsmanName: string;
  description: string;
  active: boolean;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  didNotBat: boolean;
}

interface BattingCardProps {
  innings: {
    batsmen: Batsman[];
  };
}

export function BattingCard({ innings }: BattingCardProps) {
  
  

  if (!innings || !innings.batsmen || innings.batsmen.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Batting</h3>
        <div className="text-gray-500">No batting data available</div>
      </div>
    );
  }

  const filteredBatsmen = innings.batsmen.filter(b => !b.didNotBat && b.balls > 0);

  if (filteredBatsmen.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Batting</h3>
        <div className="text-gray-500">No batsmen data to display</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg text-black font-semibold mb-4">Batting</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-xs text-black border-b">
              <th className="text-left py-2">Batter</th>
              <th className="text-right py-2">R</th>
              <th className="text-right py-2">B</th>
              <th className="text-right py-2">4s</th>
              <th className="text-right py-2">6s</th>
              <th className="text-right py-2">SR</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatsmen.map((batsman, index) => (
              <tr key={index} className={`border-b last:border-0 ${batsman.active ? 'bg-green-50' : ''}`}>
                <td className="py-2 text-left">
                  <div className="flex items-center">
                    <span>{batsman.batsmanName}</span>
                    {batsman.active && <span className="ml-2 text-green-500">*</span>}
                  </div>
                  <div className="text-xs text-black">{batsman.description}</div>
                </td>
                <td className="py-2 text-right">{batsman.runs}</td>
                <td className="py-2 text-right">{batsman.balls}</td>
                <td className="py-2 text-right">{batsman.fours}</td>
                <td className="py-2 text-right">{batsman.sixes}</td>
                <td className="py-2 text-right">
                  {batsman.balls > 0 ? ((batsman.runs / batsman.balls) * 100).toFixed(1) : '0.0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
