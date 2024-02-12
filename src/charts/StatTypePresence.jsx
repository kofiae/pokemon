import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Papa from "papaparse";
import { type } from "@testing-library/user-event/dist/type";

function StatTypePresence() {

    // Récupérer les données des types de pokemons dans .../Smogon.csv
    const csvFilePath = require('./Smogon.csv');
    const [data, setData] = React.useState([]);
    const [types, setTypes] = React.useState({});
    const [nbPokemon, setNbPokemon] = React.useState(0);

    const queryParameters = new URLSearchParams(window.location.search)
    const tier = queryParameters.get('tier');

    React.useEffect(() => {
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: (result) => {
                const data = result.data;
                data.forEach((d) => {
                        if (d.Type_1 in types) {
                            types[d.Type_1] += 1;
                        } else {
                            types[d.Type_1] = 1;
                        }
                        if (d.Type_2 in types) {
                            types[d.Type_2] += 1;
                        }else if (d.Type_2.trim() !== ""){
                            types[d.Type_2] = 1;
                        }
                        setNbPokemon((prev) => prev + 1);
                });
                setData(
                    Object.keys(types).map((type) => ({
                        Type: type,
                        Presence: types[type],
                    }))
                );
                console.log(data)
            },
        });
    }, []);


    // Faire Pie chart pour les types de pokemons utilise types
    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Type de pokemons",
        },
        series: [
            {
                data: Object.entries(types).map(([type, presence]) => ({ name: type, y: (presence/nbPokemon*100) })),
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