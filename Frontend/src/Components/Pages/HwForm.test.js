import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Checkin from '../CheckinTable';
import Checkout from '../CheckoutTable';


var checkinList = [];
var checkoutList = [];

// callback functions for rendering
function handleCheckIn(childList) {
    checkinList = childList;
    console.log("received checkin list from child!")
}
function handleCheckOut(childList) {
    checkoutList = childList;
    console.log("received checkout list from child!")
}

/**
 * renderCheckin - renders checkin table for testing
 *  CheckinTable props: 
 *      HWSet_rent_list - list of hardware that can be checked in
 *      handleList - callback function for list hardware checking in
 */
function renderCheckin() {
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("CheckinTable Rendering", () => {
        // test for when hardware list is empty 
        let test0 = [];
        act(() => {
            render(<Checkin
                HWSet_rent_list={test0}
                handleList={handleCheckIn}
            />, container);
        });
        let rows1 = container.getElementsByTagName("TR");
        expect(rows1.length).toBe(1);

        // test for when hardware is all 0s
        let test1 = [
            { "HW_id": "0", "HW_name": "set1", "HW_use": 0 },
            { "HW_id": "1", "HW_name": "set2", "HW_use": 0 },
            { "HW_id": "2", "HW_name": "set3", "HW_use": 0 },
            { "HW_id": "3", "HW_name": "set4", "HW_use": 0 }
        ];
        act(() => {
            render(<Checkin
                HWSet_rent_list={test1}
                handleList={handleCheckIn}
            />, container);
        });
        let rows2 = container.getElementsByTagName("TR");
        expect(rows2).toHaveLength(1);

        // test for when hardware contains all positive values
        let test2 = [
            { "HW_id": "0", "HW_name": "set1", "HW_use": 2 },
            { "HW_id": "1", "HW_name": "set2", "HW_use": 4 },
            { "HW_id": "2", "HW_name": "set3", "HW_use": 6 },
            { "HW_id": "3", "HW_name": "set4", "HW_use": 8 }
        ];
        act(() => {
            render(<Checkin
                HWSet_rent_list={test2}
                handleList={handleCheckIn}
            />, container);
        });
        let rows3 = container.getElementsByTagName("TR");
        expect(rows3).toHaveLength(test2.length + 1);

        // check contents of each row
        var i;
        for (i = 1; i < rows3; i++) {
            let row_id = rows3[i].getElementsByTagName("TD")[0].textContent;
            expect(row_id).toBe(test2[i].HW_name);
            let max_label = rows3[i].getElementsByTagName("TD")[1].querySelector('label');
            expect(max_label.textContent).toBe('/' + test2[i].HW_use.toString());
        }
    });
}

/**
 * renderCheckout - renders checkout table for testing
 *  CheckoutTable props: 
 *      HWSet_rent_list - list of hardware that can be checked in
 *      handleList - callback function for list hardware checking in
 */
function renderCheckout() {
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("CheckoutTable Rendering", () => {
        const hw_size = 4;

        // test for when hardware list is empty
        let test0 = [];
        act(() => {
            render(<Checkout
                HWSet_rent_list={test0}
                handleList={handleCheckOut}
            />, container);
        });
        let rows1 = container.getElementsByTagName("TR");
        expect(rows1).toHaveLength(hw_size + 1);


        // test for when hardware contains 0 and positive values
        let test2 = [
            { "HW_id": "0", "HW_name": "set1", "HW_use": 0 },
            { "HW_id": "1", "HW_name": "set2", "HW_use": 3 },
            { "HW_id": "2", "HW_name": "set3", "HW_use": 4 },
            { "HW_id": "3", "HW_name": "set4", "HW_use": 5 }
        ];

        act(() => {
            render(<Checkout
                HWSet_rent_list={test2}
                handleList={handleCheckOut}
            />, container);
        });
        let rows3 = container.getElementsByTagName("TR");
        expect(rows3).toHaveLength(hw_size + 1);

        // test contents of each row
        var i;
        for (i = 1; i < rows3.length; i++) {
            let data = rows3[i].getElementsByTagName("TD");

            let hw_name = data[0].textContent;
            expect(hw_name).toBe(test2[i - 1].HW_name);

            let hw_use = data[1].textContent;
            expect(hw_use).toBe((test2[i - 1].HW_use).toString());
        }
    });
}

