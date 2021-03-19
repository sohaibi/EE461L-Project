import React from 'react';
import './HW_Table.css';

function HW_Table() {

    /** TODO: 
     *  - load  array of hw availabilities 
     *  - load array of hw capacities
     */

    const availabilities = [10, 8, 7, 10]; // temporary values
    const capacities = [20, 20, 15, 10];
    
    /** Progress Bars */
    var bars = [];
    var percentages = [];
    var i;
    for(i=0; i<4; i++) {
        var percent =  (availabilities[i] / capacities[i]) * 100.0 ;
        var hardware = percent.toFixed(2) + '%';
        percentages[i] = hardware;

        var bar = document.createElement("div");
        bar.setAttribute('width', hardware);
        bar.setAttribute('className', 'percent_bar');
        bar.innerText=hardware;

        bars[i] = bar;
    }

    return(
        <>
        <table id="hwTable">
            <tr>
                <th>Hardware Set</th>
                <th>Availability</th>
            </tr>
            <tr>
                <td>HW Set 1</td>
                <td id="td0">
                    { percentages[0] }
                </td>
            </tr>
            <tr>
                <td>HW Set 2</td>
                <td id="td0">
                    { percentages[1] }
                </td>
            </tr>
            <tr>
                <td>HW Set 3</td>
                <td id="td0">
                    { percentages[2] }
                </td>
            </tr>
            <tr>
                <td>HW Set 4</td>
                <td id="td0">
                    { percentages[3] }
                </td>
            </tr>
        </table>
        </>
    );
}

export default HW_Table;