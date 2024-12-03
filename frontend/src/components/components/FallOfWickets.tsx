import React from 'react';

interface FallOfWicketsProps {
  fallOfWickets: string; // The fall of wickets data (e.g., "T Banton singh 15/1 (1.1), Shadab Khan mk 17/2 (1.4)")
}

const FallOfWickets: React.FC<FallOfWicketsProps> = ({ fallOfWickets }) => {
  const wickets = fallOfWickets.split(',').map((entry) => {
    const match = entry.trim().match(/^(.*?)(\d+\/\d+)\s+\(([\d.]+)\)$/);
    if (match) {
      const batsman = match[1].trim(); // Everything before runs
      const runs = match[2];          // Runs (e.g., "15/1")
      const over = match[3];          // Over (e.g., "1.1")
      return { batsman, runs, over };
    }
    return null; // Handle malformed entries
  }).filter(Boolean); // Remove null values

  return (
    <div>
      <h3 className="text-xl font-bold">Fall of Wickets</h3>
      <table className="table-auto w-full mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Batsman</th>
            <th className="border px-4 py-2">Runs</th>
            <th className="border px-4 py-2">Over</th>
          </tr>
        </thead>
        <tbody>
          {wickets.map((wicket, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{wicket?.batsman}</td>
              <td className="border px-4 py-2">{wicket?.runs}</td>
              <td className="border px-4 py-2">{wicket?.over}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FallOfWickets;
