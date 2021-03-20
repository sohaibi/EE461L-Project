// import { FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import {Grid} from '@material-ui/core';
import React , { useState, useEffect } from 'react'
import {useForm,Form} from '../components/useForm';
import Controls from '../components/controls/Controls'
import * as projectService from '../services/projectService'

const statusItems = [
    { id: 'general', title: 'General' },
    { id: 'specialized', title: 'Specialized' },
]

const initialFValues = {
    id: 0,
    projectName: '',
    email: '',
    mobile: '',
    city: '',
    status: 'ongoing',
    departmentId: '',
    date: new Date(),
    isPermanent: false,
}


export default function ProjectForm(props) {
    const { addOrEdit, recordForEdit } = props //Edit feature

    // "(fieldValues = values)" has "initalFValues" above
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('projectName' in fieldValues)
            temp.projectName = fieldValues.projectName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }= useForm(initialFValues, true, validate);

   
    const handleSubmit= e => {
        e.preventDefault()
        if (validate()){
            addOrEdit(values, resetForm);
            // projectService.insertProject(values)
            // resetForm()
            // window.alert('check local storage...')
        }
    }

    //Pop Up Form Related
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    

    return (
            <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label='Project Name'
                        name='projectName'
                        value={values.projectName}
                        onChange = {handleInputChange} 
                        error={errors.projectName}
                    />

                    <Controls.Input
                        label='Email'
                        name='email'
                        value= {values.email}
                        onChange = {handleInputChange}
                        error={errors.email}
                    />
                     <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange} 
                        error={errors.mobile}        
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controls.RadioGroup
                        label ='Status'
                        name='status'
                        value= {values.status}
                        onChange = {handleInputChange}
                        items={statusItems}
                    />

                    <Controls.Select
                        name="departmentId"
                        label="Label"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={projectService.getDepartmentCollection()}
                        error={errors.departmentId}  
                    />

                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />

                    <Controls.DatePicker
                        name="date"
                        label="Date"
                        value={values.date}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Create Project" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>

                </Grid>

            </Grid>
            </Form>
    )
}
