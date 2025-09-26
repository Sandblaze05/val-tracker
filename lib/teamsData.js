// VCT 2025 Champions Teams Data
export const teamsData = [
  // AMERICAS
  {
    name: "Sentinels",
    region: "Americas",
    logo: "/images/teams/sentinels.svg",
    color: "#D32F2F",
    championshipPoints: 850,
    formScore: 8.7,
    tier: "S",
    championshipProbability: 18.5,
    characteristics: ["Aggressive", "Tactical", "Experienced"],
    stats: {
      mapWinRate: 72.5,
      roundWinRate: 58.2,
      attackWinRate: 54.8,
      defenseWinRate: 61.6,
      pistolRoundWinRate: 65.3,
      clutchWinRate: 32.1,
      firstBloodRate: 28.4,
      averageRoundDifference: 3.2
    },
    mapPool: {
      Abyss: { winRate: 78.5, advantage: true },
      Ascent: { winRate: 68.2, advantage: false },
      Bind: { winRate: 75.0, advantage: true },
      Corrode: { winRate: 62.5, advantage: false },
      Haven: { winRate: 80.0, advantage: true },
      Lotus: { winRate: 66.7, advantage: false },
      Sunset: { winRate: 71.4, advantage: false }
    }
  },
  {
    name: "Cloud9",
    region: "Americas",
    logo: "/images/teams/placeholder.svg",
    color: "#1565C0",
    championshipPoints: 780,
    formScore: 8.2,
    tier: "A",
    championshipProbability: 14.2,
    characteristics: ["Methodical", "Adaptable", "Consistent"],
    stats: {
      mapWinRate: 68.4,
      roundWinRate: 56.7,
      attackWinRate: 52.3,
      defenseWinRate: 60.1,
      pistolRoundWinRate: 58.9,
      clutchWinRate: 28.5,
      firstBloodRate: 26.1,
      averageRoundDifference: 2.8
    },
    mapPool: {
      Abyss: { winRate: 65.2, advantage: false },
      Ascent: { winRate: 72.7, advantage: true },
      Bind: { winRate: 63.6, advantage: false },
      Corrode: { winRate: 70.0, advantage: true },
      Haven: { winRate: 66.7, advantage: false },
      Lotus: { winRate: 75.0, advantage: true },
      Sunset: { winRate: 64.3, advantage: false }
    }
  },
  {
    name: "100 Thieves",
    region: "Americas",
    logo: "/images/teams/placeholder.svg",
    color: "#FF4081",
    championshipPoints: 720,
    formScore: 7.8,
    tier: "A",
    championshipProbability: 12.5,
    characteristics: ["Strategic", "Flexible", "Clutch"],
    stats: {
      mapWinRate: 65.3,
      roundWinRate: 55.1,
      attackWinRate: 53.2,
      defenseWinRate: 57.0,
      pistolRoundWinRate: 60.2,
      clutchWinRate: 34.6,
      firstBloodRate: 24.8,
      averageRoundDifference: 2.3
    },
    mapPool: {
      Abyss: { winRate: 60.0, advantage: false },
      Ascent: { winRate: 66.7, advantage: false },
      Bind: { winRate: 71.4, advantage: true },
      Corrode: { winRate: 63.6, advantage: false },
      Haven: { winRate: 68.2, advantage: false },
      Lotus: { winRate: 58.3, advantage: false },
      Sunset: { winRate: 76.9, advantage: true }
    }
  },
  {
    name: "LOUD",
    region: "Americas",
    logo: "/images/teams/loud.png",
    color: "#7CB342",
    championshipPoints: 810,
    formScore: 8.5,
    tier: "S",
    championshipProbability: 16.8,
    characteristics: ["Aggressive", "Innovative", "Momentum-based"],
    stats: {
      mapWinRate: 70.2,
      roundWinRate: 57.5,
      attackWinRate: 56.1,
      defenseWinRate: 58.9,
      pistolRoundWinRate: 62.7,
      clutchWinRate: 30.2,
      firstBloodRate: 29.5,
      averageRoundDifference: 3.0
    },
    mapPool: {
      Abyss: { winRate: 72.7, advantage: true },
      Ascent: { winRate: 66.7, advantage: false },
      Bind: { winRate: 63.6, advantage: false },
      Corrode: { winRate: 75.0, advantage: true },
      Haven: { winRate: 68.2, advantage: false },
      Lotus: { winRate: 70.0, advantage: true },
      Sunset: { winRate: 66.7, advantage: false }
    }
  },
  {
    name: "Evil Geniuses",
    region: "Americas",
    logo: "/images/teams/eg.png",
    color: "#0D47A1",
    championshipPoints: 690,
    formScore: 7.5,
    tier: "B",
    championshipProbability: 10.2,
    characteristics: ["Tactical", "Disciplined", "Calculated"],
    stats: {
      mapWinRate: 62.5,
      roundWinRate: 53.8,
      attackWinRate: 51.2,
      defenseWinRate: 56.4,
      pistolRoundWinRate: 55.6,
      clutchWinRate: 26.3,
      firstBloodRate: 23.7,
      averageRoundDifference: 1.8
    },
    mapPool: {
      Abyss: { winRate: 58.3, advantage: false },
      Ascent: { winRate: 63.6, advantage: false },
      Bind: { winRate: 66.7, advantage: false },
      Corrode: { winRate: 54.5, advantage: false },
      Haven: { winRate: 72.7, advantage: true },
      Lotus: { winRate: 60.0, advantage: false },
      Sunset: { winRate: 63.6, advantage: false }
    }
  },

  // EMEA
  {
    name: "Fnatic",
    region: "EMEA",
    logo: "/images/teams/fnatic.svg",
    color: "#FF5722",
    championshipPoints: 870,
    formScore: 9.0,
    tier: "S",
    championshipProbability: 19.2,
    characteristics: ["Disciplined", "Innovative", "Clutch"],
    stats: {
      mapWinRate: 73.8,
      roundWinRate: 59.1,
      attackWinRate: 55.3,
      defenseWinRate: 62.9,
      pistolRoundWinRate: 67.2,
      clutchWinRate: 33.5,
      firstBloodRate: 29.8,
      averageRoundDifference: 3.5
    },
    mapPool: {
      Abyss: { winRate: 70.0, advantage: true },
      Ascent: { winRate: 76.9, advantage: true },
      Bind: { winRate: 68.2, advantage: false },
      Corrode: { winRate: 72.7, advantage: true },
      Haven: { winRate: 75.0, advantage: true },
      Lotus: { winRate: 66.7, advantage: false },
      Sunset: { winRate: 80.0, advantage: true }
    }
  },
  {
    name: "Team Liquid",
    region: "EMEA",
    logo: "/images/teams/liquid.png",
    color: "#1976D2",
    championshipPoints: 820,
    formScore: 8.6,
    tier: "S",
    championshipProbability: 17.5,
    characteristics: ["Aggressive", "Flexible", "Experienced"],
    stats: {
      mapWinRate: 71.4,
      roundWinRate: 57.8,
      attackWinRate: 54.2,
      defenseWinRate: 61.4,
      pistolRoundWinRate: 63.5,
      clutchWinRate: 31.2,
      firstBloodRate: 28.9,
      averageRoundDifference: 3.1
    },
    mapPool: {
      Abyss: { winRate: 75.0, advantage: true },
      Ascent: { winRate: 68.2, advantage: false },
      Bind: { winRate: 72.7, advantage: true },
      Corrode: { winRate: 66.7, advantage: false },
      Haven: { winRate: 63.6, advantage: false },
      Lotus: { winRate: 70.0, advantage: true },
      Sunset: { winRate: 76.9, advantage: true }
    }
  },
  {
    name: "G2 Esports",
    region: "EMEA",
    logo: "/images/teams/g2.png",
    color: "#E53935",
    championshipPoints: 760,
    formScore: 8.1,
    tier: "A",
    championshipProbability: 13.8,
    characteristics: ["Strategic", "Adaptable", "Momentum-based"],
    stats: {
      mapWinRate: 67.3,
      roundWinRate: 56.2,
      attackWinRate: 53.5,
      defenseWinRate: 58.9,
      pistolRoundWinRate: 59.8,
      clutchWinRate: 29.4,
      firstBloodRate: 26.7,
      averageRoundDifference: 2.6
    },
    mapPool: {
      Abyss: { winRate: 63.6, advantage: false },
      Ascent: { winRate: 70.0, advantage: true },
      Bind: { winRate: 66.7, advantage: false },
      Corrode: { winRate: 72.7, advantage: true },
      Haven: { winRate: 63.6, advantage: false },
      Lotus: { winRate: 58.3, advantage: false },
      Sunset: { winRate: 75.0, advantage: true }
    }
  },
  {
    name: "Karmine Corp",
    region: "EMEA",
    logo: "/images/teams/kcorp.png",
    color: "#3949AB",
    championshipPoints: 730,
    formScore: 7.9,
    tier: "A",
    championshipProbability: 12.8,
    characteristics: ["Aggressive", "Unpredictable", "Clutch"],
    stats: {
      mapWinRate: 66.1,
      roundWinRate: 55.4,
      attackWinRate: 54.1,
      defenseWinRate: 56.7,
      pistolRoundWinRate: 61.3,
      clutchWinRate: 32.8,
      firstBloodRate: 27.5,
      averageRoundDifference: 2.4
    },
    mapPool: {
      Abyss: { winRate: 66.7, advantage: false },
      Ascent: { winRate: 63.6, advantage: false },
      Bind: { winRate: 72.7, advantage: true },
      Corrode: { winRate: 58.3, advantage: false },
      Haven: { winRate: 70.0, advantage: true },
      Lotus: { winRate: 63.6, advantage: false },
      Sunset: { winRate: 66.7, advantage: false }
    }
  },
  {
    name: "FUT Esports",
    region: "EMEA",
    logo: "/images/teams/fut.png",
    color: "#FFC107",
    championshipPoints: 680,
    formScore: 7.4,
    tier: "B",
    championshipProbability: 9.8,
    characteristics: ["Tactical", "Disciplined", "Methodical"],
    stats: {
      mapWinRate: 61.8,
      roundWinRate: 53.5,
      attackWinRate: 50.9,
      defenseWinRate: 56.1,
      pistolRoundWinRate: 54.2,
      clutchWinRate: 25.7,
      firstBloodRate: 23.2,
      averageRoundDifference: 1.7
    },
    mapPool: {
      Abyss: { winRate: 54.5, advantage: false },
      Ascent: { winRate: 66.7, advantage: false },
      Bind: { winRate: 63.6, advantage: false },
      Corrode: { winRate: 58.3, advantage: false },
      Haven: { winRate: 70.0, advantage: true },
      Lotus: { winRate: 63.6, advantage: false },
      Sunset: { winRate: 58.3, advantage: false }
    }
  },

  // PACIFIC
  {
    name: "DRX",
    region: "Pacific",
    logo: "/images/teams/drx.png",
    color: "#00BCD4",
    championshipPoints: 840,
    formScore: 8.8,
    tier: "S",
    championshipProbability: 18.0,
    characteristics: ["Methodical", "Disciplined", "Innovative"],
    stats: {
      mapWinRate: 72.1,
      roundWinRate: 58.5,
      attackWinRate: 54.6,
      defenseWinRate: 62.4,
      pistolRoundWinRate: 66.1,
      clutchWinRate: 30.8,
      firstBloodRate: 27.9,
      averageRoundDifference: 3.3
    },
    mapPool: {
      Abyss: { winRate: 72.7, advantage: true },
      Ascent: { winRate: 75.0, advantage: true },
      Bind: { winRate: 66.7, advantage: false },
      Corrode: { winRate: 63.6, advantage: false },
      Haven: { winRate: 76.9, advantage: true },
      Lotus: { winRate: 70.0, advantage: true },
      Sunset: { winRate: 63.6, advantage: false }
    }
  },
  {
    name: "Paper Rex",
    region: "Pacific",
    logo: "/images/teams/prx.png",
    color: "#FF9800",
    championshipPoints: 800,
    formScore: 8.4,
    tier: "S",
    championshipProbability: 16.2,
    characteristics: ["Aggressive", "Unpredictable", "Momentum-based"],
    stats: {
      mapWinRate: 69.7,
      roundWinRate: 57.2,
      attackWinRate: 58.3,
      defenseWinRate: 56.1,
      pistolRoundWinRate: 64.5,
      clutchWinRate: 29.7,
      firstBloodRate: 31.2,
      averageRoundDifference: 2.9
    },
    mapPool: {
      Abyss: { winRate: 76.9, advantage: true },
      Ascent: { winRate: 63.6, advantage: false },
      Bind: { winRate: 70.0, advantage: true },
      Corrode: { winRate: 66.7, advantage: false },
      Haven: { winRate: 63.6, advantage: false },
      Lotus: { winRate: 72.7, advantage: true },
      Sunset: { winRate: 66.7, advantage: false }
    }
  },
  {
    name: "Gen.G",
    region: "Pacific",
    logo: "/images/teams/geng.png",
    color: "#FFD600",
    championshipPoints: 750,
    formScore: 8.0,
    tier: "A",
    championshipProbability: 13.5,
    characteristics: ["Strategic", "Adaptable", "Consistent"],
    stats: {
      mapWinRate: 66.8,
      roundWinRate: 55.9,
      attackWinRate: 52.8,
      defenseWinRate: 59.0,
      pistolRoundWinRate: 60.7,
      clutchWinRate: 28.1,
      firstBloodRate: 25.4,
      averageRoundDifference: 2.5
    },
    mapPool: {
      Abyss: { winRate: 63.6, advantage: false },
      Ascent: { winRate: 70.0, advantage: true },
      Bind: { winRate: 66.7, advantage: false },
      Corrode: { winRate: 63.6, advantage: false },
      Haven: { winRate: 72.7, advantage: true },
      Lotus: { winRate: 58.3, advantage: false },
      Sunset: { winRate: 70.0, advantage: true }
    }
  },
  {
    name: "T1",
    region: "Pacific",
    logo: "/images/teams/t1.png",
    color: "#E91E63",
    championshipPoints: 710,
    formScore: 7.7,
    tier: "A",
    championshipProbability: 11.8,
    characteristics: ["Tactical", "Disciplined", "Clutch"],
    stats: {
      mapWinRate: 64.5,
      roundWinRate: 54.7,
      attackWinRate: 52.1,
      defenseWinRate: 57.3,
      pistolRoundWinRate: 58.4,
      clutchWinRate: 31.5,
      firstBloodRate: 24.2,
      averageRoundDifference: 2.2
    },
    mapPool: {
      Abyss: { winRate: 58.3, advantage: false },
      Ascent: { winRate: 66.7, advantage: false },
      Bind: { winRate: 72.7, advantage: true },
      Corrode: { winRate: 63.6, advantage: false },
      Haven: { winRate: 66.7, advantage: false },
      Lotus: { winRate: 58.3, advantage: false },
      Sunset: { winRate: 70.0, advantage: true }
    }
  },
  {
    name: "Talon Esports",
    region: "Pacific",
    logo: "/images/teams/talon.png",
    color: "#673AB7",
    championshipPoints: 670,
    formScore: 7.3,
    tier: "B",
    championshipProbability: 9.5,
    characteristics: ["Methodical", "Adaptable", "Calculated"],
    stats: {
      mapWinRate: 61.2,
      roundWinRate: 53.1,
      attackWinRate: 50.5,
      defenseWinRate: 55.7,
      pistolRoundWinRate: 53.8,
      clutchWinRate: 25.1,
      firstBloodRate: 22.8,
      averageRoundDifference: 1.6
    },
    mapPool: {
      Abyss: { winRate: 54.5, advantage: false },
      Ascent: { winRate: 63.6, advantage: false },
      Bind: { winRate: 58.3, advantage: false },
      Corrode: { winRate: 66.7, advantage: false },
      Haven: { winRate: 70.0, advantage: true },
      Lotus: { winRate: 63.6, advantage: false },
      Sunset: { winRate: 54.5, advantage: false }
    }
  }
];

