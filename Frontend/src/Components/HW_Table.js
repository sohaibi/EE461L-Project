import React from 'react';
import './HW_Table.css';

function HW_Table() {
    return(
        <>
        <table id="hwTable">
            <tr>
                <th>Hardware Set</th>
                <th>Availability</th>
            </tr>
            <tr>
                <td>HW Set 1</td>
                <td>30%</td>
            </tr>
            <tr>
                <td>HW Set 2</td>
                <td>30%</td>
            </tr>
            <tr>
                <td>HW Set 3</td>
                <td>30%</td>
            </tr>
            <tr>
                <td>HW Set 4</td>
                <td>30%</td>
            </tr>
        </table>
        </>
    );
}

export default HW_Table;