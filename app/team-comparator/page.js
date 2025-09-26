'use client';

import { useState, useEffect, useMemo } from 'react';
import { teamsData, getTeamsByRegion, getTeamByName, calculateWinProbability, analyzeKeyFactors} from '../../lib/teamsData';

const TeamSelector = ({selectedTeam, onSelectTeam, label, id }) => {
  const teamsByRegion = useMemo(() => getTeamsByRegion(), []);
  
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-100 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={selectedTeam?.name || ''}
          onChange={(e) => {
            const team = getTeamByName(e.target.value);
            onSelectTeam(team);
          }}
          className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-lg px-4 py-3 
                    focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 
                    shadow-lg hover:shadow-red-900/30 hover:border-red-500 appearance-none"
          aria-label={`Select ${label}`}
        >
          <option value="">Select a team</option>
          {Object.entries(teamsByRegion).map(([region, regionTeams]) => (
            <optgroup key={region} label={region}>
              {regionTeams.map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-md shadow-lg border border-gray-700 -translate-x-1/2 left-1/2">
          {content}
        </div>
      )}
    </div>
  );
};

const TeamOverviewCard = ({ team }) => {
  if (!team) return null;
  
  const tierColors = {
    S: 'from-red-600 to-red-400 border-red-500',
    A: 'from-yellow-600 to-yellow-400 border-yellow-500',
    B: 'from-blue-600 to-blue-400 border-blue-500',
    C: 'from-green-600 to-green-400 border-green-500'
  };
  
  const tierTextColors = {
    S: 'text-red-400',
    A: 'text-yellow-400',
    B: 'text-blue-400',
    C: 'text-green-400'
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 shadow-xl 
                    border-2 border-gray-700 w-full transform transition-all duration-300 
                    hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-900/20">
      <div className="flex items-center mb-5">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl 
                       flex items-center justify-center mr-4 overflow-hidden shadow-lg 
                       border-2 border-gray-700 p-1">
          <img 
            src={team.logo || "/images/teams/placeholder.svg"} 
            alt={`${team.name} logo`}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/teams/placeholder.svg";
            }}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{team.name}</h3>
          <p className="text-gray-400 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            {team.region}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-3 shadow-md border border-gray-600 transform transition-all duration-300 hover:shadow-lg">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Championship Points</p>
          <p className="text-xl font-bold text-white">{team.championshipPoints}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-3 shadow-md border border-gray-600 transform transition-all duration-300 hover:shadow-lg">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Form Score</p>
          <p className="text-xl font-bold text-white">{team.formScore}<span className="text-sm text-gray-500">/10</span></p>
        </div>
        <div className={`bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-3 shadow-md border border-gray-600 transform transition-all duration-300 hover:shadow-lg`}>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Predicted Tier</p>
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${tierColors[team.tier]} mt-1`}>
            <span className={`text-lg font-bold text-white`}>{team.tier}</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-3 shadow-md border border-gray-600 transform transition-all duration-300 hover:shadow-lg">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Championship %</p>
          <div className="flex items-center">
            <p className="text-xl font-bold text-white">{team.championshipProbability}%</p>
            <div className="ml-2 w-full max-w-[60px] bg-gray-600 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-red-400"
                style={{ width: `${team.championshipProbability}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {team.characteristics.map((trait, index) => (
          <span key={index} className="text-xs bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 
                                      px-3 py-1.5 rounded-full border border-gray-600 shadow-sm
                                      transition-all duration-300 hover:shadow-md hover:border-red-500">
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
};

const StatRow = ({ label, team1Value, team2Value, tooltipContent, team1, team2 }) => {
  const team1Percent = parseFloat(team1Value);
  const team2Percent = parseFloat(team2Value);
  const team2Better = team2Percent > team1Percent;
  const difference = Math.abs(team1Percent - team2Percent);
  const significantDifference = difference > 5;

  return (
    <div 
      className="grid grid-cols-[200px_1fr_1fr] gap-4 items-center py-4 px-6 bg-gray-900 border border-gray-800 rounded-lg mb-3 hover:bg-gray-850 transition-colors duration-200 relative" 
      role="group" 
      aria-label={`${label} comparison`}
    >
      <div className="flex items-center">
        <span 
          className="text-sm font-semibold text-teal-300 pr-2 cursor-pointer relative"
          onMouseEnter={(e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-10 bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg whitespace-nowrap mt-2 left-0';
            tooltip.textContent = tooltipContent;
            e.currentTarget.appendChild(tooltip);
          }}
          onMouseLeave={(e) => {
            const tooltip = e.currentTarget.querySelector('div');
            if (tooltip) tooltip.remove();
          }}
        >
          {label}
        </span>
      </div>

      <div className="relative flex items-center">
        <div className="w-full h-8 bg-gray-700 rounded-md overflow-hidden shadow-inner" role="progressbar">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-700 ease-out flex items-center justify-center"
            style={{ width: `${team1Percent}%` }}
          >
            <span className="text-white text-sm font-semibold z-10">
              {team1Value}%
            </span>
          </div>
        </div>
      </div>
      <div className="relative flex items-center">
        <div className="w-full h-8 bg-gray-700 rounded-md overflow-hidden shadow-inner" role="progressbar">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700 ease-out flex items-center justify-center"
            style={{ width: `${team2Percent}%` }}
          >
            <span className="text-white text-sm font-semibold z-10">
              {team2Value}%
            </span>
          </div>
        </div>
        {significantDifference && team2Better && (
          <div className="w-1 h-8 bg-teal-400 rounded-full ml-2"></div>
        )}
      </div>
    </div>
  );
};

const MapGrid = ({ team1, team2, selectedMaps, setSelectedMaps }) => {
  if (!team1 || !team2) return null;
  
  const maps = ['Abyss', 'Ascent', 'Bind', 'Corrode', 'Haven', 'Lotus', 'Sunset'];
  
  const getWinRateColor = (winRate) => {
    if (winRate >= 70) return 'from-green-600 to-green-400 border-green-500';
    if (winRate >= 60) return 'from-yellow-600 to-yellow-400 border-yellow-500';
    return 'from-red-600 to-red-400 border-red-500';
  };
  
  const getAdvantageTeam = (map) => {
    if (team1.mapPool[map].advantage && !team2.mapPool[map].advantage) return 'team1';
    if (!team1.mapPool[map].advantage && team2.mapPool[map].advantage) return 'team2';
    if (team1.mapPool[map].winRate > team2.mapPool[map].winRate + 5) return 'team1';
    if (team2.mapPool[map].winRate > team1.mapPool[map].winRate + 5) return 'team2';
    return 'none';
  };
  
  const toggleMapSelection = (map) => {
    if (selectedMaps.includes(map)) {
      setSelectedMaps(selectedMaps.filter(m => m !== map));
    } else {
      setSelectedMaps([...selectedMaps, map]);
    }
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Map Selection</h3>
        <button 
          onClick={() => setSelectedMaps(selectedMaps.length === maps.length ? [] : [...maps])}
          className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg text-sm font-medium border border-gray-600 hover:border-teal-500 transition-all duration-300"
        >
          {selectedMaps.length === maps.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8" role="region" aria-label="Map Pool Comparison">
        {maps.map((map) => {
          const advantageTeam = getAdvantageTeam(map);
          const isSelected = selectedMaps.includes(map);
          
          const borderClass = isSelected
            ? 'border-teal-500'
            : advantageTeam === 'team1' 
              ? 'border-red-500' 
              : advantageTeam === 'team2' 
                ? 'border-blue-500' 
                : 'border-gray-600';
                
          const shadowClass = isSelected
            ? 'shadow-lg shadow-teal-900/30'
            : advantageTeam === 'team1' 
              ? 'shadow-lg shadow-red-900/20' 
              : advantageTeam === 'team2' 
                ? 'shadow-lg shadow-blue-900/20' 
                : 'shadow-lg';
          
          return (
            <div 
              key={map} 
              className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border-2 ${borderClass} ${shadowClass}
                        transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer
                        ${isSelected ? 'ring-2 ring-teal-500 ring-opacity-50' : ''}`}
              aria-label={`${map} map comparison`}
              onClick={() => toggleMapSelection(map)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">{map}</h4>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center 
                               ${isSelected ? 'bg-teal-500' : 'bg-gray-700 border border-gray-600'}`}>
                  {isSelected && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-700 my-2"></div>
              
              <div className="flex justify-between items-center mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                               ${team1.mapPool[map].advantage ? 
                                 'bg-gradient-to-r from-red-600 to-red-400 shadow-md shadow-red-900/30' : 
                                 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600'}`}
                   aria-label={team1.mapPool[map].advantage ? `${team1.name} has map advantage` : ""}
                >
                  {team1.mapPool[map].advantage && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-300 font-medium">Win Rate</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                               ${team2.mapPool[map].advantage ? 
                                 'bg-gradient-to-r from-blue-600 to-blue-400 shadow-md shadow-blue-900/30' : 
                                 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600'}`}
                   aria-label={team2.mapPool[map].advantage ? `${team2.name} has map advantage` : ""}
                >
                  {team2.mapPool[map].advantage && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className={`text-center px-3 py-1.5 rounded-lg text-xs font-medium text-white 
                               bg-gradient-to-r ${getWinRateColor(team1.mapPool[map].winRate)} shadow-md
                               transform transition-all duration-300 hover:shadow-lg`}
                   aria-label={`${team1.name} win rate: ${team1.mapPool[map].winRate}%`}
                >
                  {team1.mapPool[map].winRate}%
                </div>
                <div className="mx-1 text-gray-400 font-bold">vs</div>
                <div className={`text-center px-3 py-1.5 rounded-lg text-xs font-medium text-white 
                               bg-gradient-to-r ${getWinRateColor(team2.mapPool[map].winRate)} shadow-md
                               transform transition-all duration-300 hover:shadow-lg`}
                   aria-label={`${team2.name} win rate: ${team2.mapPool[map].winRate}%`}
                >
                  {team2.mapPool[map].winRate}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PredictionPanel = ({ team1, team2, selectedMaps }) => {
  if (!team1 || !team2) return null;
  const calculateMapBasedProbability = () => {
    if (!selectedMaps || selectedMaps.length === 0) {
      return calculateWinProbability(team1, team2);
    }
    

    let team1Score = 0;
    let team2Score = 0;
    
    selectedMaps.forEach(map => {

      const team1WinRate = team1.mapPool[map].winRate;
      const team2WinRate = team2.mapPool[map].winRate;
      team1Score += team1WinRate * (team1.mapPool[map].advantage ? 1.2 : 1);
      team2Score += team2WinRate * (team2.mapPool[map].advantage ? 1.2 : 1);
    });

    const totalScore = team1Score + team2Score;
    const team1Probability = Math.round((team1Score / totalScore) * 100);
    const team2Probability = 100 - team1Probability;
    
    return { team1Probability, team2Probability };
  };
  
  const { team1Probability, team2Probability } = calculateMapBasedProbability();
  const keyFactors = analyzeKeyFactors(team1, team2);
  const predictedWinner = team1Probability > team2Probability ? team1 : team2;
  const winnerProbability = Math.max(team1Probability, team2Probability);
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-gray-700 mb-8 shadow-xl transform transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">Head-to-Head Prediction</h3>
      
      {/* Predicted Winner */}
      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm mb-1">Predicted Winner</p>
        <p className="text-xl font-bold text-teal-400">{predictedWinner.name}</p>
        <p className="text-teal-500 font-medium">{winnerProbability}%</p>
      </div>
      
      <div className="flex items-center mb-8">
        <div className="w-32 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-900 to-red-800 rounded-xl 
                         flex items-center justify-center overflow-hidden shadow-lg 
                         border-2 border-gray-700 p-1 mb-2">
            <img 
              src={team1.logo || "/images/teams/placeholder.svg"} 
              alt={`${team1.name} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/teams/placeholder.svg";
              }}
            />
          </div>
          <span className="text-lg font-bold text-white block">{team1.name}</span>
          <span className={`text-${team1Probability > team2Probability ? 'red' : 'gray'}-400 font-medium`}>{team1Probability}%</span>
        </div>
        
        <div className="flex-1 mx-6">
          <div className="relative h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl overflow-hidden shadow-lg border border-gray-600">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-700 to-red-500 rounded-l-xl transition-all duration-1000 ease-in-out"
              style={{ width: `${team1Probability}%` }}
            ></div>
            <div 
              className="absolute top-0 right-0 h-full bg-gradient-to-l from-blue-700 to-blue-500 rounded-r-xl transition-all duration-1000 ease-in-out"
              style={{ width: `${team2Probability}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-900 rounded-full px-4 py-1 shadow-lg border border-gray-700">
                <span className="text-white font-bold">VS</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-32 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl 
                         flex items-center justify-center overflow-hidden shadow-lg 
                         border-2 border-gray-700 p-1 mb-2">
            <img 
              src={team2.logo || "/images/teams/placeholder.svg"} 
              alt={`${team2.name} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/teams/placeholder.svg";
              }}
            />
          </div>
          <span className="text-lg font-bold text-white block">{team2.name}</span>
          <span className={`text-${team2Probability > team1Probability ? 'blue' : 'gray'}-400 font-medium`}>{team2Probability}%</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 shadow-lg border border-gray-600">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Key Factors
          <Tooltip content="Key factors that influence the prediction based on team statistics and map selection">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Tooltip>
        </h4>
        <ul className="space-y-3">
          {keyFactors.map((factor, index) => (
            <li key={index} className="text-sm text-gray-300 flex items-start bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-2 rounded-lg border border-gray-700 shadow-sm transform transition-all duration-300 hover:shadow-md hover:border-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function TeamComparator() {
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMaps, setSelectedMaps] = useState([]);
  
  useEffect(() => {
    if (selectedTeam1 !== null && selectedTeam2 !== null) {
      setIsLoading(true);

      if (selectedTeam1.mapPool && selectedTeam2.mapPool) {
        const allMaps = Object.keys(selectedTeam1.mapPool)
          .filter(map => Object.keys(selectedTeam2.mapPool).includes(map));
        setSelectedMaps(allMaps);
      }
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [selectedTeam1, selectedTeam2]);

  const handleTeamSelection = (team, teamNumber) => {
    if (teamNumber === 1) {
      setSelectedTeam1(team);
    } else {
      setSelectedTeam2(team);
    }
  };

  const swapTeams = () => {
    setIsLoading(true);
    setTimeout(() => {
      const temp = selectedTeam1;
      setSelectedTeam1(selectedTeam2);
      setSelectedTeam2(temp);
    }, 300);
  };

  const getStatTooltip = (statKey) => {
    const tooltips = {
      mapWinRate: "Percentage of maps won across all competitions",
      roundWinRate: "Percentage of rounds won across all maps",
      attackWinRate: "Percentage of attack rounds won",
      defenseWinRate: "Percentage of defense rounds won",
      pistolRoundWinRate: "Percentage of pistol rounds won",
      clutchWinRate: "Percentage of 1vX situations won",
      firstBloodRate: "Percentage of rounds where team gets the first kill",
      averageRoundDifference: "Average round score difference in map wins"
    };
    
    return tooltips[statKey] || "No description available";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
          VCT 2025 Champions Team Comparator
        </h1>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 mb-8 border-2 border-gray-700 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <TeamSelector
              teams={teamsData}
              selectedTeam={selectedTeam1}
              onSelectTeam={(team) => handleTeamSelection(team, 1)}
              label="Team 1"
              id="team1-selector"
            />
            
            <button
              onClick={swapTeams}
              disabled={!selectedTeam1 || !selectedTeam2}
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white p-3 rounded-full 
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 
                        shadow-lg hover:shadow-red-900/30 disabled:hover:scale-100"
              aria-label="Swap teams"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            
            <TeamSelector
              teams={teamsData}
              selectedTeam={selectedTeam2}
              onSelectTeam={(team) => handleTeamSelection(team, 2)}
              label="Team 2"
              id="team2-selector"
            />
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-16 animate-pulse">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-red-500 border-r-blue-500 border-b-red-500 border-l-blue-500 rounded-full animate-spin transition-all duration-300"></div>
            <h2 className="text-xl font-semibold text-gray-300">Loading comparison data...</h2>
          </div>
        )}

        {(!selectedTeam1 || !selectedTeam2) && !isLoading && (
          <div className="text-center py-16 animate-fade-in duration-500 transform transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">Select Two Teams to Compare</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Choose two teams from the selectors above to see a detailed head-to-head comparison and match prediction.
            </p>
          </div>
        )}

        {selectedTeam1 && selectedTeam2 && !isLoading && (
          <div className="animate-fade-in duration-500 transform transition-all">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <TeamOverviewCard team={selectedTeam1} />
              <TeamOverviewCard team={selectedTeam2} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-5 border-b border-gray-700 pb-2">Map Pool Comparison</h3>
            {selectedTeam1 && selectedTeam2 && (
              <div className="mb-8">
                <MapGrid 
                  team1={selectedTeam1} 
                  team2={selectedTeam2} 
                  selectedMaps={selectedMaps}
                  setSelectedMaps={setSelectedMaps}
                />
              </div>
            )}

            <PredictionPanel 
              team1={selectedTeam1} 
              team2={selectedTeam2} 
              selectedMaps={selectedMaps}
            />

            <h3 className="text-2xl font-bold text-white mb-5 border-b border-gray-700 pb-2">Core Statistics</h3>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 border-2 border-gray-700 shadow-xl">
              
              {selectedTeam1 && selectedTeam2 && Object.entries(selectedTeam1.stats).map(([key, value], index) => (
                <div key={key} className="transform transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                  <StatRow
                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    team1Value={value}
                    team2Value={selectedTeam2.stats[key]}
                    tooltipContent={getStatTooltip(key)}
                    team1={selectedTeam1}
                    team2={selectedTeam2}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}