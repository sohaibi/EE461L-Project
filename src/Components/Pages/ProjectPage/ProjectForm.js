import { Grid } from '@material-ui/core';
import { Flexbox } from '@material-ui/system';
import React, { useState, useEffect } from 'react'
import { useForm, Form } from './useForm';
import Controls from './controls/Controls';

import { CenterFocusStrong } from '@material-ui/icons';


const initialFValues = {
    _id: '',
    project_name: '',
    // status: '',
    comment: ''
}


export default function ProjectForm(props) {
    const { makeAction, recordForEdit, action, errorMessage, setErrorMessage } = props

    const validate = (fieldValues = values) => { //感觉这里有点问题，fieldValues只记录了一个field??
        let temp = { ...errors }      // record the temp error for the current field value
        console.log("initially, in validate: temp is ", temp)
        console.log("initially, in validate: values is ", values)
        console.log("initially, in validate: fieldVlues is ", fieldValues)
        if (('project_name' in fieldValues) && (action !== "join")) {
            temp.project_name = fieldValues.project_name ? "" : "This field is required."
        }

        if (('_id' in fieldValues) && (action === "join")) {
            temp._id = fieldValues._id === "" ? "This field is required." : "";
            console.log("_id error set", temp)
        }

        setErrors({
            ...temp
        })

        if (fieldValues == values) {  ///? they will never equal to each other?
            // console.log("what is doing here?temp before change is", temp)
            var res = Object.values(temp).every(x => x == "") //ret boolean validate()
            // console.log("validate res when fieldValues == values: ", res);
            // console.log("temp becomes:", temp);
            return res;

        }
        // console.log("in validate: temp is ", temp)
        // console.log("in validate: values is ", values)
        // console.log("in validate: fieldVlues is ", fieldValues)

    }



    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate, setErrorMessage);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {   // I do not really understand how it works...
            console.log("on submit form, value is", values)
            // console.log("on submit form, resetForm is", resetForm({}))
            makeAction(values, resetForm);
        }

    }

    //POPUP SECTION
    useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit
            })

        }

    }, [recordForEdit])

    return (

        <Form onSubmit={handleSubmit}>
            <Grid container>
                {(action !== "join") &&
                    (<Controls.Input
                        name="project_name"
                        label="Project Name"
                        value={values.project_name}
                        onChange={handleInputChange}
                        error={errors.project_name}
                        readOnly={action === "delete"}
                    />)

                }
                {(action !== "join") &&
                    (
                        <Controls.Input
                            name="comment"
                            label="Comment"
                            value={values.comment}
                            onChange={handleInputChange}
                            readOnly={action === "delete"}

                        />
                    )
                }
                {(action === "join") &&
                    (
                        <Controls.Input
                            name="_id"
                            label="Project ID"
                            value={values._id}
                            onChange={handleInputChange}
                            error={errors._id}
                            readOnly={action === "delete"}

                        />
                    )
                }

                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", color: "red", marginLeft: "10px" }}>
                    {errorMessage}

                    <div style={{ display: "flex", marginTop: "2%" }}>
                        <Controls.Button
                            type="submit"
                            text="confirm" />


                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={action === "delete" ? null : resetForm} />
                    </div>
                </div>

            </Grid>
        </Form>


    )
}

