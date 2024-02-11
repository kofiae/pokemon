import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import Papa from 'papaparse';
import PokemonData from './Smogon.csv';

function PokemonChart() {
    const [currentTier, setCurrentTier] = useState('');
    const [buttonColors, setButtonColors] = useState({});

    // Déplacer fetchAndDrawChart à l'extérieur de useEffect
    async function fetchAndDrawChart(tier, color) {
        const response = await fetch(PokemonData);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);

        Papa.parse(csv, {
            complete: (result) => {
                const data = result.data;

                // Votre logique de traitement des données et de création du graphique ici
                const header = data[0].map(column => column.trim());
                const filteredPokemon = data.slice(1).filter(pokemon => pokemon[header.indexOf('Tier')] === tier);
                const typeCounts = {};
                filteredPokemon.forEach(pokemon => {
                    const type1 = cleanType(pokemon[header.indexOf('Type.1')]);
                    const type2 = cleanType(pokemon[header.indexOf('Type.2')]);

                    if (type1) {
                        typeCounts[type1] = (typeCounts[type1] || 0) + 1;
                    }

                    if (type2) {
                        typeCounts[type2] = (typeCounts[type2] || 0) + 1;
                    }
                });

                const sortedTypeCounts = Object.entries(typeCounts)
                    .sort((a, b) => b[1] - a[1])
                    .reduce((acc, [type, count]) => {
                        acc[type] = count;
                        return acc;
                    }, {});

                const chartData = Object.entries(sortedTypeCounts).map(([type, count]) => ({ name: type, y: count }));

                Highcharts.chart('pokemonChart', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: `Pokémon Types in ${tier} Tier`
                    },
                    xAxis: {
                        categories: Object.keys(sortedTypeCounts),
                        title: {
                            text: 'Types'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Count'
                        }
                    },
                    series: [{
                        name: 'Count',
                        data: Object.values(sortedTypeCounts),
                        color: color
                    }],
                    plotOptions: {
                        bar: {
                            color: color
                        }
                    },
                    credits: {
                        enabled: false
                    }
                });
            },
            header: true,
        });
    }

    useEffect(() => {
        // Ne pas appeler fetchAndDrawChart ici pour éviter de déclencher involontairement le chargement du graphique au montage
    }, []);

    function cleanType(type) {
        return type ? type.trim() : null;
    }

    function handleTierChange(tier) {
        setCurrentTier(tier);
        fetchAndDrawChart(tier, buttonColors[tier]);
    }

    function handleButtonClick(tier, color) {
        setButtonColors(prevState => ({
            ...prevState,
            [tier]: color
        }));
        handleTierChange(tier);
    }

    return (
        <div>
            <button className="ou-button" onClick={() => handleButtonClick('OU', 'blue')}>OU</button>
            <button className="uu-button" onClick={() => handleButtonClick('UU', 'red')}>UU</button>
            <button className="ru-button" onClick={() => handleButtonClick('RU', 'green')}>RU</button>
            <button className="nu-button" onClick={() => handleButtonClick('NU', 'orange')}>NU</button>
            <button className="pu-button" onClick={() => handleButtonClick('PU', 'purple')}>PU</button>
            
            <div id="pokemonChart"></div>
        </div>
    );
}

export default PokemonChart;
