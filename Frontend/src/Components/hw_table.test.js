import React from 'react';
import ReactDOM from 'react-dom';
import CheckinTable from './CheckinTable';
import CheckoutTable from './CheckoutTable';
import {getQueriesForElement} from '@testing-library/dom'
import {render, cleanup} from '@testing-library/react';
afterEach(cleanup);



//success rendering
it("renders without crashing", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<CheckinTable />, div);
    // ReactDOM.render(<CheckoutTable />, div);
})


//user perspective
test("render CheckIn heading",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<CheckinTable />, div);
    const {getByText} = getQueriesForElement(div);
    expect(getByText("Hardware Check-In")).not.toBeNull();
    // expect(getByText("Hardware ")).not.toBeNull();
    // expect(getByText("Check In")).not.toBeNull();
   
})


//html testing
test("render CheckIn heading",()=>{
    const div = document.createElement('div');
    ReactDOM.render(<CheckinTable />, div);
    expect(div.querySelector("h3").textContent).toBe("Hardware Check-In");
    // expect(div.querySelector("td").textContent).toBe("Hardware");
})


test("render CheckOut heading",()=>{
    const div = document.createElement('div');
    ReactDOM.render(<CheckoutTable />, div);
    expect(div.querySelector("h3").textContent).toBe("Hardware Check-Out");
    //expect(getByText("Hardware Check-Out")).not.toBeNull();
})