import React from 'react';
import ReactDOM from 'react-dom';
import CheckinTable from './CheckinTable';
import CheckoutTable from './CheckoutTable';
import HwForm from './../Components/Pages/HwForm';
import {fireEvent, getByTestId, getQueriesForElement, queryByTestId} from '@testing-library/dom'
import {render, cleanup} from '@testing-library/react'; 

 afterEach(cleanup);
// import {render,unmountComponentAtNode} from 'react-dom';
// import {act} from 'react-dom/test-utils';

// let container = null;
// beforeEach(()=>{
//     //setup a DOM element as a render target
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });

// afterEach(()=>{
//     //cleanup
//     unmountComponentAtNode(container);
//     container.remove();
//     container=null;
// });

// it("render test",()=>{
//     act(()=>{
//         render(<CheckoutTable />, container);
//     });
//     // expect(container.getByText("Hardware Rental Service")).not.toBeNull();
// });

//success rendering
it("both check in/out renders without crashing", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<CheckoutTable />, div);
    ReactDOM.render(<CheckinTable />, div);
    // ReactDOM.render(<CheckoutTable />, div);
})


//user perspective
it("render CheckIn heading",()=>{
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


//Functionality-fireEvent

it('test checkbox response', () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<HwForm isLogin="true" userID={"60601c82cdd298d4ea3c5a04"} />, div); //<Redirect> <react> issue solve by passing props
    const {getByTestId} = render(<HwForm isLogin="true" userID={"60601c82cdd298d4ea3c5a04"} />);
    // const {getByText} = getQueriesForElement(div);
    const checkbox = getByTestId("outBox");
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });

  // test("defaultValue test",()=>{
//     const {container} = render(<CheckoutTable />);
//     const checkedbox_status = getByTestId(container, "test_arrow");
//     console.log(checkedbox_status);
//     const expected_checkbox = '6';
//     fireEvent.change(default_zero,{target:{defaultValue: testValue}})
//     expect(default_zero.textContent).toEqual(testValue);
// })