// Helper function to get teams grouped by region
export const getTeamsByRegion = () => {
  const regions = {};
  
  teamsData.forEach(team => {
    if (!regions[team.region]) {
      regions[team.region] = [];
    }
    regions[team.region].push(team);
  });
  
  return regions;
};

// Helper function to get a team by name
export const getTeamByName = (name) => {
  return teamsData.find(team => team.name === name);
};

// Helper function to calculate win probability between two teams
export const calculateWinProbability = (team1, team2) => {
  if (!team1 || !team2) return { team1Probability: 50, team2Probability: 50 };
  
  // Base probability from championship points and form
  const team1Strength = (team1.championshipPoints * 0.6) + (team1.formScore * 40);
  const team2Strength = (team2.championshipPoints * 0.6) + (team2.formScore * 40);
  
  // Map advantage factor
  const team1MapAdvantages = Object.values(team1.mapPool).filter(map => map.advantage).length;
  const team2MapAdvantages = Object.values(team2.mapPool).filter(map => map.advantage).length;
  const mapFactor = (team1MapAdvantages - team2MapAdvantages) * 15;
  
  // Statistical advantages
  const statsDiff = {
    mapWinRate: team1.stats.mapWinRate - team2.stats.mapWinRate,
    roundWinRate: team1.stats.roundWinRate - team2.stats.roundWinRate,
    clutchWinRate: team1.stats.clutchWinRate - team2.stats.clutchWinRate,
    firstBloodRate: team1.stats.firstBloodRate - team2.stats.firstBloodRate
  };
  
  const statsFactor = (
    (statsDiff.mapWinRate * 0.4) + 
    (statsDiff.roundWinRate * 0.3) + 
    (statsDiff.clutchWinRate * 0.15) + 
    (statsDiff.firstBloodRate * 0.15)
  ) * 2;
  
  // Calculate final probability
  let team1Probability = 50 + ((team1Strength - team2Strength) / 20) + (mapFactor / 2) + statsFactor;
  
  // Ensure probability is within bounds
  team1Probability = Math.max(Math.min(team1Probability, 90), 10);
  const team2Probability = 100 - team1Probability;
  
  return {
    team1Probability: parseFloat(team1Probability.toFixed(1)),
    team2Probability: parseFloat(team2Probability.toFixed(1))
  };
};

