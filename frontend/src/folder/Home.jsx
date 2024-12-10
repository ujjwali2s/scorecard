import React, { useEffect, useState } from "react";
import EventList from "./EventList.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  const fetchEvents = () => {
    fetch("http://3.110.166.187:5000/api/events")  // Fetch from your backend API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Since the backend API already returns sorted and filtered events,
        // you can directly use them in your frontend.
        // Map through events and extract team names
        const eventsWithTeams = data.map((event) => {
          const [team1, team2] = event.event_name
            ? event.event_name.split(/ vs\.| v /).map((name) => name.trim())
            : ["Team 1", "Team 2"]; // Fallback in case eventName is not valid

          return { ...event, team1, team2 }; // Add team names to the event object
        });

        // Update state with new events
        setEvents(eventsWithTeams);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  };

  // Trigger fetch events when the component mounts
  useEffect(() => {
    fetchEvents(); // Initial call to fetch events

    // Set interval to call fetchEvents every second
    const intervalId = setInterval(fetchEvents, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it only runs once on mount

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  }

  return (
    <div className="p-6 bg-red-800 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Sports Events & Odds</h1>
      <EventList events={events} />
    </div>
  );
}

export default App;
