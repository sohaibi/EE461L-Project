import React, { useState, useEffect } from 'react';
import './CheckInOut.css';

function CheckinTable(props) {
    // /** get hardware checkin info, example format */
    //    [{"HW_id":"60620d64d962298b2837d3d7","HW_name":"test1","HW_use":8},
    //    {"HW_id":"60620d7601d2dff8efbed3c1","HW_name":"test2","HW_use":5}]
    const [HWSet_rent_list, setHWSet_rent_list] = useState([]); //comment out for testing
    //const [HWSet_rent_list, setHWSet_rent_list] = useState([{"HW_id":"1","HW_name":"hello","HW_use":6},{"HW_id":"2","HW_name":"world","HW_use":9}]);

    // a list to store the hardware to return from the user
    // [{HW_changeNum: 0, HW_id: "60620d7601d2dff8efbed3c1", HW_name: "test2"}]
    const [checkinList, setCheckinList] = useState([{HW_changeNum: 3, HW_id: "1", HW_name: "hello"},{HW_changeNum: 3, HW_id: "2", HW_name: "world"}]); //comment out for testing
    //const [checkinList, setCheckinList] = useState([]);

//comment out for testing
    useEffect(() => {
        if (props.HWSet_rent_list !== undefined){  //add undefined condition for jest testing
                    // get all the checkin HW infos
        setHWSet_rent_list(props.HWSet_rent_list); //!!!! overwrites dummy data; comment out when testing
      
        ////initialize the return list
        
        // let list = [];
        // for (var i = 0; i < props.HWSet_rent_list.length; i++) {
        //     list.push({
        //         "HW_id": props.HWSet_rent_list[i].HW_id,
        //         "HW_name": props.HWSet_rent_list[i].HW_name,
        //         "HW_changeNum": 0
        //     });
        // }
        let list = [...checkinList] //set to dummy data
        setCheckinList(list); 
        props.handleList(list); //added function for testing //return data to callback fn
        }

    }, [HWSet_rent_list]);

    // check if a user has any hardware in rent
    function checkHW() {
            return HWSet_rent_list.length > 0 ? false : true;
    }

    // check if input is within range and update checkinlist
    const handleInput = index => event => {
        var input = parseInt(event.target.value);
        let list = [...checkinList];
        list[index].HW_changeNum = input;
        setCheckinList(list);
        console.log("check in user input change...")

        props.handleList(list);
        // console.log("For now I will do nothing");
        console.log(list);
    };

    // creates form table
    function renderTable() {
        return HWSet_rent_list.map((hw, index) => {
            if (hw.HW_use > 0) {
                var max = hw.HW_use.toString();

                return (
                    <>
                    
                        <tr key={index.toString()}>
                            {/* <td>{HW_names[index]}</td> */}
                            <td>{hw.HW_name}</td>
                            <td>
                                <input
                                    data-testid='inArrow'
                                    type="number"
                                    className="hw-input"
                                    min={"0"}
                                    max={max}
                                    defaultValue={"0"}
                                    onChange={handleInput(index)}
                                    onKeyDown={(event) => { event.preventDefault(); }}
                                    >
                                </input>
                                <label>/{max}</label>
                            </td>
                        </tr>
                    </>
                );
            } else {
                return (
                    <></>
                );
            }
        })
    }

    return (
        <>
            {/* <p>{JSON.stringify(checkinList)}</p>
            {JSON.stringify(HWSet_rent_list)} */}
            <h3 className="io-heading">Hardware Check-In</h3>
            <div className="check-table-container">
                <p className="check-text"
                    id={checkHW()
                        ? 'showPara'
                        : 'hidePara'
                    }>
                    You currently have&nbsp;
                <span className="hw-spanText">0</span>
                &nbsp;hardware checked in.
            </p>
                <table className="checked_table"
                    id={!checkHW()
                        ? 'showTable'
                        : 'hideTable'
                    }>
                    <tbody>
                        <tr>
                            <td>Hardware</td>
                            <td>Check In</td>
                        </tr>
                        {renderTable()}
                    </tbody>
                </table>
            </div>
        </>




    );
}

export default CheckinTable;