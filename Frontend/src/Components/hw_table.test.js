import React from 'react';
import ReactDOM from 'react-dom';
import CheckinTable from './CheckinTable';
import CheckoutTable from './CheckoutTable';
import HwForm from './../Components/Pages/HwForm';
import { fireEvent, getByTestId, getQueriesForElement, queryByTestId } from '@testing-library/dom'
import { render, act } from '@testing-library/react';

describe("Rendering Tests", () => {

    //success rendering
    it("both check in/out renders without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<CheckoutTable />, div);
        ReactDOM.render(<CheckinTable />, div);
    })


    //user perspective
    it("render CheckIn heading (user-friendly)", () => {
        const div = document.createElement("div");
        ReactDOM.render(<CheckinTable />, div);
        const { getByText } = getQueriesForElement(div);
        expect(getByText("Hardware Check-In")).not.toBeNull();

    })

    //html testing
    it("render CheckIn heading", () => {
        const div = document.createElement('div');
        ReactDOM.render(<CheckinTable />, div);
        expect(div.querySelector("h3").textContent).toBe("Hardware Check-In");
    })



    it("render CheckOut heading", () => {
        const div = document.createElement('div');
        ReactDOM.render(<CheckoutTable />, div);
        const { getByText } = getQueriesForElement(div);
        //expect(div.querySelector("h3").textContent).toBe("Hardware Check-Out");
        expect(getByText("Hardware Check-Out")).not.toBeNull();
        expect(getByText("Current Amount")).not.toBeNull();
        expect(getByText("Check Out")).not.toBeNull();
    })

    it("render checkbox labels", () => {
        const div = document.createElement('div');
        const { getByLabelText } = render(<HwForm isLogin={true} userID={"60601c82cdd298d4ea3c5a04"} />);
        const checkin = getByLabelText("Checking In");
        const checkout = getByLabelText("Checking Out");
        expect(checkin).not.toBeNull;
        expect(checkout).not.toBeNull;
    })

})





//Functionality Test Cases
describe('Functionality Tests', () => {

    it('test checkbox response', () => {
        const { getByTestId } = render(<HwForm isLogin="true" userID={"60601c82cdd298d4ea3c5a04"} />);
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


    // jest.mock('./CheckoutTable.js');
    //essentially set functions inside CheckoutTable.js to [export const <fn_name> = jest.fn();]

    // test("mock test: renderTable()",()=>{
    //     CheckinTable.renderTable = jest.fn(()=>"table will render");
    //     CheckinTable.renderTable();
    //     expect(CheckinTable.renderTable).toHaveBeenCalledTimes(1);
    //     expect(CheckinTable.renderTable()).toBe("table will render");
    // })

    // //restore original implementation
    // test("mock test: spyOn",()=>{
    //     CheckoutTable.renderTable =jest.fn();
    //     const spy = jest.spyOn(CheckoutTable,"renderTable");

    //     spy.mockImplementation(()=>"override implementation");
    //     expect(CheckoutTable.renderTable()).toBe("override implementation");
    //     spy.mockRestore();
    //     expect(CheckoutTable.renderTable()).toBe(undefined);
    // })



    test("test CheckInTable.js against dummy data", () => {


        const div = document.createElement('div');
        let hw_data = [{ "HW_id": "1", "HW_name": "hello", "HW_use": 6 }, { "HW_id": "2", "HW_name": "world", "HW_use": 9 }];
        let dummy_data = [{ HW_changeNum: 3, HW_id: "1", HW_name: "hello" }, { HW_changeNum: 3, HW_id: "2", HW_name: "world" }];

        var checkList = [];
        function testCheckIn(childlist) {
            checkList = [...childlist];
            console.log("check list childlist received")
        }

        const { toStrictEqual } = render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn} />, div);
        expect(checkList).toStrictEqual(dummy_data);

    })


    test("test stepUp/Down in CheckinTable.js ", () => {

        // setHWSet_rent_list(props.HWSet_rent_list); 
        //overwrites dummy data, must comment out in checkin.js IF initialize useState to dummy data & want to observe visual output

        const div = document.createElement('div');
        let hw_data = [{ "HW_id": "1", "HW_name": "hello", "HW_use": 6 }, { "HW_id": "2", "HW_name": "world", "HW_use": 9 }];
        let dummy_data = [{ HW_changeNum: 5, HW_id: "1", HW_name: "hello" }, { HW_changeNum: 7, HW_id: "2", HW_name: "world" }];

        var checkList = [];
        function testCheckIn(childlist) {
            checkList = [...childlist];
            console.log("check list childlist received")
        }
        const { getByText, queryAllByTestId } = render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn} />, div);

        // expect(checkList).toStrictEqual(dummy_data);

        //check correct max value
        let input = queryAllByTestId("inArrow");
        expect(input.length).toBe(2);
        let hello_row = input[0];
        let hello_bytext = getByText("hello"); //return <td>hello</td>
        expect(hello_row.max).toBe("6");

        let world_row = input[1];
        let world_bytext = getByText("world"); //return <td>hello</td>
        expect(world_row.max).toBe("9");

        //check stepUp functionality
        let checkin_number = 0; //checkin number increment by two for each hardware
        for (let i = 0; i < input.length; i++) {
            checkin_number += 2;
            input[i].stepUp(checkin_number);
            expect(input[i].value).toBe(checkin_number.toString()); //number input box functions correctly
        }

        //"rerender" after increment
        let input_afterincre = queryAllByTestId("inArrow");
        expect(input_afterincre.length).toBe(2);
        expect(input_afterincre[0].value).toBe("2");
        expect(input_afterincre[1].value).toBe("4");

        //decrement input value
        let decrement = 0;
        for (let i = 0; i < input.length; i++) {
            decrement += 10;
            input_afterincre[i].stepDown(decrement);
            expect(input[i].value).toBe("0"); //min value must be 0 == no negative hardware amt allowed
            const algebraic_output = parseInt(input_afterincre[i].value) - parseInt(decrement);
            expect(input_afterincre[i].value).not.toBe(algebraic_output.toString()); //number input box functions correctly
        }

        //"rerender" after decrement
        let input_afterdecre = queryAllByTestId("inArrow");
        expect(input_afterdecre.length).toBe(2);
        expect(input_afterdecre).not.toBeNull();
        expect(input_afterdecre[0].value).toBe("0");
        expect(input_afterdecre[1].value).toBe("0");

    })





    // describe("Mock examples",()=>{

    //     test("test with mock",()=>{
    //         const mock = jest.fn();
    //         let result = mock("foo");
    //         expect(result).toBeUndefined();
    //         expect(mock).toHaveBeenCalled();
    //         expect(mock).toHaveBeenCalledTimes(1);
    //         expect(mock).toHaveBeenCalledWith("foo");
    //     });

    //     test("mock test1",()=>{
    //         const mock = jest.fn(() => "bar");
    //         expect(mock("foo")).toBe("bar");
    //         expect(mock).toHaveBeenCalledWith("foo");
    //     })

    //     test("mock test2",()=>{
    //         const mock = jest.fn().mockImplementationOnce(()=>"bar");
    //         expect(mock("foo")).toBe("bar");
    //         expect(mock).toHaveBeenCalledWith("foo");

    //         expect(mock("boo")).toBe(undefined);
    //         expect(mock).toHaveBeenCalledWith("boo");
    //     })
    // })

})

