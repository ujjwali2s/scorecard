const express = require('express');
const axios = require('axios'); // Make sure to import axios
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/get_scorecard/:match_id?', async (req, res) => {
    // Authentication token
    const authToken = "exp=1733226610~acl=/*~data=eyJvIjoiaHR0cHM6Ly9zY29yZWNhcmQub2Rkc3RyYWQuY29tIiwiYSI6IjhlZTQ1YjU3NGUyNzgxZDU4MWIwYjBhMTMzODAzOTA2IiwiYWN0Ijoib3JpZ2luY2hlY2siLCJvc3JjIjoib3JpZ2luIn0~hmac=810ade25c03cd7dc7163fecf0e8145f0095237ca50ae708d8c8b15ae0037403d";
    
    const matchId = req.params.match_id || 55600973; // Default matchId if not provided

    const url = `https://lmt.fn.sportradar.com/common/en/Etc:UTC/cricket/get_scorecard/${matchId}?T=${authToken}`;

    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Origin": "https://scorecard.oddstrad.com"
    };

    try {
        const response = await axios.get(url, { headers });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

const fetchEvents = async () => {
  try {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
    };

    const response = await axios.get('https://rocky365.com/global/get-events-for-sport', { headers });

    const events = response.data.events;

    const openEvents = events.filter(
      (event) =>
        event.sport_id === 4 &&
        event.data &&
        event.data.status === 'OPEN'
    );

    const sortedEvents = openEvents.sort((a, b) => a.event_timestamp_date - b.event_timestamp_date);

    const eventsWithTeams = sortedEvents.map((event) => {
      const [team1, team2] = event.event_name
        ? event.event_name.split(/ vs\.| v /).map((name) => name.trim())
        : ["Team 1", "Team 2"];

      return { ...event, team1, team2 };
    });

    return eventsWithTeams;

  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Error fetching events');
  }
};

app.get('/events', async (req, res) => {
  try {
    const events = await fetchEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events.' });
  }
});


app.get('/get_odds/:sportRadarId', async (req, res) => {
  const { sportRadarId } = req.params;
  const oddsApiUrl = 'https://rocky365.com/global/get-events-for-sport';

  try {
    // Fetch data from the API
    const response = await axios.get(oddsApiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const { events } = response.data;

    // Find the event with the specified sport_radar_id
    const event = events.find(
      (e) => e.sport_radar_id === parseInt(sportRadarId, 10)
    );

    if (event && event.data && event.data.runners) {
      // Split event_name to get team names
      const [team1, team2] = event.event_name
        ? event.event_name.split(/ vs\.| v /).map((name) => name.trim())
        : ["Team 1", "Team 2"];

      // Map runners data to extract odds
      const runnersData = event.data.runners.map((runner, index) => ({
        teamName: index === 0 ? team1 : team2,
        odds_back: runner.ex.availableToBack.map((odd) => odd.price),
        odds_lay: runner.ex.availableToLay.map((odd) => odd.price),
      }));

      // Respond with runners data
      return res.json({
        eventName: event.event_name,
        teamsWithOdds: runnersData,
        team1,
        team2,
      });
    }

    // Respond with a 404 if no matching event or runners are found
    res.status(404).json({ message: 'Event or odds not found' });
  } catch (error) {
    // Log error and respond with a 500 status
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ message: 'Error fetching odds data' });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
