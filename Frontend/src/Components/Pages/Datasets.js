import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import './Datasets.css';

export default function Datasets() {

    const [data_keys, setData_Keys] = useState([]);
    const [data_names, setData_Names] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const index = [0,1,2,3,4,5,6,7,8,9];

    useEffect(() => {

        fetch('/dataset_info').then(res=> res.json()).then(
            data =>{
                setData_Names(data_names, []);
                setData_Keys(data_keys, []);
                var i = 0;
                for(i=0; i<10; i++){
                    if(i==6){
                        i = 11;
                    }
                    var data_key = String(data[0][i]);
                   
                    setData_Keys(data_keys => [...data_keys, data_key]);
                    var data_name = String(data[1][i]);
                    setDatasets(datasets => [...datasets, data_name]);
                    data_name = data_name.split(" ").join("-");
                    data_name = data_name.replace("/", "");
                    data_name= data_name.replace("(", "");
                    data_name = data_name.replace(")", "");
                    data_name = data_name.toLowerCase();
                    
                    setData_Names(data_names => [...data_names, data_name]);
                    if(i==11){
                        i=6;
                    }
                }
            }
        ).catch(error => {
            console.log("Dataset retrieval error", error);
        });

    }, []);

    async function handleClick(number, id){
        var url = "https://www.physionet.org/static/published-projects/"+data_keys[number]+"/"+data_names[number]+"-1.0.0.zip";
        document.getElementById(id).setAttribute("href", url);
    }


    //Returns table with dataset names and download buttons
    return (
        <div class='Datasets'>
            {/* <h1>Datasets</h1>
            <p>  Select Datasets to download.</p> */}
            <table id='dataset_table'>
                <thead>
                    <tr>
                        <th>Datasets</th>
                        <th>Click to Download</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>{datasets[0]}</p>
                        </td>
                        <td>
                            {/*https://www.physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip*/ }
                            <a id="link0" href="" onClick={() => handleClick(0, "link0")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <td> 
                            <p>{datasets[1]}</p>
                        </td>

                        <td>
                        <a id="link1" href="" onClick={()=> handleClick(1, "link1")}>Download</a>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <p>{datasets[2]}</p>
                        </td>
                        <td>
                            <a id="link2" href="" onClick={()=> handleClick(2, "link2")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{datasets[3]}</p>
                        </td>
                        <td>
                            <a id="link3" href="" onClick={()=> handleClick(3, "link3")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{datasets[4]}</p>
                        </td>
                        <td>
                            <a id="link4" href="" onClick={()=> handleClick(4, "link4")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{datasets[5]}</p>
                        </td>
                        <td>
                            <a id="link5" href="" onClick={()=> handleClick(5, "link5")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <   td>
                            <p>{datasets[6]}</p>
                        </td>
                        <td>
                            <a id="link6" href="" onClick={()=> handleClick(6, "link6")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{datasets[7]}</p>
                        </td>
                        <td>
                            <a id="link7" href="" onClick={()=> handleClick(7, "link7")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{datasets[8]}</p>
                        </td>
                        <td>
                            <a id="link8" href="" onClick={()=> handleClick(8, "link8")}>Download</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{datasets[9]}</p>
                        </td>
                        <td>
                            <a id="link9" href="" onClick={()=> handleClick(9, "link9")}>Download</a>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )

}