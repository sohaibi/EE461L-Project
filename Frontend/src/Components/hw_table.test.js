import React from 'react';
import ReactDOM from 'react-dom';
import CheckinTable from './CheckinTable';
import renderTable from './CheckoutTable';
import interval from './CheckoutTable';
import CheckoutTable from './CheckoutTable';
import HwForm from './../Components/Pages/HwForm';
import {fireEvent, getByTestId, getQueriesForElement, queryByTestId} from '@testing-library/dom'
import {render, cleanup, act} from '@testing-library/react'; 
import {renderHook} from '@testing-library/react-hooks'

 afterEach(cleanup);

describe("Rendering Tests",()=>{

    //success rendering
    it("both check in/out renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<CheckoutTable />, div);
        ReactDOM.render(<CheckinTable />, div);
    })


    //user perspective
    it("render CheckIn heading (user-friendly)",()=>{
        const div = document.createElement("div");
        ReactDOM.render(<CheckinTable />, div);
        const {getByText} = getQueriesForElement(div);
        expect(getByText("Hardware Check-In")).not.toBeNull();
        // expect(getByText("Hardware ")).not.toBeNull();
        // expect(getByText("Check In")).not.toBeNull();
    
    })

    //html testing
    it("render CheckIn heading",()=>{
        const div = document.createElement('div');
        ReactDOM.render(<CheckinTable />, div);
        expect(div.querySelector("h3").textContent).toBe("Hardware Check-In");
        // expect(div.querySelector("td").textContent).toBe("Hardware");
    })



    it("render CheckOut heading",()=>{
        const div = document.createElement('div');
        ReactDOM.render(<CheckoutTable />, div);
        const {getByText} = getQueriesForElement(div);
        //expect(div.querySelector("h3").textContent).toBe("Hardware Check-Out");
        expect(getByText("Hardware Check-Out")).not.toBeNull();
        expect(getByText("Current Amount")).not.toBeNull();
        expect(getByText("Check Out")).not.toBeNull();
        // expect(getByText("test1")).not.toBeNull();
        // expect(getByText("test2")).not.toBeNull();
        // expect(getByText("test3")).not.toBeNull();
        // expect(getByText("test4")).not.toBeNull();
    })

    it("render checkbox labels",()=>{
        const div = document.createElement('div');
        const{getByLabelText}=render(<HwForm isLogin="true" userID={"60601c82cdd298d4ea3c5a04"} />);
        const checkin = getByLabelText("Checking In");
        const checkout = getByLabelText("Checking Out");
        expect(checkin).not.toBeNull;
        expect(checkout).not.toBeNull;
    })

})





//Functionality Test Cases
describe('Functionality Tests',()=>{
    it('test checkbox response', () => {
        // const div = document.createElement('div');
        // ReactDOM.render(<HwForm isLogin="true" userID={"60601c82cdd298d4ea3c5a04"} />, div); //<Redirect> <react> issue solve by passing props
        const {getByTestId} = render(<HwForm isLogin="true" userID={"60601c82cdd298d4ea3c5a04"} />);
        // const {getByText} = getQueriesForElement(div);
        const in_checkbox = getByTestId("inBox"); //'check in' checkbox
        expect(in_checkbox.checked).toEqual(false);
        fireEvent.click(in_checkbox);
        expect(in_checkbox.checked).toEqual(true);
        fireEvent.click(in_checkbox);
        expect(in_checkbox.checked).toEqual(false);
        
        const out_checkbox = getByTestId("outBox"); //'check out' checkbox
        expect(out_checkbox.checked).toEqual(false);
        fireEvent.click(out_checkbox);
        expect(out_checkbox.checked).toEqual(true);
        fireEvent.click(out_checkbox);
        expect(out_checkbox.checked).toEqual(false);
    });

    // const checkoutTable = new CheckoutTable();
    // const func = checkoutTable.renderTable();
    
    //const hwset={"HWSet_rent_list":[{"HW_id":"60620d7601d2dff8efbed3c1","HW_name":"test2","HW_use":4}]}
    // it("hook result",()=>{
    //     const div = document.createElement('div');
    //     const {getByTestId} =render(<CheckoutTable />, div);
    //     //const {getByTestId} = div.querySelector("input")
    //     // expect(div.querySelector("input").defaultValue).toEqual(0);
    //     const outArrow= getByTestId("outArrow");
    // })
})
  

// const renderTable = jest.fn();
// it("mocking",()=>{
//     // expect(renderTable()).not.toBeNull;
//     expect(renderTable).toHaveBeenCalledTimes(1);
// })

//   it('test up arrow',()=>{
//     const {getByTestId}= render(<CheckoutTable />);
//     // const selector = getByTestId("upArrow");
//     const renderta=getByTestId.renderTable()
//     expect(renderTable.getByTestId("inArrow")).not.toBeNull
//   })
  