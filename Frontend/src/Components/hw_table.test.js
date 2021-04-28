import React from 'react';
import ReactDOM from 'react-dom';
import CheckinTable from './CheckinTable';
// import renderTable from './CheckoutTable';
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


    // jest.mock('./CheckoutTable.js');
    //essentially set functions inside CheckoutTable.js to [export const <fn_name> = jest.fn();]
    
    test("mock test: renderTable()",()=>{
        CheckinTable.renderTable = jest.fn(()=>"table will render");
        CheckinTable.renderTable();
        expect(CheckinTable.renderTable).toHaveBeenCalledTimes(1);
        expect(CheckinTable.renderTable()).toBe("table will render");
    })

    //restore original implementation
    test("mock test: spyOn",()=>{
        CheckoutTable.renderTable =jest.fn();
        const spy = jest.spyOn(CheckoutTable,"renderTable");

        spy.mockImplementation(()=>"override implementation");
        expect(CheckoutTable.renderTable()).toBe("override implementation");
        spy.mockRestore();
        expect(CheckoutTable.renderTable()).toBe(undefined);
    })

    // var checkList=[];
    // var checkout=[];

    // function handleCheckIn(childlist){
    //     checkinList = childlist;
    //     console.log("handle check in")
    // }

   

    // test("test CheckInTable.js with dummy data",()=>{
      

    //     const div = document.createElement('div');
    //     let hw_data = [{"HW_id":"1","HW_name":"hello","HW_use":6},{"HW_id":"2","HW_name":"world","HW_use":9}];
    //     let dummy_data = [{HW_changeNum: 3, HW_id: "1", HW_name: "hello"},{HW_changeNum: 3, HW_id: "2", HW_name: "world"}];

    //     // const checkTable= ReactDOM.render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn}/>, div);
    //     //const table1= ReactDOM.render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn}/>, div);
    //     var checkList=[];
    //     function testCheckIn(childlist){
    //         checkList=[...childlist];
    //         console.log("check list childlist received")
    //     }

    //     const {getByTestId} = render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn}/>, div);
    //     expect(checkList).toStrictEqual(dummy_data);
     

    //     // expect(table1.HWSet_rent_list).not.toBeNull; //undefine: never initialized
    //     // expect(table1.checkHW).toBe(true);
        
    // })

    test("test stepUp in CheckinTable.js ",()=>{

        const div = document.createElement('div');
        let hw_data = [{"HW_id":"1","HW_name":"hello","HW_use":6},{"HW_id":"2","HW_name":"world","HW_use":9}];
        let dummy_data = [{HW_changeNum: 2, HW_id: "1", HW_name: "hello"},{HW_changeNum: 4, HW_id: "2", HW_name: "world"}];

        // const checkTable= ReactDOM.render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn}/>, div);
        //const table1= ReactDOM.render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn}/>, div);
        var checkList=[];
        function testCheckIn(childlist){
            checkList=[...childlist];
            console.log("check list childlist received")
        }
        act(()=>{
            render(<CheckinTable HWSet_rent_list={hw_data} handleList={testCheckIn}/>, div);
        });
        

        //use setUp
        // const input = queryAllByText("inArrow");
        // const selectElement = document.querySelector('.ice-cream');
        const input = div.querySelectorAll(".hw-input");
        expect(input).toHaveLength(0);
        let checkin_number=0;
        for(var i=0; i<input.length; i++){
            checkin_number+=2
            input[i].stepUp(checkin_number);
            expect(input[i].value).toBe(checkin_number);
        }
        expect(checkList).toStrictEqual(dummy_data);
  
        
    })

describe("Mock examples",()=>{

    test("test with mock",()=>{
        const mock = jest.fn();
        let result = mock("foo");
        expect(result).toBeUndefined();
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test("mock test1",()=>{
        const mock = jest.fn(() => "bar");
        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    })
    
    test("mock test2",()=>{
        const mock = jest.fn().mockImplementationOnce(()=>"bar");
        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");

        expect(mock("boo")).toBe(undefined);
        expect(mock).toHaveBeenCalledWith("boo");
    })
})
    // const checkoutTable = new CheckoutTable();
    // const func = checkoutTable.renderTable();
    
    // const hwset={"HWSet_rent_list":[{"HW_id":"60620d7601d2dff8efbed3c1","HW_name":"test2","HW_use":4}]}
    // it("hook result",()=>{
    //     const div = document.createElement('div');
    //     const {getByTestId} =render(<CheckoutTable />, div);
    //     //const {getByTestId} = div.querySelector("input")
    //     // expect(div.querySelector("input").defaultValue).toEqual(0);
    //     const outArrow= getByTestId("outArrow");
    // })
})
  
