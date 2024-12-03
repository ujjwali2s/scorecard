import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import OddsTable from "./OddsTable.jsx";

function EventList({ events }) {
  const navigate = useNavigate(); // Initialize navigate

  const handleEventClick = (sportRadarId) => {
    if (sportRadarId) {
      // Navigate to the scorecard page with the sportRadarId
      navigate(`/get_scorecard/${sportRadarId}`);
    }
  };

  // Function to convert timestamp to IST
  const convertToIST = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      
    });
  };

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="p-4 bg-black shadow-md rounded-md border cursor-pointer"
          onClick={() => handleEventClick(event.sport_radar_id)} // Add click handler
        >
          <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
          <p className="text-sm text-gray-600">
            League: {event.league_name} | Status:{" "}
            <span className="font-medium">{event.data?.status || "N/A"}</span> | ID:{" "}
            {event.sport_radar_id || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Event Time (IST):{" "}
            {event.event_timestamp_date
              ? convertToIST(event.event_timestamp_date)
              : "N/A"}
          </p>
          {event.data?.runners ? (
            <OddsTable
              runners={event.data.runners}
              eventName={event.event_name} // Pass eventName as a prop to OddsTable
              team1={event.team1} // Pass extracted team names
              team2={event.team2}
            />
          ) : (
            <p className="text-gray-500 text-sm mt-2">Odds data not available.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default EventList;