/**
 * funcCheckOut - tests functionality of checking out hardware
 */
function funcCheckOut() {
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    // checked out hardware
    let test = [
        { "HW_id": "0", "HW_name": "set1", "HW_use": 0 },
        { "HW_id": "1", "HW_name": "set2", "HW_use": 0 },
        { "HW_id": "2", "HW_name": "set3", "HW_use": 0 },
        { "HW_id": "3", "HW_name": "set4", "HW_use": 0 }
    ];

    // test for when input exceeds max
    it("CheckoutTable Functionality: exceed max input", () => {
        // callback function for props
        let checkList = [];
        function testCheckOut(childList) {
            checkList = [...childList];
            console.log("received checkout list from child!")
        }

        // render Checkout
        act(() => {
            render(<Checkout
                HWSet_rent_list={test}
                handleList={testCheckOut}
            />, container);
        });

        // set the values of the number inputs
        const inputs = container.querySelectorAll(".hw-input");
        expect(inputs).toHaveLength(4);

        var i;
        for (i = 0; i < inputs.length; i++) {
            var expectValue = inputs[i].max;
            // console.log(expectValue);

            act(() => {
                inputs[i].stepUp(1000); // increase the input amount to exceed the maximum value
                // console.log(inputs[i].value);
                let event = new Event('input', { bubbles: true });
                event.simulated = true;
                inputs[i].dispatchEvent(event);
            });
            expect(parseInt(inputs[i].value)).toBe(parseInt(expectValue)); // expect the input value to be the expected maximum value
            expect(checkList[i].HW_changeNum).toBe(parseInt(expectValue)); // expect the HW_changeNum equals to the the expected maximum value
        }



    });

    // test for when input is negative
    it("CheckoutTable Functionality: negative checkout", () => {
        // callback function for props
        let checkList = [];
        function testCheckOut(childList) {
            checkList = [...childList];
            console.log("received checkout list from child!")
        }

        // render Checkout
        act(() => {
            render(<Checkout
                HWSet_rent_list={test}
                handleList={testCheckOut}
            />, container);
        });

        // set the values of the number inputs
        const inputs = container.querySelectorAll(".hw-input");
        expect(inputs).toHaveLength(4);

        var i;
        for (i = 0; i < inputs.length; i++) {
            act(() => {
                inputs[i].stepDown(1);
                let event = new Event('input', { bubbles: true });
                event.simulated = true;
                inputs[i].dispatchEvent(event);
            });
            expect(inputs[i].value).toBe("0");
            expect(checkList[i].HW_changeNum).toBe(parseInt("0"));

        }


    });

    // test for when all hardware types are checked out
    it("CheckoutTable Functionality: normal checkout", () => {
        // callback function for props
        let checkList = [];
        function testCheckOut(childList) {
            checkList = [...childList];
            console.log("received checkout list from child!")
        }

        // render Checkout
        act(() => {
            render(<Checkout
                HWSet_rent_list={test}
                handleList={testCheckOut}
            />, container);
        });

        // set the values of the number inputs
        const inputs = container.querySelectorAll(".hw-input");
        expect(inputs).toHaveLength(4);

        var i;
        for (i = 0; i < inputs.length; i++) {
            act(() => {
                inputs[i].stepUp(1);
                let event = new Event('input', { bubbles: true });
                event.simulated = true;
                inputs[i].dispatchEvent(event);
            });
            expect(inputs[i].value).toBe("1");
            expect(checkList[i].HW_changeNum).toBe(1);
        }

        // compare expected against the actual 
        expect(checkList).toHaveLength(4);


    });
}


