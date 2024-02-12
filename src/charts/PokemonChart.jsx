import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Highcharts from 'highcharts';

const PokemonChart = () => {
    const [currentTier, setCurrentTier] = useState('OU');
    const [buttonColorDefault, setButtonColorDefault] = useState('');

    useEffect(() => {
        // Function to get the default color of the OU button
        const getDefaultButtonColor = () => {
            let ouButton = document.getElementById('ouButton');
            return window.getComputedStyle(ouButton, ':before').getPropertyValue('background-color');
        };

        // Function to clean type names
        const cleanType = (type) => {
            return type ? type.trim() : null;
        };

        // Function to load and draw the chart
        const loadAndDrawChart = (tier, buttonColor) => {
            fetch('./Smogon.csv')
                .then(response => response.text())
                .then(csvData => {
                    Papa.parse(csvData, {
                        complete: (parsedData) => {
                            const rows = parsedData.data;
                            const header = rows[0].map(column => column.trim());
                            const data = rows.slice(1);

                            // Filter data to include only Pokémon of the specified tier
                            const filteredPokemon = data.filter(pokemon => pokemon[header.indexOf('Tier')] === tier);

                            const typeCounts = {};
                            // Iterate over data for each Pokémon of the specified tier
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

                            // Sort data in descending order
                            const sortedTypeCounts = Object.entries(typeCounts)
                                .sort((a, b) => b[1] - a[1])
                                .reduce((acc, [type, count]) => {
                                    acc[type] = count;
                                    return acc;
                                }, {});

                            // Create data for the chart
                            const chartData = Object.entries(sortedTypeCounts).map(([type, count]) => ({ name: type, y: count }));

                            // Display the chart as a bar chart
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
                                    color: buttonColor // Apply the button color to the chart bars
                                }],
                                plotOptions: {
                                    bar: {
                                        color: buttonColor // Fixed color for all bars
                                    }
                                },
                                credits: {
                                    enabled: false // Disable Highcharts credits
                                }
                            });
                        }
                    });
                });
        };

        // Update the chart with the specified tier
        const updateChart = (tier, buttonColor) => {
            loadAndDrawChart(tier, buttonColor);
        };

        // Event handler for the OU button
        document.getElementById('ouButton').addEventListener('click', function () {
            setCurrentTier('OU');
            let buttonColor = window.getComputedStyle(this).getPropertyValue('background-color'); // Get the button color
            updateChart('OU', buttonColor);
        });

        // Event handler for the UU button
        document.getElementById('uuButton').addEventListener('click', function () {
            setCurrentTier('UU');
            let buttonColor = window.getComputedStyle(this).getPropertyValue('background-color'); // Get the button color
            updateChart('UU', buttonColor);
        });

        // Event handler for the RU button
        document.getElementById('ruButton').addEventListener('click', function () {
            setCurrentTier('RU');
            let buttonColor = window.getComputedStyle(this).getPropertyValue('background-color'); // Get the button color
            updateChart('RU', buttonColor);
        });

        // Event handler for the NU button
        document.getElementById('nuButton').addEventListener('click', function () {
            setCurrentTier('NU');
            let buttonColor = window.getComputedStyle(this).getPropertyValue('background-color'); // Get the button color
            updateChart('NU', buttonColor);
        });

        // Event handler for the PU button
        document.getElementById('puButton').addEventListener('click', function () {
            setCurrentTier('PU');
            let buttonColor = window.getComputedStyle(this).getPropertyValue('background-color'); // Get the button color
            updateChart('PU', buttonColor);
        });

        // Initial load with default tier (OU)
        let buttonColorDefault = getDefaultButtonColor();
        setButtonColorDefault(buttonColorDefault);
        loadAndDrawChart(currentTier, buttonColorDefault);

        // Clean-up
        return () => {
            document.getElementById('ouButton').removeEventListener('click', () => {});
            document.getElementById('uuButton').removeEventListener('click', () => {});
            document.getElementById('ruButton').removeEventListener('click', () => {});
            document.getElementById('nuButton').removeEventListener('click', () => {});
            document.getElementById('puButton').removeEventListener('click', () => {});
        };
    }, []); // Only run once after the component is mounted

    return (
        <div>
            <button id="ouButton">OU</button>
            <button id="uuButton">UU</button>
            <button id="ruButton">RU</button>
            <button id="nuButton">NU</button>
            <button id="puButton">PU</button>
            <div id="pokemonChart"></div>
        </div>
    );
};

export default PokemonChart;
