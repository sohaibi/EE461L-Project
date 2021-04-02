import React, {useEffect, useState} from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import './Datasets.css';

export default function Datasets(){

    const [Dataset1, setDataset1] = useState([]);
    const [Dataset2, setDataset2] = useState([]);
    const [Dataset3, setDataset3] = useState([]);
    const [Dataset4, setDataset4] = useState([]);
    const [Dataset5, setDataset5] = useState([]);
    const [Dataset6, setDataset6] = useState([]);
    const [Dataset7, setDataset7] = useState([]);
    const [Dataset8, setDataset8] = useState([]);
    const [Dataset9, setDataset9] = useState([]);
    const [Dataset10, setDataset10] = useState([]);
    const database_names = [];

    useEffect(() => {

        fetch('/datasets'
            /*{
                method: "GET",
                cache: 'force-cache',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    "content_type": "application/json",
                }
            }*/
        ).then(res => res.json()).then(
            data => {
                setDataset1(Dataset1 => data[0]);
                setDataset2(Dataset2 => data[1]);
                setDataset3(Dataset3 => data[2]);
                setDataset4(Dataset4 => data[3]);
                setDataset5(Dataset5 => data[4]);
                setDataset6(Dataset6 => data[5]);
                setDataset7(Dataset7 => data[6]);
                setDataset8(Dataset8 => data[7]);
                setDataset9(Dataset9 => data[8]);
                setDataset10(Dataset10 => data[9]);
                console.log(data);
                
            }).catch(error => {
                console.log("Dataset retrieval error", error);
            });
        
    
          }, []);

        // function handleDownload(){
        //     document.getElementById('download_button').innerText = "DOWNLOADING"
        //     var checkbox = document.getElementById('check1')
        //     if (checkbox.checked){
        //         database_names.push({Dataset1})
                
        //     }
        //     var checkbox = document.getElementById('check2')
        //     if (checkbox.checked){
        //         database_names.push({Dataset2})
        //     }
        //     var checkbox = document.getElementById('check3')
        //     if (checkbox.checked){
        //         database_names.push({Dataset3})
        //     }
        //     var checkbox = document.getElementById('check4')
        //     if (checkbox.checked){
        //         database_names.push({Dataset4})
        //     }
        //     var checkbox = document.getElementById('check5')
        //     if (checkbox.checked){
        //         database_names.push({Dataset5})
        //     }
        //     var checkbox = document.getElementById('check6')
        //     if (checkbox.checked){
        //         database_names.push({Dataset6})
        //     }
        //     var checkbox = document.getElementById('check7')
        //     if (checkbox.checked){
        //         database_names.push({Dataset7})
        //     }
        //     var checkbox = document.getElementById('check8')
        //     if (checkbox.checked){
        //         database_names.push({Dataset8})
        //     }
        //     var checkbox = document.getElementById('check9')
        //     if (checkbox.checked){
        //         database_names.push({Dataset9})
        //     }
        //     var checkbox = document.getElementById('check10')
        //     if (checkbox.checked){
        //         database_names.push({Dataset10})
        //     }
    
        // };

    return(
        <form action="/downloadDataSets" method="POST">
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
                <td><input type = "checkbox" id="Dataset1" name="Dataset1"/></td>
                <td>Dataset 1</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset2" name="Dataset2" /></td>
                <td>Dataset 2</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset3" name="Dataset3"/></td>
                <td>Dataset 3</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset4" name="Dataset4"/></td>
                <td>Dataset 4</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset5" name="Dataset5"/></td>
                <td>Dataset 5</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset6" name="Dataset6"/></td>
                <td>Dataset 6</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset7" name="Dataset7"/></td>
                <td>Dataset 7</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset8" name="Dataset8"/></td>
                <td>Dataset 8</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset9" name="Dataset9"/></td>
                <td>Dataset 9</td>
            </tr>
            <tr>
                <td><input type = "checkbox" id="Dataset10" name="Dataset10"/></td>
                <td>Dataset 10</td>
            </tr>
            </tbody>
        </table>
        <div>
            <h1>Pick a Project</h1>
            <p>please select which project these datasets are for</p>  
            <select name="ProjectSelect" id="ProjectSelect">
                <option value="Default">Default</option>
                <option value="Project1">Project 1</option>
                <option value="Project2">Project 2</option>
                <option value="Project3">Project 3</option>
            </select>
        </div>
                 

        

        </div>
        <input type="Submit" value="Download"></input>
        </form>

        
    )
    
}