function funcCheckIn() {
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    // checked in hardware when no hardware is in use
    let test = [
        { "HW_id": "0", "HW_name": "set1", "HW_use": 0 },
        { "HW_id": "1", "HW_name": "set2", "HW_use": 0 },
        { "HW_id": "2", "HW_name": "set3", "HW_use": 0 },
        { "HW_id": "3", "HW_name": "set4", "HW_use": 0 }
    ];

    // test for when no hardware is in use for all the projects
    it("CheckinTable Functionality: no hardware is in use", () => {
        // callback function for props
        let checkList = [];
        function testCheckIn(childList) {
            checkList = [...childList];
            console.log("received checkout list from child!")
        }

        // render Checkin
        act(() => {
            render(<Checkin
                HWSet_rent_list={test}
                handleList={testCheckIn}
            />, container);
        });

        // set the values of the number inputs
        const checkText = container.querySelector('.check-text');
        expect(checkText.id).toBe('hidePara');
    });

    // test for when hardware is in use and input is negative
    test = [
        { "HW_id": "0", "HW_name": "set1", "HW_use": 10 },
        { "HW_id": "1", "HW_name": "set2", "HW_use": 20 },
        { "HW_id": "2", "HW_name": "set3", "HW_use": 30 },
        { "HW_id": "3", "HW_name": "set4", "HW_use": 40 }
    ];

    it("CheckinTable Functionality: checkin exceeding the max value", () => {
        // callback function for props
        let checkList = [];
        function testCheckIn(childList) {
            checkList = [...childList];
            console.log("received checkin list from child!")
        }

        // render Checkout
        act(() => {
            render(<Checkin
                HWSet_rent_list={test}
                handleList={testCheckIn}
            />, container);
        });

        // set the values of the number inputs
        const inputs = container.querySelectorAll(".hw-input");
        expect(inputs).toHaveLength(4);

        var i;
        for (i = 0; i < inputs.length; i++) {
            var expectedValue = inputs[i].max;
            act(() => {
                inputs[i].stepUp(parseInt(expectedValue) + 10);
                let event = new Event('input', { bubbles: true });
                event.simulated = true;
                inputs[i].dispatchEvent(event);
            });
            expect(inputs[i].value).toBe(expectedValue);
            // console.log(checkList);
            expect(checkList[i].HW_changeNum).toBe(parseInt(expectedValue));

        }


    });


    // when hardware is in use 
    test = [
        { "HW_id": "0", "HW_name": "set1", "HW_use": 10 },
        { "HW_id": "1", "HW_name": "set2", "HW_use": 20 },
        { "HW_id": "2", "HW_name": "set3", "HW_use": 30 },
        { "HW_id": "3", "HW_name": "set4", "HW_use": 40 }
    ];

    // test when checkin input is negative

    it("CheckinTable Functionality: negative checkin", () => {
        // callback function for props
        let checkList = [];
        function testCheckIn(childList) {
            checkList = [...childList];
            console.log("received checkin list from child!")
        }

        // render Checkout
        act(() => {
            render(<Checkin
                HWSet_rent_list={test}
                handleList={testCheckIn}
            />, container);
        });

        // set the values of the number inputs
        const inputs = container.querySelectorAll(".hw-input");
        expect(inputs).toHaveLength(4);

        var i;
        for (i = 0; i < inputs.length; i++) {
            act(() => {
                inputs[i].stepDown(100);
                let event = new Event('input', { bubbles: true });
                event.simulated = true;
                inputs[i].dispatchEvent(event);
            });
            expect(inputs[i].value).toBe("0");
            console.log(checkList);
            // expect(checkList[i]).toBe([]);

        }


    });

    // test for when all HWSet types have been used for the project, in normal checkin case
    it("CheckinTable Functionality: normal checkin", () => {
        // callback function for props
        let checkList = [];
        function testCheckIn(childList) {
            checkList = [...childList];
            console.log("received checkout list from child!")
        }

        // render Checkout
        act(() => {
            render(<Checkin
                HWSet_rent_list={test}
                handleList={testCheckIn}
            />, container);
        });

        // set the values of the number inputs
        const inputs = container.querySelectorAll(".hw-input");
        expect(inputs).toHaveLength(4);

        var i;
        for (i = 0; i < inputs.length; i++) {
            var expectValue = "5";
            act(() => {
                inputs[i].stepUp(parseInt(expectValue));
                let event = new Event('input', { bubbles: true });
                event.simulated = true;
                inputs[i].dispatchEvent(event);
            });
            expect(inputs[i].value).toBe(expectValue);
            expect(checkList[i].HW_changeNum).toBe(parseInt(expectValue));
        }
    });


}


function main() {
    renderCheckin();
    renderCheckout();
    funcCheckOut();
    funcCheckIn();
}

main();