import React, { useState, useEffect } from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Papa from "papaparse";
import Arrow from '../asset/images/right.png';

function StartBestType() {
    const csvFilePath = require('./Smogon.csv');

    const [points, setPoints] = useState({});
    const [sortedTypes, setSortedTypes] = useState([]);

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

    useEffect(() => {
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: (result) => {
                const data = result.data;
                console.log(data);
                const typeAppearances = {};
                const tiers = ['Uber', 'OU', 'UU', 'RU', 'NU', 'PU'];
                const tierPoints = { 'Uber': 6, 'OU': 5, 'UU': 4, 'RU': 3, 'NU': 2, 'PU': 1 };
                const seenPokemon = new Set();

                for (const tier of tiers) {
                    for (const pokemon of data) {
                        if (tiers.includes(pokemon['Tier']) && !seenPokemon.has(pokemon['Name'])) {
                            seenPokemon.add(pokemon['Name']);
                            const types = [pokemon['Type_1'], pokemon['Type_2']].filter(type => type && type !== "");
                            for (const type of types) {
                                typeAppearances[type] = (typeAppearances[type] || 0) + 1;
                            }
                        }
                    }
                }

                const leastAppearances = Math.min(...Object.values(typeAppearances));

                for (const type in typeAppearances) {
                    typeAppearances[type] = Math.min(typeAppearances[type], leastAppearances);
                }

                const newPoints = {};
                for (const type in typeAppearances) {
                    let remainingAppearances = typeAppearances[type];
                    let totalPoints = 0;

                    for (const tier of tiers) {
                        const appearancesInTier = data.filter(pokemon => pokemon['Tier'] === tier && (pokemon['Type_1'] === type || pokemon['Type_2'] === type)).length;

                        if (remainingAppearances >= appearancesInTier) {
                            totalPoints += appearancesInTier * tierPoints[tier];
                            remainingAppearances -= appearancesInTier;
                        } else {
                            totalPoints += remainingAppearances * tierPoints[tier];
                            break;
                        }
                    }

                    newPoints[type] = totalPoints;
                }

                const newSortedTypes = Object.entries(newPoints).map(([type, value]) => ({ name: type, y: value })).sort((a, b) => (a.y > b.y ? -1 : 1)).map((type) => type.name);


                setPoints(newPoints);
                setSortedTypes(newSortedTypes);
                console.log(sortedTypes)
            }
        })
    }, []);


    const options = {
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
                y: points[type] || 0,
                color: getColorForType(type)
            }))
        }]
    };

    return (
        <div id="container" style={{ height: 3000 }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

export default StartBestType;
