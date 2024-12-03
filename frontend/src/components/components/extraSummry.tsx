import React from "react";

interface ExtrasSummaryProps {
  extrasSummary: {
    byes: number;
    noBalls: number;
    legByes: number;
    wides: number;
    penalties: number;
  };
}

const ExtrasSummary: React.FC<ExtrasSummaryProps> = ({ extrasSummary }) => {
  // Calculate the total extras
  const totalExtras = 
    extrasSummary.byes + 
    extrasSummary.noBalls + 
    extrasSummary.legByes + 
    extrasSummary.wides + 
    extrasSummary.penalties;

  return (
    <div>
      <h3 className="text-xl font-bold">Extras Summary</h3>
      <ul className="mt-2">
        <p>
          (<span>B:{extrasSummary.byes}</span>, 
          <span> NB:{extrasSummary.noBalls}</span>, 
          <span> LB:{extrasSummary.legByes} </span>, 
          <span> W:{extrasSummary.wides}</span>, 
          <span> P:{extrasSummary.penalties}</span>)
        </p>
        <p className="mt-2 font-semibold">Total Extras: {totalExtras}</p>
      </ul>
    </div>
  );
};

export default ExtrasSummary;