// Helper function to analyze key factors in a matchup
export const analyzeKeyFactors = (team1, team2) => {
  if (!team1 || !team2) return [];
  
  const factors = [];
  
  // Map pool advantage
  const team1MapAdvantages = Object.entries(team1.mapPool)
    .filter(([_, data]) => data.advantage)
    .map(([mapName, _]) => mapName);
    
  const team2MapAdvantages = Object.entries(team2.mapPool)
    .filter(([_, data]) => data.advantage)
    .map(([mapName, _]) => mapName);
    
  if (team1MapAdvantages.length > team2MapAdvantages.length + 1) {
    factors.push(`${team1.name} has a stronger map pool with advantages on ${team1MapAdvantages.join(', ')}`);
  } else if (team2MapAdvantages.length > team1MapAdvantages.length + 1) {
    factors.push(`${team2.name} has a stronger map pool with advantages on ${team2MapAdvantages.join(', ')}`);
  }
  
  // Form difference
  const formDiff = team1.formScore - team2.formScore;
  if (formDiff > 0.8) {
    factors.push(`${team1.name} is in better recent form (${team1.formScore} vs ${team2.formScore})`);
  } else if (formDiff < -0.8) {
    factors.push(`${team2.name} is in better recent form (${team2.formScore} vs ${team1.formScore})`);
  }
  
  // Statistical advantages
  if (team1.stats.firstBloodRate > team2.stats.firstBloodRate + 3) {
    factors.push(`${team1.name} has a significant first blood advantage (${team1.stats.firstBloodRate}% vs ${team2.stats.firstBloodRate}%)`);
  } else if (team2.stats.firstBloodRate > team1.stats.firstBloodRate + 3) {
    factors.push(`${team2.name} has a significant first blood advantage (${team2.stats.firstBloodRate}% vs ${team1.stats.firstBloodRate}%)`);
  }
  
  if (team1.stats.clutchWinRate > team2.stats.clutchWinRate + 3) {
    factors.push(`${team1.name} performs better in clutch situations (${team1.stats.clutchWinRate}% vs ${team2.stats.clutchWinRate}%)`);
  } else if (team2.stats.clutchWinRate > team1.stats.clutchWinRate + 3) {
    factors.push(`${team2.name} performs better in clutch situations (${team2.stats.clutchWinRate}% vs ${team1.stats.clutchWinRate}%)`);
  }
  
  // Playstyle analysis
  const team1Aggressive = team1.characteristics.includes("Aggressive");
  const team2Aggressive = team2.characteristics.includes("Aggressive");
  const team1Tactical = team1.characteristics.includes("Tactical") || team1.characteristics.includes("Strategic");
  const team2Tactical = team2.characteristics.includes("Tactical") || team2.characteristics.includes("Strategic");
  
  if (team1Aggressive && team2Tactical) {
    factors.push(`Clash of styles: ${team1.name}'s aggression vs ${team2.name}'s tactical approach`);
  } else if (team2Aggressive && team1Tactical) {
    factors.push(`Clash of styles: ${team2.name}'s aggression vs ${team1.name}'s tactical approach`);
  }
  
  // Championship tier difference
  if (team1.tier === "S" && team2.tier !== "S") {
    factors.push(`${team1.name} is rated as a higher tier team (${team1.tier} vs ${team2.tier})`);
  } else if (team2.tier === "S" && team1.tier !== "S") {
    factors.push(`${team2.name} is rated as a higher tier team (${team2.tier} vs ${team1.tier})`);
  }
  
  return factors.slice(0, 4); // Return top 4 factors
};

// Helper function to format stat values
export const formatStatValue = (value, statKey) => {
  if (statKey.toLowerCase().includes('rate') || statKey.toLowerCase().includes('probability')) {
    return `${value}%`;
  }
  return value.toString();
};

// Helper function to calculate overall strength
export const calculateOverallStrength = (team) => {
  if (!team) return 0;
  
  return (
    (team.championshipPoints * 0.4) +
    (team.formScore * 20) +
    (team.stats.mapWinRate * 0.3) +
    (team.stats.roundWinRate * 0.2) +
    (Object.values(team.mapPool).filter(map => map.advantage).length * 5)
  );
};