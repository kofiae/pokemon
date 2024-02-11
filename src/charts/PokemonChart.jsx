import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import '../asset/Pokemon.css';

function PokemonChart() {
    const [currentTier, setCurrentTier] = useState('');
    const [buttonColors, setButtonColors] = useState({});

        function cleanType(type) {
            return type ? type.trim() : null;
        }
    
        function handleTierChange(tier) {
            setCurrentTier(tier);
        }

    useEffect(() => {
        // Charger les données CSV et créer le graphique
        function loadAndDrawChart(tier, color) {
            fetch('../../Smogon.csv')
                .then(response => response.text())
                .then(csvData => {
                    // Parse les données CSV
                    const rows = csvData.split('\n');
                    const header = rows[0].split(',').map(column => column.trim());
                    const data = rows.slice(1).map(row => row.split(','));

                    // Filtrer les données pour n'inclure que les Pokémon du tier spécifié
                    const filteredPokemon = data.filter(pokemon => pokemon[header.indexOf('Tier')] === tier);

                    // Créer un objet pour stocker les types de Pokémon
                    const typeCounts = {};

                    // Parcourir les données pour chaque Pokémon du tier spécifié
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

                    // Trier les données par ordre décroissant
                    const sortedTypeCounts = Object.entries(typeCounts)
                        .sort((a, b) => b[1] - a[1])
                        .reduce((acc, [type, count]) => {
                            acc[type] = count;
                            return acc;
                        }, {});

                    // Créer les données pour le graphique
                    const chartData = Object.entries(sortedTypeCounts).map(([type, count]) => ({ name: type, y: count }));

                    // Afficher le graphique en camembert
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
                            color: color // Appliquer la couleur du bouton aux barres du diagramme
                        }],
                        plotOptions: {
                            bar: {
                                color: color // Couleur fixe pour toutes les barres
                            }
                        },
                        credits: {
                            enabled: false // Désactiver les crédits de Highcharts
                        }
                    });
                });
        }

        // Fonction pour nettoyer les noms de types
        function cleanType(type) {
            return type ? type.trim() : null;
        }

        // Gestionnaire d'événement pour le changement de tier
        function handleTierChange(tier) {
            setCurrentTier(tier);
            loadAndDrawChart(tier, buttonColors[tier]);
        }

        // Initialiser avec le tier par défaut (OU)
        handleTierChange('OU');
    }, []); // exécuté une seule fois lors du montage

    // Fonction pour stocker la couleur du bouton lorsqu'il est cliqué
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
