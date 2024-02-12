import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';

const PokemonChart = () => {
    const [points, setPoints] = useState({});
    const [sortedTypes, setSortedTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./Smogon.csv');
            const csvData = await response.text();
            console.log(csvData)

            const rows = csvData.split('\n');
            const header = rows[0].split(',').map(column => column.trim());
            const parsedData = rows.slice(1).map(row => {
                const columns = row.split(',');
                return header.reduce((acc, column, index) => {
                    const value = columns[index] ? columns[index].trim() : '';
                    acc[column] = value;
                    return acc;
                }, {});
            });

            const typeAppearances = {};
            const tiers = ['Uber', 'OU', 'UU', 'RU', 'NU', 'PU'];
            const tierPoints = { 'Uber': 6, 'OU': 5, 'UU': 4, 'RU': 3, 'NU': 2, 'PU': 1 };

            const seenPokemon = new Set();

            for (const tier of tiers) {
                for (const pokemon of parsedData) {
                    if (tiers.includes(pokemon['Tier']) && !seenPokemon.has(pokemon['Name'])) {
                        seenPokemon.add(pokemon['Name']);
                        const types = [pokemon['Type.1'], pokemon['Type.2']].filter(type => type && type !== "");
                        for (const type of types) {
                            if (!typeAppearances[type]) {
                                typeAppearances[type] = 1;
                            } else {
                                typeAppearances[type]++;
                            }
                        }
                    }
                }
            }

            const leastAppearances = Math.min(...Object.values(typeAppearances));

            for (const type in typeAppearances) {
                typeAppearances[type] = Math.min(typeAppearances[type], leastAppearances);
            }

            const points = {};
            for (const type in typeAppearances) {
                let remainingAppearances = typeAppearances[type];
                let totalPoints = 0;

                for (const tier of tiers) {
                    const appearancesInTier = parsedData.filter(pokemon => pokemon['Tier'] === tier && (pokemon['Type.1'] === type || pokemon['Type.2'] === type)).length;

                    if (remainingAppearances >= appearancesInTier) {
                        totalPoints += appearancesInTier * tierPoints[tier];
                        remainingAppearances -= appearancesInTier;
                    } else {
                        totalPoints += remainingAppearances * tierPoints[tier];
                        break;
                    }
                }

                points[type] = totalPoints;
            }

            const sortedTypes = Object.keys(points).sort((a, b) => points[b] - points[a]);

            setPoints(points);
            setSortedTypes(sortedTypes);

            Highcharts.chart('container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Classement des types de Pokémon en fonction de leur pertinence stratégique dans les tiers'
                },
                xAxis: {
                    categories: sortedTypes,
                    title: {
                        text: 'Types de Pokémon'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Points'
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Points',
                    data: sortedTypes.map(type => ({
                        y: points[type],
                        color: getColorForType(type)
                    }))
                }]
            });
        };

        fetchData();

    }, []);

    const getColorForType = (type) => {
        const colorMap = {
            'Normal': '#A8A878',
            'Fire': '#F08030',
            'Water': '#6890F0',
            'Electric': '#F8D030',
            'Grass': '#78C850',
            'Ice': '#98D8D8',
            'Fighting': '#C03028',
            'Poison': '#A040A0',
            'Ground': '#E0C068',
            'Flying': '#A890F0',
            'Psychic': '#F85888',
            'Bug': '#A8B820',
            'Rock': '#B8A038',
            'Ghost': '#705898',
            'Dragon': '#7038F8',
            'Dark': '#705848',
            'Steel': '#B8B8D0',
            'Fairy': '#EE99AC'
        };
        return colorMap[type] || '#CCCCCC';
    };

    return (
        <div id="container"></div>
    );
};

export default PokemonChart;