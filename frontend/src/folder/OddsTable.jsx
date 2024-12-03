import React from "react";

function OddsTable({ runners, eventName, team1, team2 }) {
  // Ensure there are exactly 2 teams, or handle a draw if there are 3 runners
  const drawRow = runners.length === 3;

  return (
    <table className="w-full mt-4 text-left border-collapse">
      <thead>
        <tr className="bg-black">
          <th className="p-2 border">Team</th>
          <th className="p-2 border">Back</th>
          <th className="p-2 border">Lay</th>
        </tr>
      </thead>
      <tbody>
        {runners.slice(0, 2).map((runner, index) => (
          <tr key={index} className="">
            <td className="p-2 border">{index === 0 ? team1 : team2}</td>
            <td className="p-2 border">
              {runner.ex?.availableToBack?.[0]?.price || "N/A"}
            </td>
            <td className="p-2 border">
              {runner.ex?.availableToLay?.[0]?.price || "N/A"}
            </td>
          </tr>
        ))}
        {drawRow && (
          <tr className="">
            <td className="p-2 border">Draw</td>
            <td className="p-2 border">
              {runners[2]?.ex?.availableToBack?.[0]?.price || "N/A"}
            </td>
            <td className="p-2 border">
              {runners[2]?.ex?.availableToLay?.[0]?.price || "N/A"}
              
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default OddsTable;
