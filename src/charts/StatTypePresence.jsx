import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Papa from "papaparse";

function StatTypePresence() {

    // Récupérer les données des types de pokemons dans .../Smogon.csv
    const csvFilePath = require('./Smogon.csv');
    const [data, setData] = useState([]);
    const [types, setTypes] = useState({});
    const [nbPokemon, setNbPokemon] = useState(0);

    useEffect(() => {
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: (result) => {
                const data = result.data;
                const typeCounts = {};
                let totalPokemon = 0;

                data.forEach((d) => {
                    if (d.Type_1 in typeCounts) {
                        typeCounts[d.Type_1] += 1;
                    } else {
                        typeCounts[d.Type_1] = 1;
                    }
                    if (d.Type_2 in typeCounts) {
                        typeCounts[d.Type_2] += 1;
                    } else if (d.Type_2.trim() !== "") {
                        typeCounts[d.Type_2] = 1;
                    }
                    totalPokemon++;
                });

                // Convert type counts to an array of objects
                const typeData = Object.keys(typeCounts).map((type) => ({
                    Type: type,
                    Presence: typeCounts[type],
                }));

                // Sort the data by presence (descending order)
                typeData.sort((a, b) => b.Presence - a.Presence);

                setData(typeData);
                setTypes(typeCounts);
                setNbPokemon(totalPokemon);
            },
        });
    }, []);

    const typeColors = {
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

    // Faire Pie chart pour les types de pokemons utilise types
    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Répartition générales des types",
        },
        series: [
            {
                data: data.map(({ Type, Presence }) => ({ name: Type, y: (Math.round(Presence/nbPokemon*100)), color: typeColors[Type] })),
            },
        ],
    };

    return(
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

export default StatTypePresence;
