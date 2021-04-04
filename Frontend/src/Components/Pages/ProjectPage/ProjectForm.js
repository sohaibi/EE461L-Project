   import { Grid } from '@material-ui/core';
   import React, { useState, useEffect } from 'react'
   import { useForm, Form } from './useForm';
   import Controls from './controls/Controls';
   import * as projectService from './projectService';
   
   
   const initialFValues = {
    id: 0,
    project_name: '',
    status: '',
    comment:''
}


   export default function ProjectForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('project_name' in fieldValues)
            temp.project_name = fieldValues.project_name ? "" : "This field is required."
      
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
                    name="project_name"
                    label="Project Name"
                    value={values.project_name}
                    onChange={handleInputChange}
                    error={errors.project_name}
                />
                {/* <Controls.Input
                    name="status"
                    label="Status"
                    value={values.status}
                    onChange={handleInputChange}
                /> */}
                <Controls.Input
                    name="comment"
                    label="Comment"
                    value={values.comment}
                    onChange={handleInputChange}
                />
               
                {/* <div> */}
                    <Controls.Button
                        type="submit"
                        text="Submit" />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm} />
                {/* </div> */}
            </Grid>
            </Form>
          
       )
   }
 
   