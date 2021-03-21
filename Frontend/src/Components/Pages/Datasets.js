import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import './Datasets.css';

export default function Datasets(){

    return(
        <div className = 'Datasets'>
            <h1>Datasets</h1>
            <p>  Select Datasets to download.</p>
            <table id = 'dataset_table'>
            <thead>
            <tr>
                <th>Select</th>
                <th>Dataset Name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 1</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 2</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 3</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 4</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 5</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 6</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 7</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 8</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 9</td>
            </tr>
            <tr>
                <td><input type = "checkbox"/></td>
                <td>Dataset 10</td>
            </tr>
            </tbody>
        </table>

        <Link to='/download'><button onClick = "download_datasets()">Download Selected Datasets</button></Link>
        </div>
    )
    
}