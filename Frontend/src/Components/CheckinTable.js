import React, { Component } from 'react';
import './CheckInOut.css';

/** TODO: Generate user data from backend */

/** Checkin Table Generator */
class CheckinTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [
                {id: 1, hardware: [1,2]},
                {id: 2, hardware: [1]}
            ],
            hwNum : 3
        }
    }

    //TODO: function to update checkin 

    renderCheckIn(proj) {
        var hw = this.state.projects[proj].hardware;
        var hwString = [];
        var i;
        for(i=0; i<hw.length; i++) {
            hwString[i] = "HW" + hw[i];
        }

        return hwString.map((hw, index) => {

            return (
                <>
                <input type="checkbox"></input>
                <label>{hw}</label>
                <br></br>
                </>
            )
        })
    }

    renderHwString(proj) {
        var hw = this.state.projects[proj].hardware;
        var hwString = ""
        var i;
        for(i=0; i<hw.length; i++) {
            hwString = hwString + "HW" + hw[i] + " "
        }

        return hwString;
    }

    renderTable() {
        return this.state.projects.map((project, index) => {
            const {id, hardware} = project

            return(
                <tr key={id}>
                    <td>Project {id}</td>
                    <td>{this.renderHwString(id-1)}</td>
                    <td>{this.renderCheckIn(id-1)}</td>
                </tr>
            )
        })
    }

    render() {
        return(
            <>
            <h3 className="io-heading">Hardware Checkin</h3>
            <div className="check-table-container">
                <p>You have {this.state.projects.length} projects with {this.state.hwNum} hardware sets checked out.</p>
                <table className="checked_table">
                    <tbody>
                        <tr>
                            <td>Projects</td>
                            <td>Hardware</td>
                            <td>Check In</td>
                        </tr>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
            </>
        );
    }
}

export default CheckinTable;