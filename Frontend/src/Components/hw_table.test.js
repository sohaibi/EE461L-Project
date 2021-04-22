import React from 'react';
import ReactDOM from 'react-dom';
import CheckinTable from './CheckinTable';
import CheckoutTable from './CheckoutTable';
import {fireEvent, getByTestId, getQueriesForElement} from '@testing-library/dom'
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
    const {getByText} = getQueriesForElement(div);
   //expect(div.querySelector("h3").textContent).toBe("Hardware Check-Out");
    expect(getByText("Hardware Check-Out")).not.toBeNull();
    expect(getByText("Current Amount")).not.toBeNull();
    expect(getByText("Check Out")).not.toBeNull();
    //expect(getByText("test1")).not.toBeNull();
    // expect(getByText("test2")).not.toBeNull();
    // expect(getByText("test3")).not.toBeNull();
    // expect(getByText("test4")).not.toBeNull();
})


//Functionality-fireEvent-currently unavailable
test("defaultValue test",()=>{
    const {container} = render(<CheckoutTable />);
    const default_zero = getByTestId(container, "testing");
    const testValue = '6';
    fireEvent.change(default_zero,{target:{defaultValue: testValue}})
    expect(default_zero.textContent).toEqual(testValue);
})