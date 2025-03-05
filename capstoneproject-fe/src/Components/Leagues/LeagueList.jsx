import React, { useState } from "react";
import "../../Styles/Leagues/LeagueList.css";

const leagues = [
  { name: "Central Virginia Soccer Association - CVSA", sport: "soccer", type: "rec", division: "adult" },
  { name: "Sports Center of Richmond - SCOR", sport: "soccer", type: "rec", division: ["adult", "youth"] },
  { name: "XL Sports", sport: "soccer", type: "rec", division: ["youth", "adult"] },
  { name: "YMCA", sport: "soccer", type: "rec", division: "youth" },
  { name: "FC Richmond", sport: "soccer", type: "travel", division: "youth" },
  { name: "Richmond Strickers", sport: "soccer", type: "travel", division: "youth" },
  { name: "Richmond Kickers", sport: "soccer", type: "travel", division: "adult" },
  { name: "Bon Air Basketball", sport: "basketball", type: "rec", division: "youth" },
  { name: "Big Ben's Home Court", sport: "basketball", type: "rec", division: "adult" },
  { name: "Richmond Volleyball Club - RVC", sport: "volleyball", type: "rec", division: ["adult", "youth"] },
  { name: "XZone Volleyball Club", sport: "volleyball", type: "rec", division: "youth" },
  { name: "Relentless", sport: "field hockey", type: "rec", division: "youth" },
  { name: "Panthers", sport: "field hockey", type: "travel", division: "youth" },
  { name: "Performance PickleBall", sport: "pickleball", type: "rec", division: "adult" },
  { name: "River City Sport & Social Club", sport: "social clubs", type: "rec", division: "adult" },
  { name: "NOVA Swim", sport: "swimming", type: "rec", division: "youth" },
  { name: "ULAX", sport: "lacrosse", type: "rec", division: "adult" },
  { name: "Fusion Lacrosse", sport: "lacrosse", type: "travel", division: "youth" },
  
];

const LeagueList = () => {
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [sport, setSport] = useState("");

   // Filtering logic (allows leagues with multiple types/divisions)
   const filteredLeagues = leagues.filter(
    (league) =>
      (type === "" || league.type.includes(type)) &&
      (division === "" || league.division.includes(division)) &&
      (sport === "" || league.sport === sport)
  );

  return (
    <div className="league-container">
      <h1>Here are some local leagues for you to look into:</h1>

      {/* Filters Row */}
      <div className="filters-row">
        <div className="filter">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="rec">Recreational</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div className="filter">
          <label>Division:</label>
          <select value={division} onChange={(e) => setDivision(e.target.value)}>
            <option value="">All</option>
            <option value="adult">Adult</option>
            <option value="youth">Youth</option>
          </select>
        </div>

        <div className="filter">
          <label>Sport:</label>
          <select value={sport} onChange={(e) => setSport(e.target.value)}>
            <option value="">All</option>
            <option value="soccer">Soccer</option>
            <option value="basketball">Basketball</option>
            <option value="volleyball">Volleyball</option>
            <option value="pickleball">Pickleball</option>
            <option value="tennis">Tennis</option>
            <option value="field hockey">Field Hockey</option>
            <option value="lacrosse">Lacrosse</option>
            <option value="social clubs">Social Clubs</option>
            <option value="swimming">Swimming</option>
          </select>
        </div>
      </div>

      {/* League List */}
      <div className="league-lists">
        {filteredLeagues.length > 0 ? (
          filteredLeagues.map((league, index) => (
            <div key={index} className="league-item">
              <h3>{league.sport.charAt(0).toUpperCase() + league.sport.slice(1)}:</h3>
              <ul>
                <li>{league.name}</li>
              </ul>
            </div>
          ))
        ) : (
          <p>No leagues found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default LeagueList;
