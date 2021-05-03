import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'

export function useForm(initialFValues, validateOnChange = false, validate, setErrorMessage) {
    // above para for "= useForm(initialFValues, true, validate)" in projForm.js;

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    // display user Input in textfild; '...' for other properties
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,     //keep other values the same
            [name]: value //change specific value
        })
        if (validateOnChange) { //real time validation
            console.log("name is:", name, "value is:", value, "||to be validate");

            validate({ [name]: value })
        }

    }

    // validation section 19:58
    const resetForm = () => {
        console.log("resetForm executed!")
        setValues(initialFValues);
        setErrors({});
        setErrorMessage('');

    }
    // const resetForm = () => {
    //     console.log("resetForm executed!")
    //     setValues(initialFValues);
    //     setErrors({});
    // }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    // Refer to projFrom: 1.children -> fields;  ...other'-> 'onSubmit
    const { children, ...other } = props
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}
