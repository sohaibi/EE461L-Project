import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

import './HW_Table.css';

function HW_Table(props) {

    /** TODO: 
     *  - load  array of hw availabilities 
     *  - load array of hw capacities
     */
    const [availabilities, setAvailabilities] = useState([]);
    const [capacities, setCapacities] = useState([]);
    const [HW_names, setHW_names] = useState([]);
    const [HWSet_rent_list, setHWSet_rent_list] = useState(props.setHWSet_rent_list);
    const [project, setProject] = useState(props.project);



    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/hardware').then(res => res.json()).then(data => {
                setAvailabilities(data.HW_ava);
                setCapacities(data.HW_cap);
                setHW_names(data.HW_name);
                console.log(data.HW_name)
            }).catch((error) => {
                console.error(error);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        // get all the checkin HW infos
        setHWSet_rent_list(props.HWSet_rent_list);
        console.log(props.HWSet_rent_list);
        console.log("list updated!");
        setProject(props.project);
        // console.log(props.project);
        console.log("project info updated");

    }, [props.HWSet_rent_list, props.project]);


    // var availabilities = [10, 8, 7, 10]; // temporary values
    // var capacities = [20, 20, 15, 10];

    /** Progress Bars */
    var bars = [];
    var percentages = [];
    var i;
    for (i = 0; i < availabilities.length; i++) {
        var percent = (availabilities[i] / capacities[i]) * 100.0;
        var hardware = percent.toFixed(2) + '%';
        percentages[i] = hardware;

        var bar = document.createElement("div");
        bar.setAttribute('width', hardware);
        bar.setAttribute('className', 'percent_bar');
        bar.innerText = hardware;

        bars[i] = bar;
    }



    // create dynamic table, ref https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < availabilities.length; i++) {
        let children = []
        //Inner loop to create children
        children.push(<td id="td0">{HW_names[i]}</td>)
        children.push(<td id="td0">{availabilities[i]}</td>)
        children.push(<td id="td0">{capacities[i]}</td>)
        children.push(<td id="td0">{percentages[i]}</td>)

        //Create the parent and add the children
        table.push(<tr>{children}</tr>)
    }

    // create bar chart array and colar array
    let bar_data = []
    let color_data = ['#f8971f', '#808080']
    bar_data.push(['HardWareSet', 'Availability', 'Capacity'])
    for (let i = 0; i < availabilities.length; i++) {
        //Inner loop to create children
        bar_data.push([HW_names[i], availabilities[i], capacities[i] - availabilities[i]])
    }

    if (HWSet_rent_list !== undefined && project !== undefined) {
        console.log("run this???")
        bar_data[0].push('Capacity');
        bar_data[0][2] = project.name;

        for (let i = 0; i < availabilities.length; i++) {
            // record HW_use
            bar_data[i + 1][2] = 0;
            //Inner loop to create children
            for (let j = 0; j < HWSet_rent_list.length; j++) {
                if (HW_names[i] === HWSet_rent_list[j]['HW_name']) {
                    bar_data[i + 1][2] = HWSet_rent_list[j]['HW_use'];
                }
            }
        }

        for (let i = 0; i < availabilities.length; i++) {
            // record HW_cap
            bar_data[i + 1].push(capacities[i] - availabilities[i] - bar_data[i + 1][2]);
        }
        color_data = ['#f8971f', '#009900', '#808080'];
        console.log(bar_data);
    }



    return (
        <>
            <table id="hwTable">
                <tr>
                    <th>Hardware Set</th>
                    <th>Availability</th>
                    <th>Capacity</th>
                    <th>Percentage</th>
                </tr>
                {table}
            </table>

            <div id="hwChart">

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={
                        bar_data
                    }
                    options={{
                        // title: 'Hardware Status',
                        chartArea: { width: '50%' },
                        isStacked: true,
                        hAxis: {
                            // title: 'Availability and Capacity',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'HardwareSet',
                        },
                        colors: color_data,
                    }}
                // For tests
                // rootProps={{ 'data-testid': '3' }}
                />
            </div>


        </>
    );
}

export default HW_Table;