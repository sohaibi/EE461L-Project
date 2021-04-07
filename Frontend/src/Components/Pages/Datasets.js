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
    const [Dataset1T, setDataset1T] = useState([]);
    const [Dataset2T, setDataset2T] = useState([]);
    const [Dataset3T, setDataset3T] = useState([]);
    const [Dataset4T, setDataset4T] = useState([]);
    const [Dataset5T, setDataset5T] = useState([]);
    const [Dataset6T, setDataset6T] = useState([]);
    const [Dataset7T, setDataset7T] = useState([]);
    const [Dataset8T, setDataset8T] = useState([]);
    const [Dataset9T, setDataset9T] = useState([]);
    const [Dataset10T, setDataset10T] = useState([]);

    useEffect(() => {

    fetch('/dataset_names'
    ).then(res => res.json()).then(
        data => {
            //These are the dataset names
            setDataset1(Dataset1 => data[0]);
            setDataset2(Dataset2 => data[1]);
            setDataset3(Dataset3 => data[2]);
            setDataset4(Dataset4 => data[3]);
            setDataset5(Dataset5 => data[4]);
            setDataset6(Dataset6 => data[5]);
            setDataset7(Dataset7 => data[11]);
            setDataset8(Dataset8 => data[7]);
            setDataset9(Dataset9 => data[8]);
            setDataset10(Dataset10 => data[9]);
            console.log(data);
            
        }).catch(error => {
            console.log("Dataset retrieval error", error);
        });

        fetch('/dataset_titles'
        ).then(res => res.json()).then(
        data => {
            //These are the dataset keys
            setDataset1T(Dataset1T => data[0]);
            setDataset2T(Dataset2T => data[1]);
            setDataset3T(Dataset3T => data[2]);
            setDataset4T(Dataset4T => data[3]);
            setDataset5T(Dataset5T => data[4]);
            setDataset6T(Dataset6T => data[5]);
            setDataset7T(Dataset7T => data[11]);
            setDataset8T(Dataset8T => data[7]);
            setDataset9T(Dataset9T => data[8]);
            setDataset10T(Dataset10T => data[9]);
            console.log(data);
            
        }).catch(error => {
            console.log("Dataset retrieval error", error);
        });
    

      }, []);

      //Returns table with dataset names and download buttons
          return(
        <div className = 'Datasets'>
            <h1>Datasets</h1>
            <p>  Select Datasets to download.</p>

            <table id = 'dataset_table'>
            <thead>
            <tr>
                <th>Datasets</th>
                <th>Click to Download</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>                  
                     <p>{Dataset1}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip">Download</a>
                </td>
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset2}</p>
                </td>
                
                <td>
                   <a href="https://www.physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip">Download</a>
                </td>
                
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset3}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/afdb/mit-bih-atrial-fibrillation-database-1.0.0.zip">Download</a>
                </td>
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset4}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/afpdb/paf-prediction-challenge-database-1.0.0.zip">Download</a>
                </td>
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset5}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip">Download</a>
                </td>
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset6}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip">Download</a>
                </td>
            </tr>
            <tr>
            <   td>                  
                     <p>{Dataset7}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/body-sway-music-vr/body-sway-when-standing-and-listening-to-music-modified-to-reinforce-virtual-reality-environment-motion-1.0.0.zip">Download</a>
                </td>
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset8}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/apnea-ecg/apnea-ecg-database-1.0.0.zip">Download</a>
                </td>
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset9}</p>
                </td>
                <td>
                   <a href="https://storage.googleapis.com/bhx-brain-bounding-box-1.1.physionet.org/brain-hemorrhage-extended-bhx-bounding-box-extrapolation-from-thick-to-thin-slice-ct-images-1.1.zip">Download</a>
                </td>
            </tr>
            <tr>
                <td>                  
                     <p>{Dataset10}</p>
                </td>
                <td>
                   <a href="https://www.physionet.org/static/published-projects/bidmc/bidmc-ppg-and-respiration-dataset-1.0.0.zip">Download</a>
                </td>
            </tr>
            </tbody>
        </table>
      
        </div>
    )
    // return(
    //     <div className = 'Datasets'>
    //         <h1>Datasets</h1>
    //         <p>  Select Datasets to download.</p>

    //         <table id = 'dataset_table'>
    //         <thead>
    //         <tr>
    //             <th>Datasets</th>
    //             <th>Click to Download</th>
    //         </tr>
    //         </thead>
    //         <tbody>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset1}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset1T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset2}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset2T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset3}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset3T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset4}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset4T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset5}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset5T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset6}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset6T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //         <   td>                  
    //                  <p>{Dataset7}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset7T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset8}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset8T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset9}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset9T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>                  
    //                  <p>{Dataset10}</p>
    //             </td>
    //             <td>
    //                <form action="/uploads" method='POST'>
    //                    <select hidden name='filepath' id="filepath"><option selected>{Dataset10T}</option></select>
    //                    <input type="submit" value="Download"></input>
    //                 </form> 
    //             </td>
    //         </tr>
    //         </tbody>
    //     </table>
      
    //     </div>
    // )
    
}