import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import './Datasets.css';

export default function Datasets() {

    const [data_keys, setData_Keys] = useState([]);
    const [data_names, setData_Names] = useState([]);
    const [datasets, setDatasets] = useState([]);

    //Grabs all the dataset information from the back end
    //data_keys holds the dictionary keys to the dataset names
    //datasets holds the nice looking dataset names that are displayed
    //data_names hold the names of datasets formated to work properly in urls
    useEffect(() => {

        fetch('/dataset_info').then(res => res.json()).then(
            data => {
                setData_Names(data_names, []);
                setData_Keys(data_keys, []);
                var i = 0;
                for (i = 0; i < 10; i++) {
                    if (i == 6) {
                        i = 11;
                    }
                    var data_key = String(data[0][i]);

                    setData_Keys(data_keys => [...data_keys, data_key]);
                    var data_name = String(data[1][i]);
                    setDatasets(datasets => [...datasets, data_name]);
                    data_name = data_name.split(" ").join("-");
                    data_name = data_name.replace("/", "");
                    data_name = data_name.replace("(", "");
                    data_name = data_name.replace(")", "");
                    data_name = data_name.toLowerCase();

                    setData_Names(data_names => [...data_names, data_name]);
                    if (i == 11) {
                        i = 6;
                    }

                }
            }
        ).catch(error => {
            console.log("Dataset retrieval error", error);
        });

    }, []);

    //The function used to generate the table, including the url links
    async function renderTableData(id_table, id_button) {
        var myTable = document.getElementById(id_table);
        var button = document.getElementById(id_button);
        button.parentNode.removeChild(button);
        for (var i = 0; i < 10; i++) {
            var new_row = myTable.insertRow(i + 1);
            var dataset_name = new_row.insertCell(0);
            var dataset_link = new_row.insertCell(1);
            dataset_name.innerHTML = String(datasets[i]);
            var url = "https://www.physionet.org/static/published-projects/" + data_keys[i] + "/" + data_names[i] + "-1.0.0.zip";
            dataset_link.innerHTML = "<a id='id' href=''>Download</a>";
            var temp = dataset_link.getElementsByTagName('a')[0];
            temp.setAttribute("href", url);
            console.log(dataset_link);
            console.log(datasets[i]);
        }
        console.log(myTable.rows.length);
    }


    //Returns table with dataset names and download buttons
    return (
        <div class='Datasets'>
            {/* <h1>Datasets</h1>
            <p>  Select Datasets to download.</p> */}
            <h1 >How to Download Datasets</h1>
            <p>The datasets provided by our website are taken from a website called PhysioNet. They download in the form of a zip and once expanded contains
            .cvs, .hea, and .dat. As well as others. All screening of specific document data is done by PhysioNet. If you would like ot continue please press
                 the button below. </p>
            <table id="dynamic_table">
                <thead>
                    <tr>
                        <th>Datasets</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div>
                <button id="button" onClick={() => renderTableData("dynamic_table", "button")}>Continue to Dataset Options</button>
            </div>
        </div>
    )

}