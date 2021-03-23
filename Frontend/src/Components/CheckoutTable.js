import React, {Component} from 'react';
import './CheckInOut.css';

class CheckoutTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            availabilities : [10, 8, 7, 10],
            capacities : [20, 20, 15, 10]
        }
    }

    /* TODO: connect to backend and generate available hardware */

    renderTable() {
        
    }

    render() {
        return(
            <>
            <h3 className="io-heading">Hardware Checkout</h3>
            <div className="check-table-container">
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

export default CheckoutTable;