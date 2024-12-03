import { useState, useEffect } from 'react';
import axios from 'axios';

export function OddsSection({ matchId }) {
  const [oddsData, setOddsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the odds data when the component mounts
    const fetchOdds = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get_odds/${matchId}`);
        setOddsData(response.data); // Store the odds data in state
      } catch (err) {
        setError('Failed to fetch odds data.');
      }
    };

    if (matchId) {
      fetchOdds(); // Only fetch if matchId is provided
    }
  }, [matchId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!oddsData) {
    return <div>Loading odds...</div>;
  }

  return (
    <div className="odds-section p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Odds</h3>
      <div className="grid grid-cols-2 gap-4">
        {oddsData.map((team, index) => (
          <div key={index} className="odds-card p-2 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium">{team.teamName}</h4>
            <p>Odds: {team.odds.join(', ')}</p> {/* Display odds for the team */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default OddsSection;