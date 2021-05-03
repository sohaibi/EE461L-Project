import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import './DownloadDatasets.css';

export default function DownloadDatasets(){
    return(
        <div>
            <h1>Downloading Datasets...</h1>
            <p>please select which project these datasets are for</p>  
            <select name="ProjectSelect" id="ProjectSelect">
                <option value="Default">Default</option>
                <option value="Project1">Project 1</option>
                <option value="Project2">Project 2</option>
                <option value="Project3">Project 3</option>
            </select>
            <Link to='/datasets'><button>Reselect Datasets</button></Link>
            <Link to='/'><button >Download</button></Link>
        </div>
    )
}