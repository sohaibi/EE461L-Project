import React, { useState, useEffect } from 'react';
import './CheckInOut.css';

function CheckinTable(props) {
    // /** get hardware checkin info, example format */
    //    [{"HW_id":"60620d64d962298b2837d3d7","HW_name":"test1","HW_use":8},
    //    {"HW_id":"60620d7601d2dff8efbed3c1","HW_name":"test2","HW_use":5}]
    const [HWSet_rent_list, setHWSet_rent_list] = useState([]);

    // a list to store the hardware to return from the user
    const [checkinList, setCheckinList] = useState([]);


    useEffect(() => {
        // get all the checkin HW infos
        setHWSet_rent_list(props.HWSet_rent_list);
        // console.log(props.HWSet_rent_list);
        // console.log("list updated!");

        // initialize the return list
        let list = [];
        for (var i = 0; i < props.HWSet_rent_list.length; i++) {
            list.push({
                "HW_id": props.HWSet_rent_list[i].HW_id,
                "HW_name": props.HWSet_rent_list[i].HW_name,
                "HW_changeNum": 0
            });
        }
        setCheckinList(list);
        // console.log("initialized checkin list", list);

    }, [props.HWSet_rent_list]);

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

        props.handleList(list);
        // console.log("For now I will do nothing");
        // console.log(list);
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
                                    type="number"
                                    className="hw-input"
                                    min={"0"}
                                    max={max}
                                    defaultValue={"0"}
                                    onChange={handleInput(index)}
                                    onKeyDown={(event) => { event.preventDefault(); }}>
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
            {/* <p>{JSON.stringify(checkinList)}</p> */}
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


        // "hi"

    );
}

export default CheckinTable;