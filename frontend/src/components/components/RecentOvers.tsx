export function RecentOvers({ overs, selectedInning }: RecentOversProps) {
  if (!overs || overs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Overs</h3>
        <div className="text-gray-500">No recent overs data available</div>
      </div>
    );
  }

  // Reverse the overs to display the most recent first
  const recentOvers = [...overs].reverse();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Overs</h3>
      <div className="space-y-4">
        {recentOvers.map((over, index) => {
          // Select the relevant balls for the current inning
          const ballsData = selectedInning === 1 ? over.firstInnings : over.secondInnings;

          // Skip over if there is no balls data
          if (!ballsData || ballsData.length === 0 || ballsData.split(',').every(ball => !ball.trim())) {
            return null;  // Skip rendering this over if no balls data
          }

          // Calculate total runs for this over
          const runs = ballsData
            .split(',')
            .filter(ball => ball && !ball.includes('s'))  // Exclude invalid balls (like 'l')
            .reduce((total, ball) => {
              // Add runs based on ball type
              if (ball === 'w') return total; // Skip wickets
              if (ball === '4') return total + 4;
              if (ball === '6') return total + 6;
              if (ball === '1n2') return total + 3;
              if (ball === '1n3') return total + 4;
              if (ball === '1n1') return total + 2;
              if (ball === '1n4') return total + 5;
              if (ball === '1n6') return total + 7;
              const num = parseInt(ball, 10);
              return isNaN(num) ? total : total + num; // Add runs if it's a number
            }, 0);

          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${over.isCurrentOver ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-black">Over {over.overNumber || 'N/A'}</span>
                <span className="text-green-600 font-medium">{runs} runs</span>
              </div>
              <div className="flex gap-2">
                {ballsData.split(',').filter(ball => ball && !ball.includes("s")).map((ball, ballIndex) => (
                  <div
                    key={ballIndex}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${ball === 'w' ? 'bg-red-100 text-red-600' :
                      ball === '4' || ball === '6' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {ball}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
