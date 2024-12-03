import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CricketBall, Target, Timer } from 'lucide-react';
import { BattingCard } from './BattingCard';
import { BowlingCard } from './BowlingCard';
import { MatchHeader } from './MatchHeader';
import { RecentOvers } from './RecentOvers';
import { TeamInnings } from './TeamInnings';
import FallOfWickets from './FallOfWickets'; // Import the FallOfWickets component
import ExtrasSummary from './extraSummry'; // Import the ExtrasSummary component

export function ScoreCard() {
  const { matchId } = useParams();
  const [score, setScore] = useState(null);
  const [odds, setOdds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oddsLoading, setOddsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInning, setSelectedInning] = useState(1);

  const fetchScoreData = async () => {
    try {
      const headers = {
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
      };

      const response = await axios.get(`http://localhost:5000/get_scorecard/${matchId}`, { headers });
      setScore(response.data.doc[0].data.score);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching score data:', err.response || err);
      setError('Failed to fetch match data.');
      setLoading(false);
    }
  };

  const fetchOddsData = async () => {
    try {
      const headers = {
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
      };

      const response = await axios.get(`http://localhost:5000/get_odds/${matchId}`, { headers });
      setOdds(response.data);
      setOddsLoading(false);
    } catch (err) {
      console.error('Error fetching odds data:', err.response || err);
      setOddsLoading(false);
    }
  };

  useEffect(() => {
    fetchScoreData();
    fetchOddsData();

    const interval = setInterval(fetchScoreData, 1000);
    return () => clearInterval(interval);
  }, [matchId]);

  if (loading) {
    return <div>Loading match data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!score || !score.innings) {
    return <div>No match data available.</div>;
  }

  const currentInning = score.innings[selectedInning - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-black p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Odds</h2>
      {oddsLoading ? (
        <div className="text-white">Loading odds...</div>
      ) : odds ? (
        <div>
          <p className="text-lg text-gray-200 font-semibold mb-4">
            Event: <span className="text-green-400">{odds.eventName}</span>
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white border border-gray-700 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2 text-left">Team</th>
                  <th className="px-4 py-2 text-left">Back Odds</th>
                  <th className="px-4 py-2 text-left">Lay Odds</th>
                </tr>
              </thead>
              <tbody>
                {odds.teamsWithOdds.map((team, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700`}
                  >
                    <td className="px-4 py-2 font-medium">{team.teamName}</td>
                    <td className="px-4 py-2">{team.odds_back[0]}</td>
                    <td className="px-4 py-2">{team.odds_lay[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-white">No odds data available.</div>
      )}
    </div>
        <MatchHeader title={score.matchTitle} commentary={score.matchCommentary} />

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${selectedInning === 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setSelectedInning(1)}
          >
            Inning 1
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedInning === 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setSelectedInning(2)}
          >
            Inning 2
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {score.innings.map((innings, index) => (
            <TeamInnings
              key={index}
              teamName={innings.teamName}
              score={`${innings.runs || 0}/${innings.wickets || 0}`}
              overs={`${innings.overs || 0}`}
              target={innings.target || "-"}
              isCurrentInnings={index === (score.currentInningsNumber - 1)}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6 text-black">
            {currentInning && <BattingCard innings={currentInning} />}
            {currentInning && <BowlingCard innings={currentInning} />}
            {currentInning && currentInning.fallOfwickets && (
              <FallOfWickets fallOfWickets={currentInning.fallOfwickets} />
            )}
            {currentInning && currentInning.extrasSummary && (
              <ExtrasSummary extrasSummary={currentInning.extrasSummary} />
            )}
          </div>

          <div className="space-y-6">
            {score.ballByBallSummaries && <RecentOvers overs={score.ballByBallSummaries} selectedInning={selectedInning} />}
          </div>
        </div>

        {/* Odds Section */}
     
      </div>
    </div>
  );
}

export default ScoreCard;
