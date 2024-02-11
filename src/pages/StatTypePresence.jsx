import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Papa from "papaparse";
import { type } from "@testing-library/user-event/dist/type";

function StatTypePresence() {

    const csvFilePath = require('../asset/Smogon.csv');
    const [data, setData] = React.useState([]);
    const [stats, setStats] = React.useState({});
    const [types, setTypes] = React.useState({});
    const [tiers, setTiers] = React.useState([
        "Uber",
        "OU",
        "UU",
        "RU",
        "NU",
        "PU",
        "untiered",
    ]);
    const queryParameters = new URLSearchParams(window.location.search)
    var tier = queryParameters.get('tier');
    if (tier === null) {
        tier = ("untiered");
    }

    React.useEffect(() => {

        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: (result) => {
                const data = result.data;
                data.forEach((d) => {
                    if (d.Tier === tier) {
                        if (d.Type_1 in stats) {
                            stats[d.Type_1] += parseInt(d.Total);
                            types[d.Type_1] +=1; 
                        } else {
                            stats[d.Type_1] = 0;
                            types[d.Type_1] = 0;
                        } 
                        if (d.Type_2 in stats) {
                            stats[d.Type_2] += parseInt(d.Total);
                            types[d.Type_2] +=1;
                        }else if (d.Type_2.trim() !== ""){
                            stats[d.Type_2] = 0;
                            types[d.Type_2] = 0;
                        }
                    }
                });
                setData(
                    Object.keys(stats).map((type) => ({
                        Type: type,
                        Presence: stats[type],
                    }))
                );
            },
        });
    }, []);

    const options = {
        chart: { 
            type: "xy",
        },
        title: {
            text: "Stat moyenne par type de pokemon du tier " + tier,
        },
        series: [
            {
                name: "Stat moyenne",
                type: 'bar',
                data: Object.entries(stats).map(([type, presence]) => ({ name: type, y: presence/types[type]  }))
                .sort((a, b) => (a.y > b.y ? -1 : 1)),
            }
        ],
        plotOptions: {
            series: {
                colorByPoint: true,
            }
        },
        yAxis: {
            title: {
                text: "Stat moyenne",
            },
        },
        xAxis: {
            title: {
                text: "Type",
            },
            categories: Object.keys(stats),
        },
    };


    return(
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            {tiers.map((tier) => (
                
                <a href={`/stat-type-presence?tier=${tier}`}>
                    <button>
                        {tier}
                    </button>
                </a>
            ))}
            
        </div>
    );
}

export default StatTypePresence;