   import { Grid } from '@material-ui/core';
   import React, { useState, useEffect } from 'react'
   import { useForm, Form } from './useForm';
   import Controls from './controls/Controls';
   import * as projectService from './projectService';
   
   
   const initialFValues = {
    id: 0,
    projName: '',
    status: '',
    comment:''
}


   export default function ProjectForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('projName' in fieldValues)
            temp.projName = fieldValues.projName ? "" : "This field is required."
      
        setErrors({
            ...temp
        })
    
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "") //ret boolean validate()
    }
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    
    const handleSubmit = e => {
         e.preventDefault()
        if (validate()){
            addOrEdit(values, resetForm);
        }
         
    }

    //POPUP SECTION
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
      
       return (
         
           <Form onSubmit={handleSubmit}>
            <Grid container>
               <Controls.Input
                    name="projName"
                    label="Project Name"
                    value={values.projName}
                    onChange={handleInputChange}
                    error={errors.projName}
                />
                <Controls.Input
                    name="status"
                    label="Status"
                    value={values.status}
                    onChange={handleInputChange}
                />
                <Controls.Input
                    name="comment"
                    label="Comment"
                    value={values.comment}
                    onChange={handleInputChange}
                />
                {/* <Controls.Input
                    name="date"
                    label="Date"
                    value={values.date}
                    onChange={handleInputChange}
                /> */}
                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit" />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm} />
                </div>
            </Grid>
            </Form>
          
       )
   }
 
   